package com.hrms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hrms.dao.UserDao;
import com.hrms.dto.UserRespDto;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private final ModelMapper modelMapper;

	@Autowired
	private UserDao userDao;

	UserServiceImpl(ModelMapper modelMapper) {
		this.modelMapper = modelMapper;
	}

	@Override
	public List<UserRespDto> getAllUsersWithDesignationAndDepartment() {
		return userDao.findAll()
				.stream()
				.map(user -> {
					UserRespDto dto = modelMapper.map(user, UserRespDto.class);
					dto.setDepartmentName(user.getDesignation().getDepartment().getName());
					return dto;
				})
				.collect(Collectors.toList());
	}

}
