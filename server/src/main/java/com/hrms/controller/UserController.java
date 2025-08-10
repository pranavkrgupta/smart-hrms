package com.hrms.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
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

import com.hrms.dto.UserReqDto;
import com.hrms.dto.UserRespDto;
import com.hrms.entities.UserRole;
import com.hrms.security.CustomUserDetails;
import com.hrms.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class UserController {

	private final UserService userService;

	@GetMapping("/admin/users")
	@PreAuthorize("hasRole('ADMIN')")
	@Operation(description = "Get All Users (Admin only)")
	public ResponseEntity<List<UserRespDto>> getAllUsers() {
		return ResponseEntity.ok(userService.getAllUsersWithDesignationAndDepartment());
	}

	@PostMapping("/admin/users/add")
	@PreAuthorize("hasRole('ADMIN')")
	@Operation(description = "Add New Employee (Admin only)")
	public ResponseEntity<?> addUser(@Valid @RequestBody UserReqDto userReqDto) {
		UserRespDto createdUser = userService.createUser(userReqDto);
		return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
	}

	@GetMapping("/employee/users/{user_id}")
	@PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
	public ResponseEntity<?> getUserById(@PathVariable Long user_id, Authentication auth) {
		Long loggedInUserId = (Long) auth.getPrincipal();
		
		boolean isEmployee = auth.getAuthorities()
		        .stream()
		        .anyMatch(a -> a.getAuthority().equals("ROLE_EMPLOYEE"));
		if (isEmployee && !loggedInUserId.equals(user_id)) {
	        throw new AccessDeniedException("Employees can only access their own data");
	    }

	    return ResponseEntity.ok(userService.getUserById(user_id));
	}

	@PutMapping("/employee/users/{user_id}")
	@PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
	@Operation(description = "Update user profile (Employee can update own, Admin can update any)")
	public ResponseEntity<?> updateUser(@PathVariable Long user_id, @Valid @RequestBody UserReqDto userRequest,
	        Authentication auth) {

	    Long loggedInUserId = (Long) auth.getPrincipal();
	    boolean isEmployee = auth.getAuthorities()
	        .stream()
	        .anyMatch(a -> a.getAuthority().equals("ROLE_EMPLOYEE"));

	    if (isEmployee && !loggedInUserId.equals(user_id)) {
	        throw new AccessDeniedException("Employees can only update their own profile");
	    }

	    return ResponseEntity.ok(userService.updateUser(user_id, userRequest));
	}


	@DeleteMapping("/admin/users/{user_id}")
	@PreAuthorize("hasRole('ADMIN')")
	@Operation(description = "Delete user (Admin only)")
	public ResponseEntity<?> deleteUser(@PathVariable Long user_id) {
		return ResponseEntity.ok(userService.deleteUser(user_id));
	}
}
