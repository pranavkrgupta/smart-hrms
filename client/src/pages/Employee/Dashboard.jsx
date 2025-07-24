function Dashboard({
  salary = 5000,
  attendance = "26/30 Present",
  leaves = 5,
  activities = [
    { date: "10-Apr-2025", description: "Leave Approved for Sick Leave" },
    { date: "05-Apr-2025", description: "Attended company meeting" },
    { date: "01-Apr-2025", description: "Salary Credited" },
  ],
}) {
  return (
    <div className="min-h-screen bg-white text-black p-6 mt-10">
      {/* Quick Info Section */}
      <div className="border p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Quick Info</h2>
        <div className="grid grid-cols-2 text-sm">
          <div className="border p-2">Salary for April 2025</div>
          <div className="border p-2 bg-blue-600 text-white font-semibold">
            {salary}
          </div>

          <div className="border p-2">Attendance this month</div>
          <div className="border p-2">{attendance}</div>

          <div className="border p-2">Leaves Remaining</div>
          <div className="border p-2">{leaves}</div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="border p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
        <div className="text-sm">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="grid grid-cols-2 border p-2 mb-1 last:mb-0"
            >
              <div>{activity.date}</div>
              <div>{activity.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
