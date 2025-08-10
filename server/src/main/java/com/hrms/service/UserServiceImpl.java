package com.hrms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hrms.custom_exceptions.ResourceNotFoundException;
import com.hrms.dao.DesignationDao;
import com.hrms.dao.UserDao;
import com.hrms.dto.ApiResponse;
import com.hrms.dto.UserReqDto;
import com.hrms.dto.UserRespDto;
import com.hrms.entities.Designation;
import com.hrms.entities.UserEntity;
import com.hrms.entities.UserRole;

import io.swagger.v3.core.jackson.ApiResponsesSerializer;
import jakarta.validation.Valid;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;

	@Autowired
	private final ModelMapper modelMapper;

	@Autowired
	private UserDao userDao;

	@Autowired
	private DesignationDao designationDao;

	UserServiceImpl(ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
		this.modelMapper = modelMapper;
		this.passwordEncoder = passwordEncoder;
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
		UserEntity userEntity = modelMapper.map(userReqDto, UserEntity.class);
		userEntity.setUserId(null); // to avoid update instead of insert
		userEntity.setUserRole(UserRole.ROLE_EMPLOYEE);

		Designation designation = designationDao.findByDesignationId(userReqDto.getDesignationId())
				.orElseThrow(() -> new ResourceNotFoundException("Designation Id is Incorrect"));

		userEntity.setDesignation(designation);
		userEntity.setPassword(passwordEncoder.encode(userReqDto.getEmail()));
		userDao.save(userEntity);

		UserRespDto dto = modelMapper.map(userEntity, UserRespDto.class);
		dto.setDepartmentName(userEntity.getDesignation().getDepartment().getName());

		return dto;
	}

	@Override
	public UserRespDto getUserById(Long user_id) {
		UserEntity UserEntity = userDao.findById(user_id).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
		UserRespDto dto = modelMapper.map(UserEntity, UserRespDto.class);
		dto.setDepartmentName(UserEntity.getDesignation().getDepartment().getName());
		return dto;
	}

	@Override
	public ApiResponse updateUser(Long user_id, @Valid UserReqDto userReqDto) {
	    UserEntity userEntity = userDao.findById(user_id)
	        .orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

	    // Get designation proxy
	    Designation designation = designationDao.getReferenceById(userReqDto.getDesignationId());

	    // Map userReqDto into a temporary User object
	    UserEntity tempUser = modelMapper.map(userReqDto, UserEntity.class);

	    // Copy fields individually to existing userEntity, but skip userId and designation
	    userEntity.setName(tempUser.getName());
	    userEntity.setEmail(tempUser.getEmail());
	    userEntity.setDob(tempUser.getDob());
	    userEntity.setGender(tempUser.getGender());
	    userEntity.setAddress(tempUser.getAddress());
	    userEntity.setPhone(tempUser.getPhone());
	    // Don't change password or userRole here if not part of DTO

	    // Now set the designation explicitly
	    userEntity.setDesignation(designation);

	    // Save updated user
	    userDao.save(userEntity);

	    return new ApiResponse("User with id - " + user_id + " updated");
	}


	@Override
	public ApiResponse deleteUser(Long user_id) {
		UserEntity user = userDao.getReferenceById(user_id);
		userDao.delete(user);
		return new ApiResponse("User Deleted Succesfully");
	}


}
