import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../services/departmentService";

export default function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [editDepartmentId, setEditDepartmentId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", description: "" });
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  const matchedDepartments =
    searchKeyword === ""
      ? departments
      : departments.filter((d) =>
          d.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );

  useEffect(() => {
    setLoading(true);
    getAllDepartments()
      .then((res) => setDepartments(res.data))
      .catch((err) =>
        console.error("Error fetching departments:", err?.response || err)
      )
      .finally(() => setLoading(false));
  }, [refreshFlag]);

  function handleAddClick() {
    setIsAddModalVisible(true);
  }

  function handleDepartmentAddition(e) {
    e.preventDefault();
    const temp = {
      name: e.target.name.value.trim(),
      description: e.target.description.value.trim(),
    };
    if (!temp.name || !temp.description) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    createDepartment(temp)
      .then(() => {
        setRefreshFlag((f) => !f);
        setIsAddModalVisible(false);
      })
      .catch((err) => {
        console.error("Error adding department:", err?.response || err);
        alert("Failed to add department");
      })
      .finally(() => setLoading(false));
  }

  function openEditModal(department) {
    setEditDepartmentId(department.departmentId);
    setEditForm({ name: department.name, description: department.description });
    setIsEditModalVisible(true);
  }

  function handleEditFormChange(e) {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleDepartmentEdit(e) {
    e.preventDefault();
    if (!editForm.name.trim() || !editForm.description.trim()) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    updateDepartment(editDepartmentId, {
      name: editForm.name.trim(),
      description: editForm.description.trim(),
    })
      .then(() => {
        setRefreshFlag((f) => !f);
        setIsEditModalVisible(false);
        setEditDepartmentId(null);
        setEditForm({ name: "", description: "" });
      })
      .catch((err) => {
        console.error("Error updating department:", err?.response || err);
        alert("Failed to update department");
      })
      .finally(() => setLoading(false));
  }

  function handleSearch(e) {
    setSearchKeyword(e.target.value);
  }

  function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this department?")) {
      return;
    }
    setLoading(true);
    deleteDepartment(id)
      .then(() => setRefreshFlag((f) => !f))
      .catch((err) => {
        console.error("Error deleting department:", err?.response || err);
        alert(
          "Cannot delete the department because some designations are still referencing it."
        );
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="flex flex-col items-stretch p-4">
      <div className="flex flex-col items-stretch mb-4">
        <button
          type="button"
          disabled={loading}
          style={{ backgroundColor: "#718769" }}
          className="text-white px-4 py-2 rounded"
          onClick={handleAddClick}
        >
          ADD NEW DEPARTMENT
        </button>
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        title="Add New Department"
      >
        <form onSubmit={handleDepartmentAddition} className="space-y-4">
          <input
            name="name"
            placeholder="Department name"
            required
            className="w-full border px-3 py-2 rounded"
            disabled={loading}
          />
          <input
            name="description"
            placeholder="Description"
            required
            className="w-full border px-3 py-2 rounded"
            disabled={loading}
          />
          <div className="text-right">
            <button
              type="submit"
              className="text-white px-4 py-2 rounded"
              style={{ backgroundColor: "#718769" }}
              disabled={loading}
            >
              Save
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        title="Edit Department"
      >
        <form onSubmit={handleDepartmentEdit} className="space-y-4">
          <input
            name="name"
            required
            className="w-full border px-3 py-2 rounded"
            value={editForm.name}
            onChange={handleEditFormChange}
            disabled={loading}
          />
          <input
            name="description"
            required
            className="w-full border px-3 py-2 rounded"
            value={editForm.description}
            onChange={handleEditFormChange}
            disabled={loading}
          />
          <div className="text-right">
            <button
              type="submit"
              className="text-white px-4 py-2 rounded"
              style={{ backgroundColor: "#718769" }}
              disabled={loading}
            >
              Save
            </button>
          </div>
        </form>
      </Modal>

      {/* Search */}
      <div className="flex flex-col my-4 relative">
        <input
          type="text"
          placeholder="SEARCH DEPARTMENTS BY NAME"
          className="border p-2 rounded text-center"
          value={searchKeyword}
          onChange={handleSearch}
          disabled={loading}
        />
        <img
          src="../assets/search.png"
          className="w-6 h-6 absolute right-3 top-2"
          alt="search icon"
        />
      </div>

      {/* Table */}
      <div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Department Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matchedDepartments.length === 0 && (
              <tr>
                <td colSpan={4} className="border p-2 text-center">
                  No departments found.
                </td>
              </tr>
            )}
            {matchedDepartments.map((d) => (
              <tr key={d.departmentId}>
                <td className="border p-2">{d.departmentId}</td>
                <td className="border p-2">{d.name}</td>
                <td className="border p-2">{d.description}</td>
                <td className="border p-2 text-center">
                  <button
                    style={{ color: "#718769" }}
                    className="mr-2 hover:underline"
                    onClick={() => openEditModal(d)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(d.departmentId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
