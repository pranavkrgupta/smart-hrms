import React from "react";

function Settings() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4 text-center">Update Password</h2>

        {/* Current Password */}
        <div className="mb-4">
          <label className="block mb-1">Current Password</label>
          <input
            type="password"
            required
            placeholder="Enter current password"
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            required
            placeholder="Enter new password"
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            required
            placeholder="Confirm new password"
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

export default Settings;
