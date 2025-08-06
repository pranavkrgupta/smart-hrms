import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import {
  getEmployeeById,
  getEmployees,
  deleteEmployeeById,
  addEmployee,
  updateEmployeeById,
} from "../../services/employeeService";
import { getDesignations } from "../../services/designationService";

function ManageEmployees() {
  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchDesignations();
  }, []);

  function fetchEmployees() {
    getEmployees()
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => console.error("Error Fetching employees", err));
  }

  function fetchDesignations() {
    getDesignations()
      .then((res) => {
        setDesignations(res.data);
      })
      .catch((err) => console.error("Error Fetching designations", err));
  }

  function fetchEmployeeById(id) {
    getEmployeeById(id)
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => console.error("Error Fetching Employee by Id", err));
  }

  const [employees, setEmployees] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [employee, setEmployee] = useState({});
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
    const user_id = e.target.getAttribute("data-id");
    if (!window.confirm("Are you sure you want to delete this employee ?"))
      return;

    deleteEmployeeById(user_id)
      .then(() => {
        setEmployees((prev) => prev.filter((emp) => emp.userId != user_id));
      })
      .catch((err) => {
        console.error("Error deleting employee", err);
        alert("Failed to delete employee.");
      });
  }

  function handleEditClick(e) {
    const user_id = e.target.getAttribute("data-id");
    setEditEmployeeId(user_id);
    fetchEmployeeById(user_id);
    setIsEditModalVisible(true);
  }

  function handleEmployeeAddition(e) {
    e.preventDefault();

    const newEmployee = {
      name: e.target.name.value,
      email: e.target.email.value,
      dob: e.target.dob.value,
      gender: e.target.gender.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
      designationId: e.target.designationId.value,
    };

    addEmployee(newEmployee)
      .then((res) => {
        setEmployees((prev) => [...prev, res.data]);
        setIsAddModalVisible(false);
      })
      .catch((err) => {
        console.error("Error adding employee", err);
        alert("Failed to add employee.");
      });
  }

  function handleEmployeeEdit(e) {
    e.preventDefault();
    const updatedData = {
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      gender: employee.gender,
      dob: employee.dob,
      address: employee.address,
      designationId: employee.designationId,
    };

    updateEmployeeById(editEmployeeId, updatedData)
      .then(() => {
        // Fetch the entire list again to get latest data
        fetchEmployees();
        setEditEmployeeId(null);
        setIsEditModalVisible(false);
      })
      .catch((err) => {
        console.error("Error updating employee", err);
        alert("Failed to update employee.");
      });
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
              name="dob"
              type="date"
              placeholder="DOB"
              required
              className="w-full border px-3 py-2 rounded"
            />
            <select
              name="gender"
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              name="address"
              placeholder="Address"
              required
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="phone"
              placeholder="Phone"
              required
              className="w-full border px-3 py-2 rounded"
            />
            <select
              name="designationId"
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Designation</option>
              {designations.map((d) => (
                <option key={d.designationId} value={d.designationId}>
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
              value={employee.name || ""}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
            <input
              name="email"
              placeholder="Email"
              required
              className="w-full border px-3 py-2 rounded"
              value={employee.email || ""}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
            <input
              name="dob"
              type="date"
              placeholder="DOB"
              required
              className="w-full border px-3 py-2 rounded"
              value={employee.dob || ""}
              onChange={(e) =>
                setEmployee({ ...employee, dob: e.target.value })
              }
            />

            <select
              name="gender"
              value={employee.gender}
              onChange={(e) =>
                setEmployee({ ...employee, gender: e.target.value })
              }
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              name="address"
              value={employee.address}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
              placeholder="Address"
              required
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="phone"
              value={employee.phone}
              onChange={(e) =>
                setEmployee({ ...employee, phone: e.target.value })
              }
              placeholder="Phone"
              required
              className="w-full border px-3 py-2 rounded"
            />
            <select
              name="designationId"
              required
              className="w-full border px-3 py-2 rounded"
              value={employee.designationId || ""}
              onChange={(e) =>
                setEmployee({ ...employee, designationId: e.target.value })
              }
            >
              <option value="">Select Designation</option>
              {designations.map((d) => (
                <option key={d.designationId} value={d.designationId}>
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
                    data-id={e.userId}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={handleDeletion}
                    data-id={e.userId}
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
