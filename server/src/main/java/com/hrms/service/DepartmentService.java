package com.hrms.service;

import java.util.List;
import com.hrms.dto.DepartmentDTO;
import jakarta.validation.Valid;

public interface DepartmentService {
	List<DepartmentDTO> getAllDepartments();

	DepartmentDTO createDepartment( DepartmentDTO dto);

	DepartmentDTO updateDepartment(Long id,  DepartmentDTO dto);

	void deleteDepartment(Long id);
	
}
