package com.hrms.service;

import com.hrms.dto.LeaveReqDto;
import com.hrms.dto.LeaveResDto;
import com.hrms.entities.LeaveStatus;

import jakarta.validation.Valid;

import java.util.List;

public interface LeaveService {

	LeaveResDto addLeave(LeaveReqDto leaveDto, Long loggedInUserId);
    List<LeaveResDto> getLeavesByUser(Long loggedInUserId);
    LeaveResDto updateLeave(Long leaveId, LeaveReqDto updatedLeaveDto, Long loggedInUserId);
    String deleteLeave(Long leaveId, Long loggedInUserId);
    LeaveResDto updateLeaveStatus(Long leaveId, LeaveStatus status, String comment);
    List<LeaveResDto> getAllLeaves();
    
}
