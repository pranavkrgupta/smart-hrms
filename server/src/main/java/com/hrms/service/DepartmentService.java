package com.hrms.service;

import java.util.List;
import com.hrms.dto.DepartmentReqDto;
import com.hrms.dto.DepartmentResDto;

import jakarta.validation.Valid;

public interface DepartmentService {
	List<DepartmentResDto> getAllDepartments();

	DepartmentResDto createDepartment( DepartmentReqDto dto);

	DepartmentResDto updateDepartment(Long id,  DepartmentReqDto dto);

	void deleteDepartment(Long id);
	
}
