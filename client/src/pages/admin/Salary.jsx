import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/salaries";
// Hardcoded user id as of now until authentication is added
const CURRENT_USER_ID = 8;

const Salary = () => {
  const [salaries, setSalaries] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    pfDeduction: "",
    applicableFrom: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch salaries
  const fetchSalaries = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setSalaries(res.data);
    } catch (err) {
      console.error("Error fetching salaries:", err);
      setSalaries([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/${editingId}`, form);
        setMessage("Salary updated!");
      } else {
        await axios.post(`${API_BASE}/${CURRENT_USER_ID}`, form);
        setMessage("Salary added!");
      }

      setForm({ amount: "", pfDeduction: "", applicableFrom: "" });
      setEditingId(null);
      fetchSalaries();
    } catch (err) {
      console.error("Error submitting salary:", err);
      setMessage("Failed to submit.");
    }
  };

  const handleEdit = (salary) => {
    setForm({
      amount: salary.amount,
      pfDeduction: salary.pfDeduction,
      applicableFrom: salary.applicableFrom,
    });
    setEditingId(salary.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`${API_BASE}/${id}`);
      setMessage("Deleted successfully.");
      fetchSalaries();
    } catch (err) {
      console.error("Delete failed:", err);
      setMessage("Failed to delete.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Salary Management</h1>

      {message && <p className="mb-4 text-blue-600 font-semibold">{message}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-8">
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="pfDeduction"
          value={form.pfDeduction}
          onChange={handleChange}
          placeholder="PF Deduction"
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="applicableFrom"
          value={form.applicableFrom}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Salary" : "Add Salary"}
        </button>
      </form>

      <table className="min-w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">PF Deduction</th>
            <th className="border px-4 py-2">Applicable From</th>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                Loading salaries...
              </td>
            </tr>
          ) : salaries.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-4 text-red-500 font-medium"
              >
                No salary records found.
              </td>
            </tr>
          ) : (
            salaries.map((salary) => (
              <tr key={salary.id}>
                <td className="border px-4 py-2">{salary.id}</td>
                <td className="border px-4 py-2">{salary.amount}</td>
                <td className="border px-4 py-2">{salary.pfDeduction}</td>
                <td className="border px-4 py-2">{salary.applicableFrom}</td>
                <td className="border px-4 py-2">{salary.userName}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(salary)}
                    className="bg-yellow-400 hover:bg-yellow-500 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(salary.id)}
                    className="bg-red-500 hover:bg-red-600 px-2 py-1 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Salary;
