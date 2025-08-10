import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import {
  getDesignations,
  createDesignation,
  updateDesignation,
  deleteDesignation,
} from "../../services/designationService";
import axios from "axios";
import { getAllDepartments } from "../../services/departmentService";

export default function ManageDesignation() {
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [editDesignationId, setEditDesignationId] = useState(null);
  const [editDepartmentId, setEditDepartmentId] = useState(null);
  const [addDepartmentId, setAddDepartmentId] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    getDesignations()
      .then((res) => setDesignations(res.data))
      .catch((err) => console.error("Error fetching designations:", err));

    getAllDepartments()
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, [refreshFlag]);

  const matchedDesignations =
    searchKeyword === ""
      ? designations
      : designations.filter((d) =>
          d.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );

  function handleAddClick() {
    setIsAddModalVisible(true);
  }

  function handleDesignationAddition(e) {
    e.preventDefault();
    const newDesignation = {
      name: e.target.name.value,
      description: e.target.description.value,
      departmentId: addDepartmentId,
    };

    createDesignation(newDesignation)
      .then(() => {
        setRefreshFlag(!refreshFlag);
        setIsAddModalVisible(false);
        setAddDepartmentId(null);
      })
      .catch((err) => {
        console.error("Error adding designation:", err);
      });
  }

  function handleDesignationEdit(e) {
    e.preventDefault();
    const updatedDesignation = {
      name: e.target.name.value,
      description: e.target.description.value,
      departmentId: editDepartmentId,
    };

    updateDesignation(editDesignationId, updatedDesignation)
      .then(() => {
        setRefreshFlag(!refreshFlag);
        setIsEditModalVisible(false);
        setEditDesignationId(null);
        setEditDepartmentId(null);
      })
      .catch((err) => {
        console.error("Error updating designation:", err);
      });
  }

  function handleSearch(e) {
    setSearchKeyword(e.target.value);
  }

  function handleEditClick(e) {
    const id = e.target.getAttribute("data-id");
    setEditDesignationId(id);
    const designation = designations.find(
      (d) => d.designationId.toString() === id.toString()
    );
    if (designation) {
      setEditDepartmentId(designation.departmentId);
      setIsEditModalVisible(true);
    }
  }

  function handleDelete(e) {
    const id = e.target.getAttribute("data-id");
    deleteDesignation(id)
      .then(() => {
        setRefreshFlag(!refreshFlag);
      })
      .catch(() => {
        alert(
          "Cannot delete the designation because some users are still referencing it."
        );
      });
  }

  return (
    <div className="flex flex-col items-stretch p-4">
      <div className="mb-4">
        <button
          type="button"
          style={{ backgroundColor: "#718769" }}
          className="text-white px-4 py-2 rounded"
          onClick={handleAddClick}
        >
          ADD NEW DESIGNATION
        </button>
      </div>

      {/* Add Designation Modal */}
      <Modal
        isOpen={isAddModalVisible}
        onClose={() => {
          setIsAddModalVisible(false);
          setAddDepartmentId(null);
        }}
        title="Add New Designation"
      >
        <form onSubmit={handleDesignationAddition} className="space-y-4">
          <input
            name="name"
            placeholder="Designation name"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="description"
            placeholder="Description"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <select
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setAddDepartmentId(e.target.value)}
            defaultValue={"default"}
            required
          >
            <option value="default" disabled>
              Select Department
            </option>
            {departments.map((d) => (
              <option key={d.departmentId} value={d.departmentId}>
                {d.name}
              </option>
            ))}
          </select>
          <div className="text-right">
            <button
              type="submit"
              className="text-white px-4 py-2 rounded"
              style={{ backgroundColor: "#718769" }}
            >
              Save
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Designation Modal */}
      <Modal
        isOpen={isEditModalVisible}
        onClose={() => {
          setIsEditModalVisible(false);
          setEditDesignationId(null);
          setEditDepartmentId(null);
        }}
        title="Edit Designation"
      >
        <form onSubmit={handleDesignationEdit} className="space-y-4">
          <input
            name="name"
            required
            className="w-full border px-3 py-2 rounded"
            defaultValue={
              editDesignationId == null
                ? ""
                : designations.find(
                    (d) => d.designationId.toString() === editDesignationId.toString()
                  )?.name || ""
            }
          />
          <input
            name="description"
            required
            className="w-full border px-3 py-2 rounded"
            defaultValue={
              editDesignationId == null
                ? ""
                : designations.find(
                    (d) => d.designationId.toString() === editDesignationId.toString()
                  )?.description || ""
            }
          />
          <select
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setEditDepartmentId(e.target.value)}
            value={editDepartmentId || "default"}
            required
          >
            <option value="default" disabled>
              Select Department
            </option>
            {departments.map((d) => (
              <option key={d.departmentId} value={d.departmentId}>
                {d.name}
              </option>
            ))}
          </select>
          <div className="text-right">
            <button
              type="submit"
              className="text-white px-4 py-2 rounded"
              style={{ backgroundColor: "#718769" }}
            >
              Save
            </button>
          </div>
        </form>
      </Modal>

      {/* Search Box */}
      <div className="flex flex-col my-4 relative">
        <input
          type="text"
          placeholder="SEARCH DESIGNATION BY NAME"
          className="border p-2 rounded text-center"
          value={searchKeyword}
          onChange={handleSearch}
        />
        <img
          src="../assets/search.png"
          className="w-6 h-6 absolute right-3 top-2"
          alt="search icon"
        />
      </div>

      {/* Designation Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Designation Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Department Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {matchedDesignations.map((d) => (
            <tr key={d.designationId}>
              <td className="border p-2">{d.designationId}</td>
              <td className="border p-2">{d.name}</td>
              <td className="border p-2">{d.description}</td>
              <td className="border p-2">{d.departmentName}</td>
              <td className="border p-2 text-center">
                <button
                  style={{ color: "#718769" }}
                  className="mr-2 hover:underline"
                  onClick={handleEditClick}
                  data-id={d.designationId}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={handleDelete}
                  data-id={d.designationId}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
