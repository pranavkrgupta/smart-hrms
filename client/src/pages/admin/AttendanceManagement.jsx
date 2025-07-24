import React, { useState } from "react";
const attendanceData = [
  {
    id: 1,
    employee_id: 101,
    name: "Alice",
    date: "2025-07-19",
    check_in: "09:05",
    check_out: "17:30",
    status: "present",
  },
  {
    id: 2,
    employee_id: 102,
    name: "Bob",
    date: "2025-07-19",
    check_in: "",
    check_out: "",
    status: "absent",
  },
  {
    id: 3,
    employee_id: 103,
    name: "Charlie",
    date: "2025-07-19",
    check_in: "09:20",
    check_out: "17:10",
    status: "present",
  },
  {
    id: 4,
    employee_id: 104,
    name: "David",
    date: "2025-07-19",
    check_in: "",
    check_out: "",
    status: "on leave",
  },
  {
    id: 5,
    employee_id: 105,
    name: "Eve",
    date: "2025-07-19",
    check_in: "09:10",
    check_out: "17:45",
    status: "present",
  },
  {
    id: 6,
    employee_id: 101,
    name: "Alice",
    date: "2025-07-20",
    check_in: "09:00",
    check_out: "17:25",
    status: "present",
  },
  {
    id: 7,
    employee_id: 102,
    name: "Bob",
    date: "2025-07-20",
    check_in: "09:15",
    check_out: "17:20",
    status: "present",
  },
  {
    id: 8,
    employee_id: 103,
    name: "Charlie",
    date: "2025-07-20",
    check_in: "09:18",
    check_out: "17:30",
    status: "present",
  },
  {
    id: 9,
    employee_id: 104,
    name: "David",
    date: "2025-07-20",
    check_in: "",
    check_out: "",
    status: "absent",
  },
  {
    id: 10,
    employee_id: 105,
    name: "Eve",
    date: "2025-07-20",
    check_in: "09:05",
    check_out: "17:40",
    status: "present",
  },
  {
    id: 11,
    employee_id: 101,
    name: "Alice",
    date: "2025-07-21",
    check_in: "",
    check_out: "",
    status: "on leave",
  },
  {
    id: 12,
    employee_id: 102,
    name: "Bob",
    date: "2025-07-21",
    check_in: "09:10",
    check_out: "17:15",
    status: "present",
  },
  {
    id: 13,
    employee_id: 103,
    name: "Charlie",
    date: "2025-07-21",
    check_in: "",
    check_out: "",
    status: "absent",
  },
  {
    id: 14,
    employee_id: 104,
    name: "David",
    date: "2025-07-21",
    check_in: "09:12",
    check_out: "17:25",
    status: "present",
  },
  {
    id: 15,
    employee_id: 105,
    name: "Eve",
    date: "2025-07-21",
    check_in: "09:08",
    check_out: "17:35",
    status: "present",
  },
  {
    id: 16,
    employee_id: 101,
    name: "Alice",
    date: "2025-07-22",
    check_in: "09:04",
    check_out: "17:32",
    status: "present",
  },
  {
    id: 17,
    employee_id: 102,
    name: "Bob",
    date: "2025-07-22",
    check_in: "09:00",
    check_out: "17:10",
    status: "present",
  },
  {
    id: 18,
    employee_id: 103,
    name: "Charlie",
    date: "2025-07-22",
    check_in: "09:09",
    check_out: "17:18",
    status: "present",
  },
  {
    id: 19,
    employee_id: 104,
    name: "David",
    date: "2025-07-22",
    check_in: "09:17",
    check_out: "17:00",
    status: "present",
  },
  {
    id: 20,
    employee_id: 105,
    name: "Eve",
    date: "2025-07-22",
    check_in: "",
    check_out: "",
    status: "absent",
  },
  {
    id: 21,
    employee_id: 101,
    name: "Alice",
    date: "2025-07-23",
    check_in: "09:03",
    check_out: "17:28",
    status: "present",
  },
  {
    id: 22,
    employee_id: 102,
    name: "Bob",
    date: "2025-07-23",
    check_in: "",
    check_out: "",
    status: "on leave",
  },
  {
    id: 23,
    employee_id: 103,
    name: "Charlie",
    date: "2025-07-23",
    check_in: "09:10",
    check_out: "17:22",
    status: "present",
  },
  {
    id: 24,
    employee_id: 104,
    name: "David",
    date: "2025-07-23",
    check_in: "09:08",
    check_out: "17:30",
    status: "present",
  },
  {
    id: 25,
    employee_id: 105,
    name: "Eve",
    date: "2025-07-23",
    check_in: "09:11",
    check_out: "17:27",
    status: "present",
  },
];

function AttendanceManagement() {
  const [data, setData] = useState(attendanceData);
  const today = new Date().toISOString().split("T")[0];
  const [viewMode, setViewMode] = useState("date");
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const uniqueEmployees = [...new Set(attendanceData.map((item) => item.name))];

  const dateWiseData = attendanceData.filter(
    (item) => item.date === selectedDate
  );
  const employeeWiseData = attendanceData.filter(
    (item) => item.name === selectedEmployee
  );

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
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </>
              ) : (
                <>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Check-in</th>
                  <th className="border px-4 py-2">Check-out</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
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
                      <td className="border px-4 py-2">{item.employee_id}</td>
                      <td className="border px-4 py-2">{item.name}</td>
                      <td className="border px-4 py-2">
                        {item.check_in || "-"}
                      </td>
                      <td className="border px-4 py-2">
                        {item.check_out || "-"}
                      </td>
                      <td
                        className={`border px-4 py-2 capitalize ${item.status === "present"
                            ? "text-green-600"
                            : item.status === "absent"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                      >
                        {item.status}
                      </td>
                      <td className="border px-4 py-2">
                        <button className="text-blue-600 underline hover:font-semibold">
                          Edit
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border px-4 py-2">{item.date}</td>
                      <td className="border px-4 py-2">
                        {item.check_in || "-"}
                      </td>
                      <td className="border px-4 py-2">
                        {item.check_out || "-"}
                      </td>
                      <td
                        className={`border px-4 py-2 capitalize ${item.status === "present"
                            ? "text-green-600"
                            : item.status === "absent"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                      >
                        {item.status}
                      </td>
                      <td className="border px-4 py-2">
                        <button className="text-blue-600 underline hover:font-semibold">
                          Edit
                        </button>
                      </td>
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
