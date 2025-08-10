package com.hrms.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.hrms.entities.UserEntity;
import com.hrms.entities.UserRole;

public class CustomUserDetails implements UserDetails {

	private final UserEntity user;
	private final String email;
	private final String userId;
	private final Collection<? extends GrantedAuthority> authorities;

	public CustomUserDetails(UserEntity user) {
		this.user = user; // store userEntity to fetch info later
		this.userId = String.valueOf(user.getUserId());
		this.email = user.getEmail();
		this.authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getUserRole().name()));
	}

	// Returns the roles as authorities that spring security understands
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	// Return password (hashed)
	@Override
	public String getPassword() {
		return user.getPassword();
	}

	// Return email as username
	@Override
	public String getUsername() {
		return user.getEmail();
	}

	public String getUserId() {
		return userId;
	}

	public UserRole getUserRole() {
        return user.getUserRole();
    }
	
}
