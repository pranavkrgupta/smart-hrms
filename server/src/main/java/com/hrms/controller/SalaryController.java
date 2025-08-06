package com.hrms.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.dto.SalaryDTO;
import com.hrms.dto.SalaryRespDTO;
import com.hrms.service.SalaryService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/salaries")
@AllArgsConstructor
@CrossOrigin(origins="http://localhost:5173")
public class SalaryController {
	

	private SalaryService salaryService;
	
	// Add Salary
	@PostMapping("/{UserId}")
	@Operation(description = "Add new Salary Record")
	public ResponseEntity<?>addSalary(@PathVariable Long UserId, @RequestBody SalaryDTO dto)
	{
		return ResponseEntity.status(HttpStatus.CREATED).body(salaryService.addNewSalary(UserId, dto));
	}
	
	// Get All Salaries of employees
	@GetMapping
	@Operation(description = "Get All Salary Records")
	public ResponseEntity<?>listAllSalaries()
	{
		List<SalaryRespDTO>salaries = salaryService.getAllSalaries();
		if(salaries.isEmpty())
		{
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(salaries);
	}
	
	@GetMapping("/{userId}")
	@Operation(description="Get Salary Record by ID")
	public ResponseEntity<SalaryRespDTO> getSalaryByUserId(@PathVariable Long userId)
	{
		return ResponseEntity.ok(salaryService.getSalaryByUserId(userId));
	}
	
	
	// Update Salary
	@PutMapping("/{SalaryId}")
	@Operation(description="Update Salary Record")
	public ResponseEntity<?>updateSalary(@PathVariable Integer SalaryId,@RequestBody SalaryDTO dto)
	{
		return ResponseEntity.ok(salaryService.updateSalary(SalaryId,dto));
	}
	
	@DeleteMapping("/{SalaryId}")
	@Operation(description="Delete Salary Record")
	public ResponseEntity<?>deleteSalary(@PathVariable Integer SalaryId) 
	{
		return ResponseEntity.ok(salaryService.deleteSalary(SalaryId));
	}
	
}
