package com.hrms.service;

import com.hrms.dto.AttendanceDto;
import com.hrms.dto.AttendanceResDto;
import java.util.List;

public interface AttendanceService {

    List<AttendanceResDto> getAttendanceByUser(Long userId);

    void createAttendance(Long userId, AttendanceDto attendanceDto);

    void updateAttendance(Long attendanceId, AttendanceDto attendanceDto);

    void deleteAttendance(Long attendanceId);
}
