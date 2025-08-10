package com.hrms.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.dto.SalaryReqDto;
import com.hrms.dto.SalaryResDTO;
import com.hrms.service.SalaryService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/salaries")
@AllArgsConstructor
@CrossOrigin(origins="http://localhost:5173")
public class SalaryController {
	
	private SalaryService salaryService;
	// Employee - View their own salary info
    @GetMapping("/employee")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<?> getSalaryForEmployee(Authentication auth) {
        Long LoggedInuserId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(salaryService.getSalaryByUser(LoggedInuserId));
    }

    // Admin - Create salary
    @PostMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createSalary(@Valid @RequestBody SalaryReqDto salaryReqDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(salaryService.createSalary(salaryReqDto));
    }

    // Admin - Read all salaries
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllSalaries() {
        return ResponseEntity.ok(salaryService.getAllSalaries());
    }

    // Admin - Update salary by id
    @PutMapping("/admin/{salaryId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateSalary(@PathVariable Long salaryId, @Valid @RequestBody SalaryReqDto salaryReqDto) {
        return ResponseEntity.ok(salaryService.updateSalary(salaryId, salaryReqDto));
    }

    
}
