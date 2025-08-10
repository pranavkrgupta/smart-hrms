import React, { useEffect, useState } from "react";
import {
  addLeave,
  deleteLeave,
  getMyLeaves,
  updateLeave,
} from "../../services/leaveService";

function Leave() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initialFormState = {
    fromDate: "",
    toDate: "",
    reason: "",
    type: "", // e.g. "Sick", "Casual" — adjust to your LeaveType enum
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [editLeaveId, setEditLeaveId] = useState(null);

  // Filter/Search
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Load employee leaves on mount
  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = () => {
    getMyLeaves()
      .then((res) => {
        setLeaves(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form before submit
  const validateForm = () => {
    if (
      !formData.fromDate ||
      !formData.toDate ||
      !formData.reason ||
      !formData.type
    ) {
      alert("Please fill all fields");
      return false;
    }
    if (new Date(formData.fromDate) > new Date(formData.toDate)) {
      alert("'From Date' must be before or equal to 'To Date'");
      return false;
    }
    return true;
  };

  // Submit new leave or update existing leave
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const apiCall = isEditing
      ? updateLeave(editLeaveId, formData)
      : addLeave(formData);

    apiCall
      .then(() => {
        loadLeaves();
        setFormData(initialFormState);
        setIsEditing(false);
        setEditLeaveId(null);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to submit leave request.");
      });
  };

  // Start editing a leave
  const handleEdit = (leave) => {
    setIsEditing(true);
    setEditLeaveId(leave.id);
    setFormData({
      fromDate: leave.fromDate,
      toDate: leave.toDate,
      reason: leave.reason,
      type: leave.type,
    });
  };

  // Delete a leave
  const handleDelete = (leaveId) => {
    if (window.confirm("Are you sure you want to delete this leave?")) {
      deleteLeave(leaveId)
        .then(() => loadLeaves())
        .catch((err) => {
          console.error(err);
          alert("Failed to delete leave.");
        });
    }
  };

  // Filter leaves based on search and status
  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch = (leave.reason)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || leave.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 max-w-full mx-auto">
      <h1 className="text-2xl font-semibold mb-4">My Leave Requests</h1>

      {error && <div className="text-red-600 mb-2">{error}</div>}

      {/* Search & Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by reason"
          className="border p-2 rounded flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button
          className="bg-blue-600 text-white px-4 rounded"
          onClick={() => {
            setSearchTerm("");
            setFilterStatus("All");
          }}
        >
          Reset
        </button>
      </div>

      {/* Leave List Table */}
      {loading ? (
        <div>Loading...</div>
      ) : filteredLeaves.length === 0 ? (
        <div className="text-gray-600 italic">No leave requests found.</div>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              {/* <th className="border p-2">ID</th> */}
              <th className="border p-2">Leave Type</th>
              <th className="border p-2">From</th>
              <th className="border p-2">To</th>
              <th className="border p-2">Reason</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Admin Comment</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave) => (
              <tr key={leave.id}>
                {/* <td className="border p-2">{leave.id}</td> */}
                <td className="border p-2">{leave.type}</td>
                <td className="border p-2">{leave.fromDate || leave.from}</td>
                <td className="border p-2">{leave.toDate || leave.to}</td>
                <td className="border p-2">{leave.reason}</td>
                <td className="border p-2">{leave.comment}</td>
                <td className="border p-2">{leave.status}</td>
                <td className="border p-2">
                  {leave.status === "Pending" && (
                    <>
                      <button
                        className="text-blue-600 mr-2 underline"
                        onClick={() => handleEdit(leave)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 underline"
                        onClick={() => handleDelete(leave.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {leave.status !== "Pending" && <span>-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add/Edit Leave Form */}
      <div className="mt-8 border p-4 rounded shadow-md max-w-full">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Leave Request" : "Add New Leave"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-4">
            <label className="flex-1 flex flex-col">
              Leave Type
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="border p-2 rounded w-full "
                required
              >
                <option value="">Select leave type</option>
                <option value="Casual">Casual</option>
                <option value="Sick">Sick</option>
                <option value="Earned">Earned</option>
              </select>
            </label>

            <label className="flex-1 flex flex-col">
              From Date
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
            </label>

            <label className="flex-1 flex flex-col">
              To Date
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
            </label>
          </div>

          <label className="block mb-2">
            Reason
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              rows={3}
              required
            />
          </label>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {isEditing ? "Update Leave" : "Submit Leave"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditLeaveId(null);
                  setFormData(initialFormState);
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Leave;
