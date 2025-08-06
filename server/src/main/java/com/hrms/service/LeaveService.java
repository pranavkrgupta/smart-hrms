package com.hrms.service;

import com.hrms.dto.LeaveDto;
import com.hrms.dto.LeaveResDto;

import java.util.List;

public interface LeaveService {
    
    List<LeaveResDto> getLeavesByUser(Long userId);

    void createLeave(Long userId, LeaveDto leaveDto);

    void updateLeave(Long leaveId, LeaveDto leaveDto);

    void deleteLeave(Long leaveId);
}
