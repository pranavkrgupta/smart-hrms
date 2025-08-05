package com.hrms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.dto.UserRespDto;
import com.hrms.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping
	@Operation(description = "Get All Users")
	public ResponseEntity<List<UserRespDto>> getAllUsers() {
		return ResponseEntity.ok(userService.getAllUsersWithDesignationAndDepartment());
	}
	
}
