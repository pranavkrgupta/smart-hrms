package com.hrms.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.hrms.entities.UserEntity;

public class CustomUserDetails implements UserDetails {

	private final UserEntity user;

	public CustomUserDetails(UserEntity user) {
		this.user = user; // store userEntity to fetch info later
	}

	// Returns the roles as authorities that spring security understands
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singletonList(new SimpleGrantedAuthority(user.getUserRole().name()));
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

}
