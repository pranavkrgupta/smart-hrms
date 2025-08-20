package com.hrms.controller;

import com.hrms.dto.LeaveReqDto;
import com.hrms.entities.LeaveStatus;
import com.hrms.service.LeaveService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/leaves")
@AllArgsConstructor
@Validated
public class LeaveController {

    private final LeaveService leaveService;

    // ====================== EMPLOYEE ======================

    @Operation(summary = "Employee adds a new leave request")
    @PreAuthorize("hasRole('EMPLOYEE')")
    @PostMapping("/employee")
    public ResponseEntity<?> addLeave(@Valid @RequestBody LeaveReqDto leaveDto, Authentication auth) {
        Long loggedInUserId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(leaveService.addLeave(leaveDto, loggedInUserId));
    }

    @Operation(summary = "Employee views all their leave requests")
    @PreAuthorize("hasRole('EMPLOYEE')")
    @GetMapping("/employee")
    public ResponseEntity<?> getLeavesByUser(Authentication auth) {
        Long loggedInUserId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(leaveService.getLeavesByUser(loggedInUserId));
    }

    @Operation(summary = "Employee updates a leave request by ID")
    @PreAuthorize("hasRole('EMPLOYEE')")
    @PutMapping("/employee/{leaveId}")
    public ResponseEntity<?> updateLeave(@PathVariable Long leaveId, @RequestBody LeaveReqDto updatedLeaveDto, Authentication auth) {
        Long loggedInUserId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(leaveService.updateLeave(leaveId, updatedLeaveDto, loggedInUserId));
    }

    @Operation(summary = "Employee deletes a leave request by ID")
    @PreAuthorize("hasRole('EMPLOYEE')")
    @DeleteMapping("/employee/{leaveId}")
    public ResponseEntity<?> deleteLeave(@PathVariable Long leaveId, Authentication auth) {
        Long loggedInUserId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(leaveService.deleteLeave(leaveId, loggedInUserId));
    }

    // ====================== ADMIN ======================

    @Operation(summary = "Admin approves a leave request by ID, with optional comment")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/approve/{leaveId}")
    public ResponseEntity<?> approveLeave(@PathVariable Long leaveId, @RequestParam(required = false) String comment) {
        return ResponseEntity.ok(leaveService.updateLeaveStatus(leaveId, LeaveStatus.Approved, comment));
    }

    @Operation(summary = "Admin rejects a leave request by ID, with optional comment")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/reject/{leaveId}")
    public ResponseEntity<?> rejectLeave(@PathVariable Long leaveId, @RequestParam(required = false) String comment) {
        return ResponseEntity.ok(leaveService.updateLeaveStatus(leaveId, LeaveStatus.Rejected, comment));
    }

    @Operation(summary = "Admin views all leave requests")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity<?> getAllLeaves() {
        return ResponseEntity.ok(leaveService.getAllLeaves());
    }
}
