import React, { useState, useEffect } from "react";
import axios from "axios";

// Hardcoded current user ID for now — replace with auth dynamic ID later
const CURRENT_USER_ID = 1;

// Leave types matching your LeaveType enum in backend
const leaveTypes = [
    { label: "Sick Leave", value: "Sick" },
    { label: "Casual Leave", value: "Casual" },
    { label: "Earned Leave", value: "Earned" },
];

// Status labels matching your LeaveStatus enum in backend
const statusLabels = {
    Pending: "Pending",
    Approved: "Approved",
    Rejected: "Rejected",
};

const LeaveManagement = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        id: null,
        fromDate: "",
        toDate: "",
        reason: "",
        type: "",
        status: "Pending", // default on creation
        comment: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [searchText, setSearchText] = useState("");

    // Fetch leaves on load
    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8080/api/leaves/user/${CURRENT_USER_ID}`
            );
            setLeaves(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Failed to fetch leaves", error);
            setLeaves([]);
        }
        setLoading(false);
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Reset form to initial state
    const resetForm = () => {
        setFormData({
            id: null,
            fromDate: "",
            toDate: "",
            reason: "",
            type: "",
            status: "Pending",
            comment: "",
        });
        setIsEditing(false);
    };

    // Validate and submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validations
        if (!formData.fromDate || !formData.toDate) {
            alert("Please enter both From Date and To Date");
            return;
        }
        if (new Date(formData.fromDate) > new Date(formData.toDate)) {
            alert("'From Date' cannot be later than 'To Date'");
            return;
        }
        if (!formData.type) {
            alert("Please select a Leave Type");
            return;
        }
        if (!formData.reason.trim()) {
            alert("Please enter a Reason");
            return;
        }

        // Prepare payload for backend
        const payload = {
            fromDate: formData.fromDate,
            toDate: formData.toDate,
            reason: formData.reason,
            type: formData.type,
            status: formData.status,
            comment: formData.comment,
        };

        try {
            if (isEditing && formData.id) {
                // Update existing leave
                await axios.put(`http://localhost:8080/api/leaves/${formData.id}`, payload);
                alert("Leave updated successfully!");
            } else {
                // Create new leave request
                await axios.post(`http://localhost:8080/api/leaves/${CURRENT_USER_ID}`, payload);
                alert("Leave requested successfully!");
            }
            resetForm();
            fetchLeaves();
        } catch (error) {
            alert(
                "Failed to submit leave: " +
                (error.response?.data?.message || error.message || "Unknown error")
            );
        }
    };

    // Prefill form to edit an existing leave
    const handleEdit = (leave) => {
        setFormData({
            id: leave.id,
            fromDate: leave.fromDate,
            toDate: leave.toDate,
            reason: leave.reason,
            type: leave.type,
            status: leave.status,
            comment: leave.comment || "",
        });
        setIsEditing(true);
    };

    // Delete leave by id
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this leave?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/leaves/${id}`);
            alert("Leave deleted successfully!");
            fetchLeaves();
        } catch {
            alert("Failed to delete leave");
        }
    };

    // Filter leaves based on search input
    const filteredLeaves = leaves.filter((leave) => {
        const searchLower = searchText.toLowerCase();
        return (
            (leave.type && leave.type.toLowerCase().includes(searchLower)) ||
            (leave.reason && leave.reason.toLowerCase().includes(searchLower)) ||
            (leave.status && leave.status.toLowerCase().includes(searchLower))
        );
    });

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Leave Management</h1>

            {/* Search box */}
            <div className="flex mb-4 space-x-2">
                <input
                    type="text"
                    placeholder="Search by Type, Status, Reason"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="border rounded p-2 flex-grow"
                />
                <button
                    onClick={() => setSearchText("")}
                    className="bg-gray-400 text-white px-4 rounded"
                >
                    Reset
                </button>
            </div>

            {loading ? (
                <p>Loading leaves...</p>
            ) : (
                <table className="w-full border border-collapse mb-6 text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Type</th>
                            <th className="border p-2">From Date</th>
                            <th className="border p-2">To Date</th>
                            <th className="border p-2">Reason</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Comment</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeaves.length === 0 ? (
                            <tr>
                                <td className="p-2 text-center" colSpan={7}>
                                    No leaves found.
                                </td>
                            </tr>
                        ) : (
                            filteredLeaves.map((leave) => (
                                <tr key={leave.id}>
                                    <td className="border p-2">{leave.type}</td>
                                    <td className="border p-2">{leave.fromDate}</td>
                                    <td className="border p-2">{leave.toDate}</td>
                                    <td className="border p-2">{leave.reason}</td>
                                    <td className="border p-2">{statusLabels[leave.status] || leave.status}</td>
                                    <td className="border p-2">{leave.comment || "-"}</td>
                                    <td className="border p-2 space-x-2">
                                        <button
                                            className="text-blue-600 hover:underline"
                                            onClick={() => handleEdit(leave)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={() => handleDelete(leave.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}

            {/* Leave request form */}
            <h2 className="text-xl font-semibold mb-2">
                {isEditing ? "Edit Leave" : "Request Leave"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                >
                    <option value="">-- Select Leave Type --</option>
                    {leaveTypes.map(({ label, value }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    name="reason"
                    placeholder="Reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded md:col-span-2"
                />

                <input
                    type="text"
                    name="comment"
                    placeholder="Comment (optional)"
                    value={formData.comment}
                    onChange={handleChange}
                    className="border p-2 rounded md:col-span-2"
                />

                <button
                    type="submit"
                    className="bg-green-600 text-white p-2 rounded md:col-span-2"
                >
                    {isEditing ? "Update Leave" : "Submit Leave Request"}
                </button>
            </form>
        </div>
    );
};

export default LeaveManagement;
