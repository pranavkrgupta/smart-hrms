import React from "react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <div className="text-red-600 text-6xl font-bold mb-4">⚠️</div>
        <h1 className="text-3xl font-semibold mb-2 text-gray-800">Unauthorized</h1>
        <p className="text-gray-600 mb-6">
          Sorry, you don't have access to this page. Please login first.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
