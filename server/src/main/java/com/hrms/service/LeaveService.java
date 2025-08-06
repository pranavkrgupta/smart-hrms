package com.hrms.service;

import java.util.List;
import com.hrms.dto.LeaveDto;
import com.hrms.dto.LeaveResDto;

public interface LeaveService {
	List<LeaveResDto> getAllLeaves();
	LeaveDto getLeaveById(Long id);
	String deleteLeave(Long id);
	String updateLeave(Long id, LeaveDto leaveDto);
	String createLeave(Long id,LeaveDto leaveDto);
	List<LeaveDto> getLeavesByUserId(Long userId);
}
