package com.hrms.controller;

import com.hrms.service.AttendanceService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
@Validated
public class AttendanceController {

	private final AttendanceService attendanceService;
	
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/admin/attendance")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@Operation(description = "Get all employee attendance records")
	public ResponseEntity<?> getAllAttendance(Authentication auth) {
		System.out.println("Authorities in auth: " + auth.getAuthorities());
		return ResponseEntity.ok(attendanceService.getAllAttendance());
	}

	@GetMapping("/employee/attendance/{userId}")
	@PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
	@Operation(description = "Get attendance records (Employee can only see own records)")
	public ResponseEntity<?> getAttendanceByUser(@PathVariable Long userId, Authentication auth) {
		Long loggedInUserId = (Long) auth.getPrincipal();

		boolean isEmployee = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_EMPLOYEE"));

		if (isEmployee && !loggedInUserId.equals(userId)) {
			throw new AccessDeniedException("Employees can only view their own attendance");
		}
		return ResponseEntity.ok(attendanceService.getAttendanceByUser(userId));
	}

	// Employee CheckIn
	@PostMapping("/employee/attendance/checkin")
	@PreAuthorize("hasRole('EMPLOYEE')")
	public ResponseEntity<?> checkin(Authentication auth) {
		Long loggedInUserId = (Long) auth.getPrincipal();
		
		return ResponseEntity.ok(attendanceService.checkIn(loggedInUserId));
	}
	
	// Employee Check-Out
    @PutMapping("/employee/attendance/checkout")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<?> checkOut(Authentication auth) {
    	Long loggedInUserId = (Long) auth.getPrincipal();

        return ResponseEntity.ok(attendanceService.checkOut(loggedInUserId));
    }


}
