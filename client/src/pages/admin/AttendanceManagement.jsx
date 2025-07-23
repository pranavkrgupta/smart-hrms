import React, { useState } from "react";

function AttendanceManagement() {
  const [date, setDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [attendance, setAttendance] = useState([
    {
      id: 301,
      name: "John Doe",
      checkIn: "09:10 AM",
      checkOut: "06:05 PM",
      status: "Present",
    },
    {
      id: 302,
      name: "Jane Smith",
      checkIn: "09:15 AM",
      checkOut: "",
      status: "Absent",
    },
    {
      id: 303,
      name: "Rahul Verma",
      checkIn: "09:00 AM",
      checkOut: "05:55 PM",
      status: "Present",
    },
  ]);

  return (
    <div className="p-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
        <input
          type="date"
          className="border p-2 rounded w-full sm:w-60"
          name=""
          id=""
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search Employee"
          className="border p-2 w-full sm:w-72"
          name=""
          id=""
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto">Search</button>
      </div>
    </div>
  );
}

export default AttendanceManagement;
