package com.hrms.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final String secret = "115374c9eb567af12804ca6199ee45aac2e3e6b1a6d232a1b0525dde520bcf0a";

	private final SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());

	private final long jwtExpirationMs = 1000 * 60 * 60 * 10; // 10 hours

	// =================== Generate Token ===================
	public String generateToken(CustomUserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("userId", userDetails.getUserId());
		claims.put("email", userDetails.getUsername());
		claims.put("roles", userDetails.getAuthorities().stream().map(authority -> authority.getAuthority())
				.collect(Collectors.toList()));

		return Jwts.builder().claims(claims).subject(userDetails.getUsername()) // email
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
				.signWith(key)
				.compact();
	}

	
	// =================== Extract Claims ===================
	
	private Claims extractAllClaims(String token) {
	    return Jwts.parser()
	               .verifyWith(key)
	               .build()
	               .parseClaimsJws(token)
	               .getBody();
	}

    // =================== Extract Username ===================

	public String extractUsername(String token) {
	    return extractAllClaims(token).getSubject();
	}

    // =================== Extract Expiration ===================

	public Date extractExpiration(String token) {
	    return extractAllClaims(token).getExpiration();
	}
	
    // =================== Validate Token ===================

	public boolean validateToken(String token, CustomUserDetails userDetails) {
	    final String username = extractUsername(token);
	    final Date expiration = extractExpiration(token);
	    return (username.equals(userDetails.getUsername()) && expiration.after(new Date()));
	}


}
