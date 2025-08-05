package com.hrms.service;

import java.util.List;

import com.hrms.dto.UserReqDto;
import com.hrms.dto.UserRespDto;

import jakarta.validation.Valid;


public interface UserService {

	List<UserRespDto> getAllUsersWithDesignationAndDepartment();

	UserRespDto createUser(@Valid UserReqDto userReqDto);

	UserRespDto getUserById(Long user_id);
	
	
}
