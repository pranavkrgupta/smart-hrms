import React, { useState } from "react";

const LeaveManagement = () => {
    const [leaveHistory, setLeaveHistory] = useState([
        {
            id: 1,
            type: "Sick Leave",
            from: "2025-07-20",
            to: "2025-07-22",
            reason: "Fever",
            status: "Pending",
        },
        {
            id: 2,
            type: "Casual Leave",
            from: "2025-07-15",
            to: "2025-07-16",
            reason: "Personal work",
            status: "Approved",
        },
    ]);

    const [formData, setFormData] = useState({
        id: null,
        type: "",
        from: "",
        to: "",
        reason: "",
    });

    const [searchText, setSearchText] = useState("");

    const isEditing = formData.id !== null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const fromDate = new Date(formData.from);
        const toDate = new Date(formData.to);

        if (fromDate > toDate) {
            alert("Invalid date range: 'From' date cannot be after 'To' date.");
            return;
        }

        if (isEditing) {
            const updatedList = leaveHistory.map((leave) =>
                leave.id === formData.id ? { ...leave, ...formData } : leave
            );
            setLeaveHistory(updatedList);
        } else {
            const newLeave = {
                id: Date.now(),
                ...formData,
                status: "Pending",
            };
            setLeaveHistory([...leaveHistory, newLeave]);
        }

        setFormData({ id: null, type: "", from: "", to: "", reason: "" });
    };


    //

    const handleEdit = (leave) => {
        setFormData(leave);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleResetSearch = () => {
        setSearchText("");
    };

    const filteredLeaves = leaveHistory.filter(
        (leave) =>
            leave.type.toLowerCase().includes(searchText.toLowerCase()) ||
            leave.reason.toLowerCase().includes(searchText.toLowerCase()) ||
            leave.status.toLowerCase().includes(searchText.toLowerCase())
    );

    const leaveTypes = ["", "Sick Leave", "Casual Leave", "Earned Leave", "Maternity Leave", "Paternity Leave"];

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Leave History</h1>

            {/* 🔍 Search Box */}
            <div className="flex mb-4 gap-2">
                <input
                    type="text"
                    placeholder="Search by Type / Status / Reason"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="border p-2 rounded w-full"
                />
                <button
                    onClick={handleResetSearch}
                    className="bg-gray-400 text-white px-4 rounded"
                >
                    Reset
                </button>
            </div>

            {/* 📋 Leave Table */}
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
                                <td className="p-2">{leave.type}</td>
                                <td className="p-2">{leave.from}</td>
                                <td className="p-2">{leave.to}</td>
                                <td className="p-2">{leave.reason}</td>
                                <td className="p-2">{leave.status}</td>
                                <td className="p-2">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => handleEdit(leave)}
                                    >
                                        Edit
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

            {/* 📝 Form */}
            <h2 className="text-xl font-semibold mb-2">
                {isEditing ? "Edit Leave" : "Request Leave"}
            </h2>
            <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleSubmit}
            >
                <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                    className="border p-2 rounded"
                >
                    {leaveTypes.map((type, idx) => (
                        <option key={idx} value={type} disabled={type === ""}>
                            {type === "" ? "-- Select Leave Type --" : type}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="date"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Reason"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    required
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
