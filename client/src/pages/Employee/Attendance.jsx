import React, { useState, useEffect } from "react";
import axios from "axios";

// Replace with dynamic logged-in user id in real app
const CURRENT_USER_ID = 3;

const statusLabels = {
    PENDING: "Pending",
    ACCEPTED: "Accepted",
    REJECTED: "Rejected",
    HALF_DAY: "Half Day",
};

const AttendanceManagement = () => {
    const [attendanceList, setAttendanceList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        id: null,
        date: new Date().toISOString().slice(0, 10), // today yyyy-MM-dd
        checkIn: "",
        checkOut: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8080/api/attendance/user/${CURRENT_USER_ID}`
            );
            setAttendanceList(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching attendance:", error);
            setAttendanceList([]);
        }
        setLoading(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            id: null,
            date: new Date().toISOString().slice(0, 10),
            checkIn: "",
            checkOut: "",
        });
        setIsEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.date) {
            alert("Please select a date.");
            return;
        }
        if (formData.checkIn && formData.checkOut) {
            if (formData.checkIn >= formData.checkOut) {
                alert("Check-in time must be before check-out time.");
                return;
            }
        }

        try {
            const payload = {
                date: formData.date,
                checkIn: formData.checkIn || null,
                checkOut: formData.checkOut || null,
            };

            if (isEditing && formData.id) {
                // Update existing attendance
                await axios.put(`http://localhost:8080/api/attendance/${formData.id}`, payload);
                alert("Attendance updated successfully!");
            } else {
                // Create new attendance
                await axios.post(`http://localhost:8080/api/attendance/${CURRENT_USER_ID}`, payload);
                alert("Attendance submitted successfully!");
            }
            resetForm();
            fetchAttendance();
        } catch (error) {
            alert(
                "Error submitting attendance: " +
                (error.response?.data?.message || error.message || "Unknown error")
            );
        }
    };

    const handleEdit = (attendance) => {
        setFormData({
            id: attendance.id,
            date: attendance.date,
            checkIn: attendance.checkIn || "",
            checkOut: attendance.checkOut || "",
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this attendance record?")) return;

        try {
            await axios.delete(`http://localhost:8080/api/attendance/${id}`);
            alert("Attendance deleted successfully!");
            fetchAttendance();
        } catch (error) {
            alert("Failed to delete attendance.");
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Attendance Management</h1>

            {/* Attendance Table */}
            {loading ? (
                <div>Loading attendance records...</div>
            ) : (
                <table className="w-full border mb-6">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Check-In</th>
                            <th className="border p-2">Check-Out</th>
                            <th className="border p-2">Duration (mins)</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceList.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-4 text-center">
                                    No attendance records found.
                                </td>
                            </tr>
                        ) : (
                            attendanceList.map((att) => (
                                <tr key={att.id}>
                                    <td className="border p-2">{att.date}</td>
                                    <td className="border p-2">{att.checkIn || "-"}</td>
                                    <td className="border p-2">{att.checkOut || "-"}</td>
                                    <td className="border p-2">{att.durationInMinutes ?? "-"}</td>
                                    <td className="border p-2">{statusLabels[att.status] || att.status}</td>
                                    <td className="border p-2">
                                        <button
                                            className="text-blue-600 mr-2 hover:underline"
                                            onClick={() => handleEdit(att)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={() => handleDelete(att.id)}
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

            {/* Attendance Form */}
            <h2 className="text-xl font-semibold mb-2">
                {isEditing ? "Edit Attendance" : "Add Attendance"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-xl">
                <div>
                    <label className="block mb-1 font-medium">Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="border p-2 rounded w-full"
                        max={new Date().toISOString().slice(0, 10)}
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Check-In Time:</label>
                    <input
                        type="time"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Check-Out Time:</label>
                    <input
                        type="time"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                    />
                </div>

                <div className="md:col-span-3 text-right">
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                    >
                        {isEditing ? "Update Attendance" : "Add Attendance"}
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="ml-4 bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AttendanceManagement;
