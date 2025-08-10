package com.hrms.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class DesignationReqDto {
	@NotBlank(message = "Designation name is required")
	private String name;
	
	@Size(max = 255, message = "Description must be at most 255 characters")
	private String description;
	
	@NotNull(message = "Department ID is required")
	private Long departmentId;
}
