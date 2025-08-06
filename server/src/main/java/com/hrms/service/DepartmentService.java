package com.hrms.service;

import java.util.List;
import com.hrms.dto.DepartmentDTO;
import jakarta.validation.Valid;

public interface DepartmentService {
	List<DepartmentDTO> getAllDepartments();

	DepartmentDTO createDepartment(@Valid DepartmentDTO dto);

	DepartmentDTO updateDepartment(Long id, @Valid DepartmentDTO dto);

	void deleteDepartment(Long id);
	
}
