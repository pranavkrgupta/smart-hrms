package com.hrms.service;

import com.hrms.dao.AttendanceDao;
import com.hrms.dao.UserDao;
import com.hrms.dto.AttendanceDto;
import com.hrms.dto.AttendanceResDto;
import com.hrms.entities.Attendance;
import com.hrms.entities.User;
import com.hrms.entities.AttendanceStatus;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceDao attendanceDao;
    private final UserDao userDao;
    private final ModelMapper modelMapper;

    private final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

    @Override
    public List<AttendanceResDto> getAttendanceByUser(Long userId) {
        List<Attendance> attendanceList = attendanceDao.findByUser_UserId(userId);
        return attendanceList.stream()
                .map(this::convertToResDto)
                .collect(Collectors.toList());
    }

    @Override
    public void createAttendance(Long userId, AttendanceDto dto) {
        User user = userDao.getReferenceById(userId);

        // Check date uniqueness (optional)
        if (attendanceDao.existsByUser_UserIdAndDate(userId, dto.getDate())) {
            throw new RuntimeException("Attendance already exists for date " + dto.getDate());
        }

        Attendance entity = new Attendance();
        entity.setUser(user);
        entity.setDate(dto.getDate());
        entity.setCheckIn(parseLocalTime(dto.getCheckIn()));
        entity.setCheckOut(parseLocalTime(dto.getCheckOut()));

        // Status and duration will be updated automatically via entity lifecycle callbacks
        attendanceDao.save(entity);
    }

    @Override
    public void updateAttendance(Long attendanceId, AttendanceDto dto) {
        Attendance entity = attendanceDao.findById(attendanceId)
                .orElseThrow(() -> new RuntimeException("Attendance not found"));

        entity.setDate(dto.getDate());
        entity.setCheckIn(parseLocalTime(dto.getCheckIn()));
        entity.setCheckOut(parseLocalTime(dto.getCheckOut()));

        // Status and duration updated by entity callbacks or can recalc here

        attendanceDao.save(entity);
    }

    @Override
    public void deleteAttendance(Long attendanceId) {
        Attendance entity = attendanceDao.getReferenceById(attendanceId);
        attendanceDao.delete(entity);
    }

    private AttendanceResDto convertToResDto(Attendance entity) {
        AttendanceResDto dto = new AttendanceResDto();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUser().getUserId());
        dto.setDate(entity.getDate());
        dto.setCheckIn(entity.getCheckIn() != null ? entity.getCheckIn().format(timeFormatter) : null);
        dto.setCheckOut(entity.getCheckOut() != null ? entity.getCheckOut().format(timeFormatter) : null);
        dto.setDurationInMinutes(entity.getDurationInMinutes());
        dto.setStatus(entity.getStatus());
        return dto;
    }

    private LocalTime parseLocalTime(String timeStr) {
        if (timeStr == null || timeStr.isBlank()) {
            return null;
        }
        return LocalTime.parse(timeStr, timeFormatter);
    }
}
