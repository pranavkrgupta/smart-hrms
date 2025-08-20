package com.hrms.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.dto.DepartmentReqDto;
import com.hrms.service.DepartmentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/departments")
@AllArgsConstructor
public class DepartmentController {

	private DepartmentService service;

	@GetMapping
	public ResponseEntity<?> getAllDepartments() {
		return ResponseEntity.status(HttpStatus.OK).body(service.getAllDepartments());
	}

	@PostMapping
	public ResponseEntity<?> createDepartment(@Valid @RequestBody DepartmentReqDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.createDepartment(dto));
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateDepartment(@PathVariable Long id, @Valid @RequestBody DepartmentReqDto dto) {

		return ResponseEntity.status(HttpStatus.OK).body(service.updateDepartment(id, dto));

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteDepartment(@PathVariable Long id) {
		service.deleteDepartment(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
}
