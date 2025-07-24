import React, { useEffect, useState } from 'react';

const EmployeeProfile = () => {
    const [employee, setEmployee] = useState(null);
    const [showEditPhoto, setShowEditPhoto] = useState(false);
    const [showEditDetails, setShowEditDetails] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setEmployee({
                profilePhotoUrl: "",
                fullName: "Varun Manwatkar",
                gender: "Male",
                dateOfBirth: "1998-09-01",
                phone: "+91 9876543210",
                address: "Pune, Maharashtra, India",
                employeeId: "EMP102",
                department: "Software Development",
                designation: "Full Stack Developer",
                email: "varun@example.com",
                dateOfJoining: "2023-01-15"
            });
        }, 500);
    }, []);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const photoUrl = URL.createObjectURL(file);
            setEmployee({ ...employee, profilePhotoUrl: photoUrl });
            setShowEditPhoto(false);
        }
    };

    const handleDetailChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleDetailSave = () => {
        setShowEditDetails(false);
    };

    if (!employee) return <div className="text-center text-gray-600 mt-10 text-lg">Loading Employee Profile...</div>;

    return (
        <div className="max-w-5xl mx-auto mt-10 bg-white border border-gray-300 shadow-sm rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6 border-b pb-2">Employee Profile</h2>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column */}
                <div className="w-full md:w-1/3 flex flex-col items-center">
                    <div className="w-36 h-36 rounded-full border border-black flex items-center justify-center overflow-hidden bg-gray-100">
                        {employee.profilePhotoUrl ? (
                            <img
                                src={employee.profilePhotoUrl}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-gray-600 font-medium">Profile</span>
                        )}
                    </div>

                    <button onClick={() => setShowEditPhoto(true)} className="w-full bg-gray-100 border border-gray-300 text-sm text-gray-700 py-2 rounded hover:bg-gray-200 transition mb-2">
                        Edit Photo
                    </button>
                    <button onClick={() => setShowEditDetails(true)} className="w-full bg-gray-100 border border-gray-300 text-sm text-gray-700 py-2 rounded hover:bg-gray-200 transition">
                        Edit Details
                    </button>
                </div>

                {/* Right Column */}
                <div className="w-full md:w-2/3 space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2 border-b pb-1">Personal Information</h3>
                        <div className="space-y-1 text-gray-700">
                            <p><strong>Full Name:</strong> {employee.fullName}</p>
                            <p><strong>Gender:</strong> {employee.gender}</p>
                            <p><strong>Date of Birth:</strong> {employee.dateOfBirth}</p>
                            <p><strong>Phone:</strong> {employee.phone}</p>
                            <p><strong>Address:</strong> {employee.address}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2 border-b pb-1">Official Information</h3>
                        <div className="space-y-1 text-gray-700">
                            <p><strong>Employee ID:</strong> {employee.employeeId}</p>
                            <p><strong>Department:</strong> {employee.department}</p>
                            <p><strong>Designation:</strong> {employee.designation}</p>
                            <p><strong>Email:</strong> {employee.email}</p>
                            <p><strong>Date of Joining:</strong> {employee.dateOfJoining}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Photo Modal */}
            {showEditPhoto && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Upload New Profile Photo</h3>
                        <input type="file" accept="image/*" onChange={handlePhotoChange} />
                        <div className="mt-4 flex justify-end gap-2">
                            <button onClick={() => setShowEditPhoto(false)} className="px-4 py-1 bg-gray-200 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Details Modal */}
            {showEditDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-[500px]">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Edit Employee Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input className="border p-2 rounded text-sm" type="text" name="fullName" value={employee.fullName} onChange={handleDetailChange} placeholder="Full Name" />
                            <input className="border p-2 rounded text-sm" type="text" name="phone" value={employee.phone} onChange={handleDetailChange} placeholder="Phone" />
                            <input className="border p-2 rounded text-sm" type="text" name="address" value={employee.address} onChange={handleDetailChange} placeholder="Address" />
                            <input className="border p-2 rounded text-sm" type="text" name="designation" value={employee.designation} onChange={handleDetailChange} placeholder="Designation" />
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button onClick={() => setShowEditDetails(false)} className="px-4 py-1 bg-gray-200 rounded">Cancel</button>
                            <button onClick={handleDetailSave} className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeProfile;
