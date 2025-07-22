import React from 'react';

const attendanceData = [
    { date: '01-04-2025', status: 'Present' },
    { date: '02-04-2025', status: 'Absent' },
    { date: '03-04-2025', status: 'Present' },
    { date: '04-04-2025', status: 'Present' },
    { date: '05-04-2025', status: 'Absent' },
    { date: '06-04-2025', status: 'Present' },
];

const Attendance = () => {
    const downloadReport = () => {
        const content = [
            'Attendance Report\n',
            '------------------',
            'Total Working Days: 30',
            'Days Present: 26',
            'Days Absent: 4',
            'Leaves Taken: 2',
            '\nAttendance History:\n',
            ...attendanceData.map((entry) => `${entry.date} : ${entry.status}`),
        ].join('\n');

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'Attendance_Report.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border border-gray-400 shadow-lg bg-white rounded">
            {/* Summary Table */}
            <table className="w-full border border-black mb-3 text-sm">
                <tbody>
                    <tr className="border border-black">
                        <td className="border border-black p-1">Total Working Days</td>
                        <td className="border border-black p-1 text-center">30</td>
                    </tr>
                    <tr className="border border-black">
                        <td className="border border-black p-1">Days Present</td>
                        <td className="border border-black p-1 text-center">26</td>
                    </tr>
                    <tr className="border border-black">
                        <td className="border border-black p-1">Days Absent</td>
                        <td className="border border-black p-1 text-center">4</td>
                    </tr>
                    <tr className="border border-black">
                        <td className="border border-black p-1">Leaves Taken</td>
                        <td className="border border-black p-1 text-center">2</td>
                    </tr>
                </tbody>
            </table>

            {/* Header */}
            <div className="bg-gradient-to-r from-gray-300 to-gray-400 text-center font-medium py-1 mb-2">
                Attendance History
            </div>

            {/* Attendance List */}
            <div className="grid grid-cols-2 gap-1 text-sm">
                {attendanceData.map((entry, index) => (
                    <React.Fragment key={index}>
                        <div className="border border-black text-center py-1">{entry.date}</div>
                        <div
                            className={`text-center py-1 font-semibold ${entry.status === 'Present'
                                    ? 'bg-green-200 text-green-900'
                                    : 'bg-red-200 text-red-900'
                                }`}
                        >
                            {entry.status}
                        </div>
                    </React.Fragment>
                ))}
            </div>

            {/* Download Button */}
            <div className="mt-4 text-center">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
                    onClick={downloadReport}
                >
                    Download Attendance Report
                </button>
            </div>
        </div>
    );
};

export default Attendance;
