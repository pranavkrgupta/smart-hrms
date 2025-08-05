package com.hrms.service;

import java.util.List;

import com.hrms.dto.UserRespDto;


public interface UserService {

	List<UserRespDto> getAllUsersWithDesignationAndDepartment();

}
