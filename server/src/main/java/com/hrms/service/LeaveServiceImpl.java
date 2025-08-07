package com.hrms.service;

import com.hrms.dao.LeaveDao;
import com.hrms.dao.UserDao;
import com.hrms.dto.LeaveDto;
import com.hrms.dto.LeaveResDto;
import com.hrms.entities.Leaves;
import com.hrms.entities.User;
import com.hrms.entities.LeaveStatus;
import com.hrms.entities.LeaveType;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class LeaveServiceImpl implements LeaveService {

    private final LeaveDao leaveDao;
    private final UserDao userDao;
    private final ModelMapper modelMapper;

    @Override
    public List<LeaveResDto> getLeavesByUser(Long userId) {
        List<Leaves> leaves = leaveDao.findByUser_UserId(userId);
        return leaves.stream()
                .map(this::convertToResDto)
                .collect(Collectors.toList());
    }

    @Override
    public void createLeave(Long userId, LeaveDto leaveDto) {
        User user = userDao.getReferenceById(userId);

        Leaves entity = new Leaves();
        entity.setUser(user);
        entity.setFromDate(leaveDto.getFromDate());
        entity.setToDate(leaveDto.getToDate());
        entity.setReason(leaveDto.getReason());
        entity.setComment(leaveDto.getComment());
        entity.setStatus(LeaveStatus.valueOf(leaveDto.getStatus().toUpperCase()));
        entity.setType(LeaveType.valueOf(leaveDto.getType().toUpperCase()));

        leaveDao.save(entity);
    }

    @Override
    public void updateLeave(Long leaveId, LeaveDto leaveDto) {
        Leaves entity = leaveDao.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found with ID: " + leaveId));

        entity.setFromDate(leaveDto.getFromDate());
        entity.setToDate(leaveDto.getToDate());
        entity.setReason(leaveDto.getReason());
        entity.setComment(leaveDto.getComment());
        entity.setStatus(LeaveStatus.valueOf(leaveDto.getStatus().toUpperCase()));
        entity.setType(LeaveType.valueOf(leaveDto.getType().toUpperCase()));

        leaveDao.save(entity);
    }

    @Override
    public void deleteLeave(Long leaveId) {
        leaveDao.deleteById(leaveId);
    }

    // Helper method to convert Leaves entity to LeaveResDto
    private LeaveResDto convertToResDto(Leaves entity) {
        LeaveResDto dto = new LeaveResDto();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUser().getUserId());
        dto.setFromDate(entity.getFromDate());
        dto.setToDate(entity.getToDate());
        dto.setReason(entity.getReason());
        dto.setComment(entity.getComment());
        dto.setStatus(entity.getStatus().name()); // Enum to String (e.g. "Pending")
        dto.setType(entity.getType().name());     // Enum to String (e.g. "Sick")
        return dto;
    }
}
