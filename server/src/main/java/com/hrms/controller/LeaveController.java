package com.hrms.controller;

import com.hrms.dto.LeaveDto;
import com.hrms.dto.LeaveResDto;
import com.hrms.service.LeaveService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
@Validated
public class LeaveController {

    private final LeaveService leaveService;

    // GET all leaves with leave id and user id 
    @GetMapping
    @Operation(description = "Fetch all leave records")
    public ResponseEntity<?> getAllLeaves() {
        System.out.println("in getAllLeaves");
        List<LeaveResDto> leaves = leaveService.getAllLeaves();
        if (leaves.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        return ResponseEntity.ok(leaves);
    }

    // GET leave by ID
    @GetMapping("/{leaveId}")
    @Operation(description = "Get leave details by ID")
    public ResponseEntity<?> getLeaveById(@PathVariable @Min(1) Long leaveId) {
        System.out.println("in getLeaveById " + leaveId);
        return ResponseEntity.ok(leaveService.getLeaveById(leaveId));
    }

    // GET leaves by User ID
    @GetMapping("/user/{userId}")
    @Operation(description = "Get all leaves by user ID")
    public ResponseEntity<?> getLeavesByUser(@PathVariable @Min(1) Long userId) {
        System.out.println("in getLeavesByUser " + userId);
        List<LeaveDto> userLeaves = leaveService.getLeavesByUserId(userId);
        if (userLeaves.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        return ResponseEntity.ok(userLeaves);
    }

    // POST create leave
    @PostMapping("/{userid}")
    @Operation(description = "Create new leave request")
    public ResponseEntity<?> createLeave(@PathVariable Long userid ,@RequestBody @Valid LeaveDto dto) {
        System.out.println("in createLeave " + dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(leaveService.createLeave(userid,dto));
    }

    // PUT update leave
    @PutMapping("/{leaveId}")
    @Operation(description = "Update leave details")
    public ResponseEntity<?> updateLeave(@PathVariable @Min(1) Long leaveId,
                                         @RequestBody @Valid LeaveDto dto) {
        System.out.println("in updateLeave " + leaveId);
        return ResponseEntity.ok(leaveService.updateLeave(leaveId, dto));
    }

    // DELETE leave using leave id
    @DeleteMapping("/{leaveId}")
    @Operation(description = "Delete leave record by ID")
    public ResponseEntity<?> deleteLeave(@PathVariable @Min(1) Long leaveId) {
        System.out.println("in deleteLeave " + leaveId);
        leaveService.deleteLeave(leaveId);
        return ResponseEntity.ok().build();
    }
}
