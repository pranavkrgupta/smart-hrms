package com.hrms.custom_exceptions;

public class ResourceNotFoundException extends RuntimeException{
	
	public ResourceNotFoundException(String msg) {
		super(msg);
	}
}
