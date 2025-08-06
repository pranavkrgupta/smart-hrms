package com.hrms.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse {
	private LocalDateTime timeStamp;
	private String msg;
	
	public ApiResponse(String msg) {
		this.timeStamp = LocalDateTime.now();
		this.msg = msg;
	}
}
