import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  getAllSalaries,
  createSalary,
  updateSalary,
} from "../../services/salaryService";

import { getEmployees } from "../../services/employeeService";

const initialFormState = {
  userId: "",
  amount: "",
  applicableFrom: "",
  pfDeduction: "",
};

function ManageSalary() {
  const [users, setUsers] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [editSalaryId, setEditSalaryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchSalaries();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getEmployees();
      setUsers(response.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setError("Failed to load employees.");
    }
  };

  const fetchSalaries = async () => {
    try {
      setLoading(true);
      const response = await getAllSalaries();
      setSalaries(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch salaries.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "userId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userId || !formData.amount || !formData.applicableFrom) {
      setError("Employee, Amount, and Applicable From date are required.");
      return;
    }

    try {
      setError("");
      if (isEditing) {
        await updateSalary(editSalaryId, formData);
      } else {
        await createSalary(formData);
      }
      setFormData(initialFormState);
      setIsEditing(false);
      setEditSalaryId(null);
      fetchSalaries();
    } catch (err) {
      setError("Failed to save salary.");
    }
  };

  const handleEdit = (salary) => {
    setFormData({
      userId: salary.userId || salary.user?.id,
      amount: salary.amount,
      applicableFrom: salary.applicableFrom,
      pfDeduction: salary.pfDeduction ?? "",
    });
    setIsEditing(true);
    setEditSalaryId(salary.id);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Salary Management (Admin)</h1>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <label className="block">
            Employee
            <select
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Employee</option>
              {users.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            Amount
            <input
              type="number"
              step="0.01"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </label>

          <label className="block">
            Applicable From
            <input
              type="date"
              name="applicableFrom"
              value={formData.applicableFrom}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </label>

          <label className="block">
            PF Deduction
            <input
              type="number"
              step="0.01"
              name="pfDeduction"
              value={formData.pfDeduction}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Optional"
            />
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {isEditing ? "Update Salary" : "Add Salary"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setFormData(initialFormState);
                setIsEditing(false);
                setEditSalaryId(null);
                setError("");
              }}
              className="ml-4 bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Loading salaries...</p>
      ) : (
        <table className="w-full border border-gray-300 rounded table-auto">
          <thead className="bg-gray-200">
            <tr>
              {/* <th className="border px-4 py-2">ID</th> */}
              <th className="border px-4 py-2">Employee</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Applicable From</th>
              <th className="border px-4 py-2">PF Deduction</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salaries.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-600">
                  No salary records found.
                </td>
              </tr>
            ) : (
              salaries.map((salary) => (
                <tr key={salary.id}>
                  {/* <td className="border px-4 py-2">{salary.id}</td> */}
                  <td className="border px-4 py-2">{salary.userName}</td>
                  <td className="border px-4 py-2">{salary.amount}</td>
                  <td className="border px-4 py-2">{salary.applicableFrom}</td>
                  <td className="border px-4 py-2">{salary.pfDeduction ?? "-"}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit({
                        id: salary.id,
                        userId: salary.userId,
                        amount: salary.amount,
                        applicableFrom: salary.applicableFrom,
                        pfDeduction: salary.pfDeduction,
                      })}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageSalary;
