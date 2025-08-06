package com.hrms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.hrms.dto.UserReqDto;
import com.hrms.dto.UserRespDto;
import com.hrms.entities.User;
import com.hrms.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

//	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping
	@Operation(description = "Get All Users")
	public ResponseEntity<List<UserRespDto>> getAllUsers() {
		return ResponseEntity.ok(userService.getAllUsersWithDesignationAndDepartment());
	}

	@PostMapping("/add")
	@Operation(description = "Add New Employee")
	public ResponseEntity<?> addUser(@Valid @RequestBody UserReqDto userReqDto) {
		UserRespDto createdUser = userService.createUser(userReqDto);
		return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
	}

	@GetMapping("/{user_id}")
	@Operation(description = "Get user by ID")
	public ResponseEntity<?> getUserById(@PathVariable Long user_id) {
		return ResponseEntity.ok(userService.getUserById(user_id));
	}

	@PutMapping("/{user_id}")
	@Operation(description = "Update user profile (name, email, address etc.)")
	public ResponseEntity<?> updateUser(@PathVariable Long user_id, @Valid @RequestBody UserReqDto userRequest) {
		return ResponseEntity.ok(userService.updateUser(user_id, userRequest));
	}
	
	@DeleteMapping("/{user_id}")
	@Operation(description = "Delete user (admin only)")
    public ResponseEntity<?> deleteUser(@PathVariable Long user_id) {
        return ResponseEntity.ok(userService.deleteUser(user_id));
    }
}
