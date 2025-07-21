import { useState } from 'react';

export default function Leave() {
    const balance = 20;
    const taken = 5;
    const remaining = balance - taken;

    const history = [
        { date: '2025-07-01', type: 'Sick Leave', status: 'Approved' },
        { date: '2025-06-25', type: 'Casual Leave', status: 'Rejected' },
    ];

    const [form, setForm] = useState({ type: '', from: '', to: '', reason: '' });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Leave Request Submitted:', form);
        alert('Leave request submitted!');
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen p-6">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Leave Summary */}
                <div className="bg-white p-6 rounded-2xl shadow-md border">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">📝 Leave Summary</h2>
                    <div className="flex justify-between text-lg text-gray-600">
                        <div>
                            Leave Balance: <span className="font-bold text-blue-600">{balance}</span>
                        </div>
                        <div>
                            Leaves Taken: <span className="font-bold text-yellow-500">{taken}</span>
                        </div>
                        <div>
                            Remaining: <span className="font-bold text-green-600">{remaining}</span>
                        </div>
                    </div>
                </div>

                {/* Leave History Table */}
                <div className="bg-white p-6 rounded-2xl shadow-md border">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">📜 Leave History</h2>
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-3 border">Date</th>
                                <th className="p-3 border">Type</th>
                                <th className="p-3 border">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((leave, index) => (
                                <tr key={index} className="text-gray-600 text-center hover:bg-gray-50">
                                    <td className="p-3 border">{leave.date}</td>
                                    <td className="p-3 border">{leave.type}</td>
                                    <td className={`p-3 border font-medium ${leave.status === 'Approved' ? 'text-green-600' : 'text-red-500'
                                        }`}>
                                        {leave.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Leave Request Form */}
                <div className="bg-white p-6 rounded-2xl shadow-md border">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">✍️ Leave Request</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <select
                            name="type"
                            onChange={handleChange}
                            value={form.type}
                            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-300"
                            required
                        >
                            <option value="">Select Leave Type</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Earned Leave">Earned Leave</option>
                        </select>

                        <div className="flex gap-4">
                            <input
                                type="date"
                                name="from"
                                onChange={handleChange}
                                value={form.from}
                                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-300"
                                required
                            />
                            <input
                                type="date"
                                name="to"
                                onChange={handleChange}
                                value={form.to}
                                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-300"
                                required
                            />
                        </div>

                        <textarea
                            name="reason"
                            rows="3"
                            onChange={handleChange}
                            value={form.reason}
                            placeholder="Enter reason for leave"
                            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-300"
                            required
                        ></textarea>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
