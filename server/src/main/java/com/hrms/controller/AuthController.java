package com.hrms.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.dto.ChangePasswordDto;
import com.hrms.security.CustomUserDetails;
import com.hrms.security.CustomUserDetailsService;
import com.hrms.security.JwtUtil;
import com.hrms.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private CustomUserDetailsService userDetailsService;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserService userService;

	// Login endpoint
	@PostMapping("/login")
	@CrossOrigin(origins = "http://localhost:5173")
	public ResponseEntity<?> login(@RequestBody AuthRequestDto authRequest) {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

			// load userDetails after authentication success
			CustomUserDetails userDetails = (CustomUserDetails) userDetailsService
					.loadUserByUsername(authRequest.getEmail());

			// generate jwt token
			String token = jwtUtil.generateToken(userDetails);

			// Return token as a response
			Map<String, String> response = new HashMap<>();
			response.put("token", token);

			return ResponseEntity.ok(response);

		} catch (AuthenticationException e) {
			return ResponseEntity.status(401).body("Invalid Email or Password");
		}
	}
	
	@PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordDto changePasswordDto,Authentication auth) {

        Long loggedInUserId = (Long) auth.getPrincipal();

        userService.changePassword(loggedInUserId, changePasswordDto);

        return ResponseEntity.ok("Password updated successfully");
    }

}

// DTOs for login
class AuthRequestDto {
	private String email;
	private String password;

	// getters and setters
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
