package com.hrms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hrms.custom_exceptions.ResourceNotFoundException;
import com.hrms.dao.DesignationDao;
import com.hrms.dao.UserDao;
import com.hrms.dto.ApiResponse;
import com.hrms.dto.UserReqDto;
import com.hrms.dto.UserRespDto;
import com.hrms.entities.Designation;
import com.hrms.entities.User;
import com.hrms.entities.UserRole;

import io.swagger.v3.core.jackson.ApiResponsesSerializer;
import jakarta.validation.Valid;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private final ModelMapper modelMapper;

	@Autowired
	private UserDao userDao;

	@Autowired
	private DesignationDao designationDao;

	UserServiceImpl(ModelMapper modelMapper) {
		this.modelMapper = modelMapper;
	}

	@Override
	public List<UserRespDto> getAllUsersWithDesignationAndDepartment() {
		return userDao.findAll().stream().map(user -> {
			UserRespDto dto = modelMapper.map(user, UserRespDto.class);
			dto.setDepartmentName(user.getDesignation().getDepartment().getName());
			return dto;
		}).collect(Collectors.toList());
	}

	@Override
	public UserRespDto createUser(@Valid UserReqDto userReqDto) {
		User userEntity = modelMapper.map(userReqDto, User.class);
		userEntity.setUserId(null); // to avoid update instead of insert
		userEntity.setUserRole(UserRole.EMPLOYEE);

		Designation designation = designationDao.findByDesignationId(userReqDto.getDesignationId())
				.orElseThrow(() -> new ResourceNotFoundException("Designation Id is Incorrect"));

		userEntity.setDesignation(designation);
		userDao.save(userEntity);

		UserRespDto dto = modelMapper.map(userEntity, UserRespDto.class);
		dto.setDepartmentName(userEntity.getDesignation().getDepartment().getName());

		return dto;
	}

	@Override
	public UserRespDto getUserById(Long user_id) {
		User UserEntity = userDao.findById(user_id).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
		UserRespDto dto = modelMapper.map(UserEntity, UserRespDto.class);
		dto.setDepartmentName(UserEntity.getDesignation().getDepartment().getName());
		return dto;
	}

	@Override
	public ApiResponse updateUser(Long user_id, @Valid UserReqDto userReqDto) {
		User userEntity = userDao.findById(user_id)
			.orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

		// Replaces SELECT query with a proxy (no DB hit unless accessed)
		Designation designation = designationDao.getReferenceById(userReqDto.getDesignationId());
		
		// Update fields using DTO
		modelMapper.map(userReqDto, userEntity);
		userEntity.setDesignation(designation);

		return new ApiResponse("User with id - " + user_id + " updated");
	}

	@Override
	public ApiResponse deleteUser(Long user_id) {
		User user = userDao.getReferenceById(user_id);
		userDao.delete(user);
		return new ApiResponse("User Deleted Succesfully");
	}


}
