package com.hrms.service;

import java.util.List;

import com.hrms.dto.SalaryDTO;
import com.hrms.dto.SalaryRespDTO;

public interface SalaryService {
	
	List<SalaryRespDTO> getAllSalaries();
	String deleteSalary(Integer SalaryId);
	String updateSalary(Integer SalaryId, SalaryDTO dto);
	String addNewSalary(Long UserId, SalaryDTO dto);
	SalaryRespDTO getSalaryByUserId(Long userId);
}
