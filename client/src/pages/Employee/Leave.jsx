import React, { useState, useEffect } from "react";
import axios from "axios";

// Hardcoded user ID for testing — in production this should come from logged-in user's info
const CURRENT_USER_ID = 1;

// Leave types: 'value' matches DB ENUM exactly, 'label' is for display
const leaveTypes = [
    { label: "Sick Leave", value: "SICK" },
    { label: "Casual Leave", value: "CASUAL" },
    { label: "Earned Leave", value: "EARNED" },
];

// Map DB status values to human-friendly labels for display
const statusLabels = {
    PENDING: "Pending",
    APPROVED: "Approved",
    REJECTED: "Rejected",
};

// Annual leave quota for each type — purely frontend config here
const LEAVE_QUOTA = {
    SICK: 12,
    CASUAL: 8,
    EARNED: 15,
};

const LeaveManagement = () => {
    // All leave requests for this user
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form state for add/edit
    const [formData, setFormData] = useState({
        id: null,
        fromDate: "",
        toDate: "",
        reason: "",
        type: "",
        status: "PENDING", // default as per DB enum
        comment: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [searchText, setSearchText] = useState("");

    // Load leaves when component mounts
    useEffect(() => {
        fetchLeaves();
    }, []);

    // Fetch leave data from backend
    const fetchLeaves = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `http://localhost:8080/api/leaves/user/${CURRENT_USER_ID}`
            );
            setLeaves(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Failed to fetch leaves", err);
            setLeaves([]);
        }
        setLoading(false);
    };

    // Handles any form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Reset form back to initial state
    const resetForm = () => {
        setFormData({
            id: null,
            fromDate: "",
            toDate: "",
            reason: "",
            type: "",
            status: "PENDING",
            comment: "",
        });
        setIsEditing(false);
    };

    // Count how many approved leaves user has already consumed for each type
    const calculateUsedLeaves = (leaveList) => {
        const used = { SICK: 0, CASUAL: 0, EARNED: 0 };
        leaveList.forEach((leave) => {
            if (leave.status === "APPROVED") {
                const from = new Date(leave.fromDate);
                const to = new Date(leave.toDate);
                const days = Math.floor((to - from) / (1000 * 60 * 60 * 24)) + 1;
                used[leave.type] += days;
            }
        });
        return used;
    };

    // Validate and save form data (either new request or update existing)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic input validation
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

        // Calculate days requested
        const from = new Date(formData.fromDate);
        const to = new Date(formData.toDate);
        const daysRequested =
            Math.floor((to - from) / (1000 * 60 * 60 * 24)) + 1;

        // Quota restrictions
        const usedLeaves = calculateUsedLeaves(leaves);
        const remaining = LEAVE_QUOTA[formData.type] - usedLeaves[formData.type];

        if (daysRequested > remaining) {
            alert(
                `You only have ${remaining} ${formData.type} leave day(s) left. Please adjust your dates.`
            );
            return;
        }

        const payload = {
            fromDate: formData.fromDate,
            toDate: formData.toDate,
            reason: formData.reason,
            type: formData.type,      // already uppercase
            status: formData.status,  // already uppercase
            comment: formData.comment,
        };

        try {
            if (isEditing && formData.id) {
                // Update existing leave
                await axios.put(
                    `http://localhost:8080/api/leaves/${formData.id}`,
                    payload
                );
                alert("Leave updated successfully!");
            } else {
                // Create new leave request
                await axios.post(
                    `http://localhost:8080/api/leaves/${CURRENT_USER_ID}`,
                    payload
                );
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

    // Load a leave into form for editing
    const handleEdit = (leave) => {
        setFormData({
            id: leave.id,
            fromDate: leave.fromDate,
            toDate: leave.toDate,
            reason: leave.reason,
            type: leave.type,       // uppercase from DB
            status: leave.status,   // uppercase from DB
            comment: leave.comment || "",
        });
        setIsEditing(true);
    };

    // Delete a leave (after confirmation)
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

    // Filter leaves by search text (case-insensitive)
    const filteredLeaves = leaves.filter((leave) => {
        const searchLower = searchText.toLowerCase();
        return (
            (leave.type && leave.type.toLowerCase().includes(searchLower)) ||
            (leave.reason && leave.reason.toLowerCase().includes(searchLower)) ||
            (leave.status && leave.status.toLowerCase().includes(searchLower))
        );
    });

    // Current used leave counts for displaying quotas
    const usedLeaves = calculateUsedLeaves(leaves);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Leave Management</h1>

            {/* Search bar */}
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

            {/* Display leave quota summary */}
            <div className="mb-4 p-3 border rounded bg-gray-50">
                <h2 className="font-semibold mb-2">Leave Quotas</h2>
                <ul className="list-disc list-inside">
                    {Object.keys(LEAVE_QUOTA).map((type) => (
                        <li key={type}>
                            {type}: {LEAVE_QUOTA[type] - usedLeaves[type]} remaining out of{" "}
                            {LEAVE_QUOTA[type]}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Table of leave requests */}
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
                                    {/* We keep type raw from DB for now */}
                                    <td className="border p-2">{leave.type}</td>
                                    <td className="border p-2">{leave.fromDate}</td>
                                    <td className="border p-2">{leave.toDate}</td>
                                    <td className="border p-2">{leave.reason}</td>
                                    <td className="border p-2">
                                        {statusLabels[leave.status] || leave.status}
                                    </td>
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

            {/* Add/Edit leave form */}
            <h2 className="text-xl font-semibold mb-2">
                {isEditing ? "Edit Leave" : "Request Leave"}
            </h2>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl"
            >
                {/* Type dropdown */}
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                >
                    <option value="">-- Select Leave Type --</option>
                    {leaveTypes.map(({ label, value }) => {
                        const remaining = LEAVE_QUOTA[value] - usedLeaves[value];
                        return (
                            <option key={value} value={value}>
                                {label} (Remaining: {remaining})
                            </option>
                        );
                    })}
                </select>

                {/* Dates */}
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

                {/* Reason & optional comment */}
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

                {/* Submit button */}
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
