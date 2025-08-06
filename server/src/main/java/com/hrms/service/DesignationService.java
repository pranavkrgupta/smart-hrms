package com.hrms.service;

import java.util.List;

import com.hrms.dto.DesignationReqDto;
import com.hrms.dto.DesignationResDto;

public interface DesignationService {
	public List<DesignationResDto> getAllDesignations();
	public DesignationResDto createDesignation(DesignationReqDto dto);
	public DesignationResDto updateDesignation(long id, DesignationReqDto dto);
	public void deleteDesignation(long id);
	
}
