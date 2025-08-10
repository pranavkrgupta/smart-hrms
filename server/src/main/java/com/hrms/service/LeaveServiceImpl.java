package com.hrms.service;

import com.hrms.custom_exceptions.ResourceNotFoundException;
import com.hrms.dao.LeaveDao;
import com.hrms.dao.UserDao;
import com.hrms.dto.LeaveReqDto;
import com.hrms.dto.LeaveResDto;
import com.hrms.entities.Leaves;
import com.hrms.entities.UserEntity;
import com.hrms.entities.LeaveStatus;
import com.hrms.entities.LeaveType;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
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
	public LeaveResDto addLeave(LeaveReqDto leaveDto, Long loggedInUserId) {
		UserEntity user = userDao.findById(loggedInUserId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + loggedInUserId));

		Leaves leave = Leaves.builder().user(user).fromDate(leaveDto.getFromDate()).toDate(leaveDto.getToDate())
				.reason(leaveDto.getReason()).type(leaveDto.getType()).status(LeaveStatus.Pending).build();

		return mapToResDto(leaveDao.save(leave));
	}

	@Override
	public List<LeaveResDto> getLeavesByUser(Long loggedInUserId) {
		return leaveDao.findByUser_UserId(loggedInUserId).stream().map(this::mapToResDto).collect(Collectors.toList());
	}

	@Override
	public LeaveResDto updateLeave(Long leaveId, LeaveReqDto updatedLeaveDto, Long loggedInUserId) {
		Leaves leave = leaveDao.findById(leaveId).orElseThrow(() -> new ResourceNotFoundException("Leave Not Found"));
		if (leave.getUser().getUserId() != loggedInUserId)
			throw new ResourceNotFoundException("You are Not Authorized to Update This Leave");
		if (leave.getStatus() != LeaveStatus.Pending) {
			throw new IllegalStateException("Only pending leaves can be updated");
		}

		leave.setFromDate(updatedLeaveDto.getFromDate());
		leave.setToDate(updatedLeaveDto.getToDate());
		leave.setReason(updatedLeaveDto.getReason());
		leave.setType(updatedLeaveDto.getType());

		return mapToResDto(leaveDao.save(leave));
	}

	@Override
	public String deleteLeave(Long leaveId, Long loggedInUserId) {
		Leaves leave = leaveDao.findById(leaveId).orElseThrow(() -> new ResourceNotFoundException("Leave Not Found"));
		if (leave.getUser().getUserId() != loggedInUserId)
			throw new ResourceNotFoundException("You are Not Authorized to Update This Leave");

		if (leave.getStatus() != LeaveStatus.Pending) {
			throw new IllegalStateException("Only pending leaves can be deleted");
		}

		leaveDao.delete(leave);
		return "Leave deleted successfully";
	}

	@Override
	public LeaveResDto updateLeaveStatus(Long leaveId, LeaveStatus status, String comment) {
		Leaves leave = leaveDao.findById(leaveId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave not found"));

        leave.setStatus(status);
        leave.setComment(comment);

        return mapToResDto(leaveDao.save(leave));
	}

	@Override
	public List<LeaveResDto> getAllLeaves() {
		return leaveDao.findAll()
                .stream()
                .map(this::mapToResDto)
                .collect(Collectors.toList());
	}

	private LeaveResDto mapToResDto(Leaves leave) {
		return LeaveResDto.builder().id(leave.getId()).fromDate(leave.getFromDate()).toDate(leave.getToDate())
				.reason(leave.getReason()).type(leave.getType()).status(leave.getStatus()).comment(leave.getComment())
				.userId(leave.getUser().getUserId()).userName(leave.getUser().getName()).build();
	}

}
