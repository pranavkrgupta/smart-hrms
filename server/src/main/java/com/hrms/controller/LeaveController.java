package com.hrms.controller;

import com.hrms.dto.LeaveDto;
import com.hrms.dto.LeaveResDto;
import com.hrms.service.LeaveService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "http://localhost:5173") // react frontend origin
@AllArgsConstructor
@Validated
public class LeaveController {

    private final LeaveService leaveService;

    @Operation(summary = "Get leaves by user ID",
               description = "Fetch all leave requests for a specified user.")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LeaveResDto>> getLeavesByUser(@PathVariable Long userId) {
        List<LeaveResDto> leaves = leaveService.getLeavesByUser(userId);
        if (leaves.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(leaves);
    }

    @Operation(summary = "Create a new leave request",
               description = "Creates a leave request for the specified user.")
    @PostMapping("/{userId}")
    public ResponseEntity<?> createLeave(@PathVariable Long userId,
                                         @Valid @RequestBody LeaveDto leaveDto) {
        leaveService.createLeave(userId, leaveDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "Update an existing leave request",
               description = "Update leave details by leave ID.")
    @PutMapping("/{leaveId}")
    public ResponseEntity<?> updateLeave(@PathVariable Long leaveId,
                                         @Valid @RequestBody LeaveDto leaveDto) {
        leaveService.updateLeave(leaveId, leaveDto);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Delete a leave request",
               description = "Delete leave request by its ID.")
    @DeleteMapping("/{leaveId}")
    public ResponseEntity<?> deleteLeave(@PathVariable Long leaveId) {
        leaveService.deleteLeave(leaveId);
        return ResponseEntity.ok().build();
    }
}
