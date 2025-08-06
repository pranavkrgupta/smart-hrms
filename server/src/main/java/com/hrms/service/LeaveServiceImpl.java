package com.hrms.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hrms.dao.LeaveDao;
import com.hrms.dao.UserDao;
import com.hrms.dto.LeaveDto;
import com.hrms.dto.LeaveResDto;
import com.hrms.entities.Leaves;
import com.hrms.entities.User;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class LeaveServiceImpl implements LeaveService {

    private final LeaveDao leaveDao;
    private final UserDao userDao;
    private final ModelMapper modelMapper;

    @Override
    public String createLeave(Long userid, LeaveDto dto) {
//        User user = userDao.findById(userid)
//                .orElseThrow(() -> new RuntimeException("User not found"));
        User user = userDao.getReferenceById(userid);
        Leaves entity = modelMapper.map(dto, Leaves.class);
        entity.setUser(user);
        leaveDao.save(entity);

        return "Leave created successfully";
    }

    @Override
    public String updateLeave(Long id, LeaveDto dto) {
        Leaves entity = leaveDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        modelMapper.map(dto, entity);

//        User user = userDao.findById(dto.getUserId())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        entity.setUser(user);

        leaveDao.save(entity);

        return "Leave updated successfully";
    }

    @Override
    public String deleteLeave(Long leaveId) {
//        Leaves entity = leaveDao.findById(leaveId)
//                .orElseThrow(() -> new RuntimeException("Leave not found"));
        Leaves entity= leaveDao.getReferenceById(leaveId);
        leaveDao.delete(entity);
        return "Leave deleted successfully";
    }

    @Override
    public LeaveDto getLeaveById(Long id) {
        Leaves entity = leaveDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        LeaveDto dto = modelMapper.map(entity, LeaveDto.class);
//        dto.setUserId(entity.getUser().getUserId());
        return dto;
    }

    @Override
    public List<LeaveResDto> getAllLeaves() {
        return leaveDao.findAll()
                .stream()
                .map(entity -> {
                    LeaveResDto dto = modelMapper.map(entity, LeaveResDto.class);
                    dto.setUserId(entity.getUser().getUserId());
                    return dto;
                })
                .toList();
    }

    @Override
    public List<LeaveDto> getLeavesByUserId(Long userId) {
        return leaveDao.findByUser_UserId(userId)
                .stream()
                .map(entity -> {
                    LeaveDto dto = modelMapper.map(entity, LeaveDto.class);
//                    dto.setUserId(entity.getUser().getUserId());
                    return dto;
                })
                .toList();
    }
}
