import React, { useEffect, useState } from "react";
import { getAllAttendance } from "../../services/attendanceService";

function AttendanceManagement() {
  const [data, setData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [viewMode, setViewMode] = useState("date");
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const uniqueEmployees = [...new Set(data.map((item) => item.userName))];

  const dateWiseData = data.filter(
    (item) => item.date === selectedDate
  );
  const employeeWiseData = data.filter(
    (item) => item.userName === selectedEmployee
  );

  useEffect(() => {
    getAllAttendance()
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err.message || "Error fetching attendance data");
      });
  }, []);

  return (
    <div>
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <select
          name=""
          id=""
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          className="border px-4 py-2 rounded-md text-gray-700"
        >
          <option value="date">View By Date</option>
          <option value="employee">View By Employee</option>
        </select>

        {/* Date Picker  */}
        {viewMode === "date" && (
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name=""
            id=""
          />
        )}

        {/* Employee Dropdown  */}
        {viewMode === "employee" && (
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="border px-4 py-2 rounded-md text-gray-700"
            name=""
            id=""
          >
            <option value="">Select Employee</option>
            {uniqueEmployees.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Table Section  */}
      <div>
        <table className="min-w-full border border-gray-400 text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              {viewMode === "date" ? (
                <>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Employee</th>
                  <th className="border px-4 py-2">Check-in</th>
                  <th className="border px-4 py-2">Check-out</th>
                  <th className="border px-4 py-2">Duration (Minutes)</th>
                  <th className="border px-4 py-2">Status</th>
                  {/* <th className="border px-4 py-2">Actions</th> */}
                </>
              ) : (
                <>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Check-in</th>
                  <th className="border px-4 py-2">Check-out</th>
                  <th className="border px-4 py-2">Duration (Minutes)</th>
                  <th className="border px-4 py-2">Status</th>
                  {/* <th className="border px-4 py-2">Actions</th> */}
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {(viewMode === "date" ? dateWiseData : employeeWiseData).map(
              (item) => (
                <tr key={item.id}>
                  {viewMode === "date" ? (
                    <>
                      <td className="border px-4 py-2">{item.id}</td>
                      <td className="border px-4 py-2">{item.userName}</td>
                      <td className="border px-4 py-2">
                        {item.checkIn || "-"}
                      </td>
                      <td className="border px-4 py-2">
                        {item.checkOut || "-"}
                      </td>
                      <td className="border px-4 py-2">
                        {item.durationInMinutes || "-"}
                      </td>
                      <td
                        className={`border px-4 py-2 capitalize ${
                          item.status === "ACCEPTED"
                            ? "text-green-600"
                            : item.status === "REJECTED"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {item.status}
                      </td>
                      {/* <td className="border px-4 py-2">
                        <button className="text-blue-600 underline hover:font-semibold">
                          Edit
                        </button>
                      </td> */}
                    </>
                  ) : (
                    <>
                      <td className="border px-4 py-2">{item.date}</td>
                      <td className="border px-4 py-2">
                        {item.checkIn || "-"}
                      </td>
                      <td className="border px-4 py-2">
                        {item.checkOut || "-"}
                      </td>
                      <td className="border px-4 py-2">
                        {item.durationInMinutes || "-"}
                      </td>
                      <td
                        className={`border px-4 py-2 capitalize ${
                          item.status === "ACCEPTED"
                            ? "text-green-600"
                            : item.status === "REJECTED"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {item.status}
                      </td>
                      {/* <td className="border px-4 py-2">
                        <button className="text-blue-600 underline hover:font-semibold">
                          Edit
                        </button>
                      </td> */}
                    </>
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceManagement;
