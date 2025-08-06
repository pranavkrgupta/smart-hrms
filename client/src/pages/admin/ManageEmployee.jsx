import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { getEmployees } from "../../services/employeeService";

function ManageEmployees() {
  useEffect(() => {
    fetchEmployees();
  }, []);

  function fetchEmployees() {
    getEmployees()
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => console.error("Error Fetching employees", err));
  }

  const [employees, setEmployees] = useState([])

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  const matchedEmployees =
    searchKeyword == ""
      ? employees
      : employees.filter((e) =>
          e.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );

  function handleSearch(e) {
    setSearchKeyword(e.target.value);
  }

  function handleAddNewEmployeeClick(e) {
    setIsAddModalVisible(true);
  }

  function handleDeletion(e) {
    const empId = e.target.getAttribute("data-id");
    setEmployees((e) => [...employees.filter((emp) => emp.id != empId)]);
  }

  function handleEditClick(e) {
    setIsEditModalVisible(true);
    setEditEmployeeId(e.target.getAttribute("data-id"));
  }

  function handleEmployeeAddition(e) {
    e.preventDefault();
    const temp = {
      id: e.target.id.value,
      name: e.target.name.value,
      email: e.target.email.value,
      department: e.target.department.value,
      designation: e.target.designation.value,
    };
    setEmployees((e) => [...employees, temp]);
    setIsAddModalVisible(false);
  }

  function handleEmployeeEdit(e) {
    e.preventDefault();
    const temp = {
      id: editEmployeeId,
      name: e.target.name.value,
      email: e.target.email.value,
      department: e.target.department.value,
      designation: e.target.designation.value,
    };
    setEmployees((e) => [...e.filter((emp) => emp.id != temp.id), temp]);
    setEditEmployeeId(null);
    setIsEditModalVisible(false);
  }

  return (
    <div className="flex flex-col items-stretch p-4">
      <div className="flex flex-col items-stretch ">
        <button
          type="button"
          style={{ backgroundColor: "#718769" }}
          className="text-white px-4 py-2 rounded"
          onClick={handleAddNewEmployeeClick}
        >
          ADD NEW EMPLOYEE
        </button>
      </div>
      <div>
        <Modal
          isOpen={isAddModalVisible}
          onClose={() => setIsAddModalVisible(false)}
          title="Add New Employee"
        >
          <form onSubmit={handleEmployeeAddition} className="space-y-4">
            <input
              name="id"
              placeholder="Id"
              required
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="name"
              placeholder="Name"
              required
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="email"
              placeholder="Email"
              required
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="department"
              placeholder="Department"
              required
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="designation"
              placeholder="Designation"
              required
              className="w-full border px-3 py-2 rounded"
            />
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
      </div>

      <div>
        <Modal
          isOpen={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          title="Edit Employee"
        >
          <form onSubmit={handleEmployeeEdit} className="space-y-4">
            <input
              name="name"
              placeholder="Name"
              required
              className="w-full border px-3 py-2 rounded"
              defaultValue={
                editEmployeeId != null
                  ? employees.find((e) => e.id == editEmployeeId).name
                  : ""
              }
            />
            <input
              name="email"
              placeholder="Email"
              required
              className="w-full border px-3 py-2 rounded"
              defaultValue={
                editEmployeeId != null
                  ? employees.find((e) => e.id == editEmployeeId).email
                  : ""
              }
            />
            <input
              name="department"
              placeholder="Department"
              required
              className="w-full border px-3 py-2 rounded"
              defaultValue={
                editEmployeeId != null
                  ? employees.find((e) => e.id == editEmployeeId).department
                  : ""
              }
            />
            <input
              name="designation"
              placeholder="Designation"
              required
              className="w-full border px-3 py-2 rounded"
              defaultValue={
                editEmployeeId != null
                  ? employees.find((e) => e.id == editEmployeeId).designation
                  : ""
              }
            />
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
      </div>

      <div className="flex flex-col my-4 relative">
        <input
          type="text"
          placeholder="SEARCH EMPLOYEES BY NAME"
          className="border p-2 rounded text-center"
          value={searchKeyword}
          onChange={handleSearch}
        />
        <img
          src="../assets/search.png"
          className="w-6 h-6 absolute right-3 top-2"
          alt=""
        />
      </div>
      <div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Number</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">DepartmentName</th>
              <th className="border p-2">DesignationName</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matchedEmployees.map((e) => (
              <tr key={e.id}>
                <td className="border p-2">{e.userId}</td>
                <td className="border p-2">{e.name}</td>
                <td className="border p-2">{e.email}</td>
                <td className="border p-2">{e.phone}</td>
                <td className="border p-2">{e.gender}</td>
                <td className="border p-2">{e.departmentName}</td>
                <td className="border p-2">{e.designationName}</td>
                <td className="border p-2 text-center">
                  <button
                    style={{ color: "#718769" }}
                    className="mr-2 hover:underline"
                    onClick={handleEditClick}
                    data-id={e.id}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={handleDeletion}
                    data-id={e.id}
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

export default ManageEmployees;
