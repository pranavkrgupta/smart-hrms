import React, { useEffect, useState } from "react";
import {
  getAttendanceByUser,
  checkIn,
  checkOut,
} from "../../services/attendanceService";

function Attendance() {
  const [data, setData] = useState([]);
  const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
//   const [reload, setReload] = useState(false);

  const loadData = () => {
    getAttendanceByUser()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.message || "Error fetching attendance data");
      });
  };

  useEffect(() => {
    loadData();
  }, [data]);

  const handleCheckIn = () => {
    checkIn()
      .then(() => {
        loadData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCheckOut = () => {
    checkOut()
      .then(() => {
        loadData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Find today's attendance record
  const todayRecord = data.find((item) => item.date === todayStr);

  return (
    <div>
      {/* Show buttons based on today's record */}
      <div className="mb-4">
        {!todayRecord ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleCheckIn}
          >
            Check In
          </button>
        ) : todayRecord.checkIn && !todayRecord.checkOut ? (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        ) : null}
      </div>

      {/* Attendance table */}
      <table className="min-w-full border border-gray-400 text-sm text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Check-in</th>
            <th className="border px-4 py-2">Check-out</th>
            <th className="border px-4 py-2">Duration (Minutes)</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {[...data]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.checkIn || "-"}</td>
                <td className="border px-4 py-2">{item.checkOut || "-"}</td>
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
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
