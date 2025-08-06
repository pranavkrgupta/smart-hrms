import React, { useState, useEffect } from "react";
import axios from "axios";


// If you use authentication, set this dynamically!
const CURRENT_USER_ID = 15; // <-- Replace with actual logged-in user's ID

const leaveTypes = [
    { label: "Sick Leave", value: "SICK" },
    { label: "Casual Leave", value: "CASUAL" },
    { label: "Earned Leave", value: "EARNED" },
    { label: "Maternity Leave", value: "MATERNITY" },
    { label: "Paternity Leave", value: "PATERNITY" },
];

const statusLabels = {
    PENDING: "Pending",
    APPROVED: "Approved",
    REJECTED: "Rejected",
};

const LeaveManagement = () => {
    const [leaveHistory, setLeaveHistory] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        type: "",
        from: "",
        to: "",
        reason: "",
        comment: "",
    });
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch leaves for currently logged-in user
    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:8080/api/leaves/user/${CURRENT_USER_ID}`);
            // Ensure it's always an array:
            setLeaveHistory(Array.isArray(res.data) ? res.data : []);
        } catch (e) {
            setLeaveHistory([]);
        }
        setLoading(false);
    };


    // Handle form input changes
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add or update leave
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const fromDate = new Date(formData.from);
        const toDate = new Date(formData.to);
        if (fromDate > toDate) {
            alert("Invalid date range: 'From' date cannot be after 'To' date.");
            return;
        }
        if (!formData.type) {
            alert("Please select Leave Type.");
            return;
        }
        if (!formData.reason) {
            alert("Please enter Reason.");
            return;
        }

        try {
            if (isEditing) {
                // PUT (update)
                await axios.put(`http://localhost:8080/api/leaves/${formData.id}`, {
                    userId: CURRENT_USER_ID,
                    fromDate: formData.from,
                    toDate: formData.to,
                    reason: formData.reason,
                    status: "PENDING", // or map if editable
                    type: formData.type,
                    comment: formData.comment,
                });
                alert("Leave updated!");
            } else {
                // POST (create)
                await axios.post(`http://localhost:8080/api/leaves/${CURRENT_USER_ID}`, {
                    // I omited userId from the body if backend already gets it from path param
                    fromDate: formData.from,
                    toDate: formData.to,
                    reason: formData.reason,
                    status: "PENDING", //new leaves are bydefault pending
                    type: formData.type,
                    comment: formData.comment,
                });


                alert("Leave request submitted!");
            }
            setFormData({ id: null, type: "", from: "", to: "", reason: "", comment: "" });
            setIsEditing(false);
            fetchLeaves();
        } catch (error) {
            alert(
                "Error: " +
                (error.response?.data?.message || error.message || "Submission failed")
            );
        }
    };

    // Edit leave
    const handleEdit = (leave) => {
        setFormData({
            id: leave.id,
            type: leave.type,
            from: leave.fromDate || leave.from, // handle API/old state format
            to: leave.toDate || leave.to,
            reason: leave.reason,
            comment: leave.comment || "",
        });
        setIsEditing(true);
    };

    // Delete leave
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure to delete this leave?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/leaves/${id}`);
            fetchLeaves();
        } catch (error) {
            alert("Deletion failed!");
        }
    };

    // Search/filter leaves
    const filteredLeaves = leaveHistory.filter((leave) => {
        const t =
            leave.type && leaveTypes.find((lt) => lt.value === leave.type)
                ? leaveTypes.find((lt) => lt.value === leave.type).label
                : leave.type;
        return (
            t.toLowerCase().includes(searchText.toLowerCase()) ||
            (leave.reason && leave.reason.toLowerCase().includes(searchText.toLowerCase())) ||
            (leave.status &&
                statusLabels[leave.status] &&
                statusLabels[leave.status].toLowerCase().includes(searchText.toLowerCase()))
        );
    });

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Leave History</h1>

            {/* Search Box */}
            <div className="flex mb-4 gap-2">
                <input
                    type="text"
                    placeholder="Search by Type / Status / Reason"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <button
                    onClick={() => setSearchText("")}
                    className="bg-gray-400 text-white px-4 rounded"
                >
                    Reset
                </button>
            </div>

            {/* Leave Table */}
            {loading ? (
                <div className="text-center my-4">Loading...</div>
            ) : (
                <table className="w-full mb-6 border text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2">Type</th>
                            <th className="p-2">From</th>
                            <th className="p-2">To</th>
                            <th className="p-2">Reason</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeaves.length > 0 ? (
                            filteredLeaves.map((leave) => (
                                <tr key={leave.id}>
                                    <td className="p-2">
                                        {
                                            leaveTypes.find((t) => t.value === leave.type)?.label ||
                                            leave.type
                                        }
                                    </td>
                                    <td className="p-2">{leave.fromDate || leave.from}</td>
                                    <td className="p-2">{leave.toDate || leave.to}</td>
                                    <td className="p-2">{leave.reason}</td>
                                    <td className="p-2">
                                        {statusLabels[leave.status] || leave.status}
                                    </td>
                                    <td className="p-2">
                                        <button
                                            className="text-blue-500 hover:underline mr-2"
                                            onClick={() => handleEdit(leave)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-500 hover:underline"
                                            onClick={() => handleDelete(leave.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="p-2 text-center" colSpan="6">
                                    No leave records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* Leave Form */}
            <h2 className="text-xl font-semibold mb-2">
                {isEditing ? "Edit Leave" : "Request Leave"}
            </h2>
            <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleSubmit}
            >
                <select
                    name="type"
                    value={formData.type}
                    onChange={onChange}
                    required
                    className="border p-2 rounded"
                >
                    <option value="">-- Select Leave Type --</option>
                    {leaveTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    name="from"
                    value={formData.from}
                    onChange={onChange}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="date"
                    name="to"
                    value={formData.to}
                    onChange={onChange}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="reason"
                    placeholder="Reason"
                    value={formData.reason}
                    onChange={onChange}
                    required
                    className="border p-2 rounded md:col-span-2"
                />
                <input
                    type="text"
                    name="comment"
                    placeholder="Comment (optional)"
                    value={formData.comment}
                    onChange={onChange}
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
