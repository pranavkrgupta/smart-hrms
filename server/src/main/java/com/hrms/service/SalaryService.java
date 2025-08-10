package com.hrms.service;

import java.util.List;

import com.hrms.dto.SalaryReqDto;
import com.hrms.dto.SalaryResDTO;

public interface SalaryService {
	
    // Employee views their own salary info
    List<SalaryResDTO> getSalaryByUser(Long LoggedInuserId);

    // Admin CRUD
    SalaryResDTO createSalary(SalaryReqDto salaryReqDto);

    List<SalaryResDTO> getAllSalaries();

    SalaryResDTO updateSalary(Long salaryId, SalaryReqDto salaryReqDto);

}
