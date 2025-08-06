package com.hrms.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
// separate dto with id field is needed to send to the react front-end, how else would it make subsequent calls for a specific designation? The one without id is needed for new designation creation as id is auto-generated
public class DesignationResDto {
	
	private Long designationId;
	
	@NotBlank(message = "Designation name is required")
	private String name;
	
	@Size(max = 255, message = "Description must be at most 255 characters")
	private String description;
	
	@NotNull(message = "Department ID is required")
	private Long departmentId;
}
