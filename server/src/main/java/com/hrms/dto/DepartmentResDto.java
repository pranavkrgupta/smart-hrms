package com.hrms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentResDto {
	private long departmentId;
	
	@NotBlank(message = "Department name is mandatory")
	@Size(max = 100, message = "Department name must be at most 100 characters")
	private String name;

	@Size(max = 500, message = "Description must be at most 500 characters")
	private String description;
}
