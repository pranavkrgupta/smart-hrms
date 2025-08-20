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

import com.hrms.dto.DesignationReqDto;
import com.hrms.service.DesignationServiceImpl;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/designations")
@AllArgsConstructor
public class DesignationController {
	private DesignationServiceImpl service;

	@GetMapping
	public ResponseEntity<?> getDesignations() {
		return ResponseEntity.ok(service.getAllDesignations());
	}

	@PostMapping
	public ResponseEntity<?> createDesignation(@Valid @RequestBody DesignationReqDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.createDesignation(dto));
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateDesignation(@PathVariable long id, @Valid @RequestBody DesignationReqDto dto) {
		return ResponseEntity.status(HttpStatus.OK).body(service.updateDesignation(id, dto));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteDesignation(@PathVariable long id){
		service.deleteDesignation(id);
		return ResponseEntity.status(HttpStatus.ACCEPTED).build();
	}
}
