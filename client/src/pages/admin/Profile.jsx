import React, { useState } from 'react';

function Profile() {
  const [admin, setAdmin] = useState({
    name: 'Pranav Kumar Gupta',
    adminId: 'ADM001',
    email: 'admin@hrms.com',
    phone: '+917209260482',
    dateOfJoining: '01-Jan-2022',
    gender: 'Male',
    profileImage: null, // Will store uploaded image
  });

  const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
  const [showEditPhotoModal, setShowEditPhotoModal] = useState(false);
  const [formData, setFormData] = useState({ ...admin });

  const handleDetailsChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveDetails = () => {
    setAdmin(formData);
    setShowEditDetailsModal(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAdmin({ ...admin, profileImage: imageUrl });
      setShowEditPhotoModal(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 border-2 border-black p-1">
          <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden">
            {admin.profileImage ? (
              <img src={admin.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setShowEditPhotoModal(true)}
            className="px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          >
            Edit Profile Photo
          </button>
          <button
            onClick={() => setShowEditDetailsModal(true)}
            className="px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          >
            Edit Profile Details
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="text-left text-sm md:text-base space-y-2">
        <p><span className="font-semibold">Name :</span> {admin.name}</p>
        <p><span className="font-semibold">Admin ID:</span> {admin.adminId}</p>
        <p><span className="font-semibold">Email:</span> {admin.email}</p>
        <p><span className="font-semibold">Phone:</span> {admin.phone}</p>
        <p><span className="font-semibold">Date of Joining:</span> {admin.dateOfJoining}</p>
        <p><span className="font-semibold">Gender:</span> {admin.gender}</p>
      </div>

      {/* Edit Details Modal */}
      {showEditDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Profile Details</h2>
            <div className="space-y-3">
              {["name", "email", "phone", "dateOfJoining", "gender"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleDetailsChange}
                  placeholder={field}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              ))}
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setShowEditDetailsModal(false)} className="px-4 py-1 bg-gray-400 text-white rounded hover:bg-gray-500">
                Cancel
              </button>
              <button onClick={saveDetails} className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Photo Modal */}
      {showEditPhotoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Upload Profile Photo</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="block w-full text-sm text-gray-700"
            />
            <div className="mt-4 flex justify-end">
              <button onClick={() => setShowEditPhotoModal(false)} className="px-4 py-1 bg-gray-400 text-white rounded hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
