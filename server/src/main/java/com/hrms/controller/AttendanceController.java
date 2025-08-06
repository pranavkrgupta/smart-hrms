package com.hrms.controller;

import com.hrms.dto.AttendanceDto;
import com.hrms.dto.AttendanceResDto;
import com.hrms.service.AttendanceService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:5173") // or your frontend origin
@AllArgsConstructor
@Validated
public class AttendanceController {

    private final AttendanceService attendanceService;

    @Operation(
        summary = "Get attendance records by user ID",
        description = "Fetches all attendance records associated with the given user ID. Returns HTTP 204 if no records found."
    )
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AttendanceResDto>> getAttendanceByUser(@PathVariable Long userId) {
        List<AttendanceResDto> attendanceList = attendanceService.getAttendanceByUser(userId);
        if (attendanceList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(attendanceList);
    }

    @Operation(
        summary = "Create a new attendance record for a user",
        description = "Creates a new attendance record for the specified user ID. The request body must contain attendance details."
    )
    @PostMapping("/{userId}")
    public ResponseEntity<?> createAttendance(@PathVariable Long userId,
                                              @Valid @RequestBody AttendanceDto attendanceDto) {
        attendanceService.createAttendance(userId, attendanceDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

  
    @PutMapping("/{attendanceId}")
    @Operation(summary = "Update an attendance record",
               description = "Updates an existing attendance record identified by attendanceId.")
    public ResponseEntity<?> updateAttendance(
            @PathVariable Long attendanceId,
            @Valid @RequestBody AttendanceDto attendanceDto) {
        attendanceService.updateAttendance(attendanceId, attendanceDto);
        return ResponseEntity.ok().build();
    }


    @Operation(
        summary = "Delete an attendance record",
        description = "Deletes the attendance record identified by attendanceId."
    )
    @DeleteMapping("/{attendanceId}")
    public ResponseEntity<?> deleteAttendance(@PathVariable Long attendanceId) {
        attendanceService.deleteAttendance(attendanceId);
        return ResponseEntity.ok().build();
    }
}
