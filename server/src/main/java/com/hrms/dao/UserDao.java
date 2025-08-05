package com.hrms.dao;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hrms.dto.UserRespDto;
import com.hrms.entities.User;

public interface UserDao extends JpaRepository<User, Long>{
	
	@EntityGraph(attributePaths = {"designation", "designation.department"})
	List<User> findAll();
}
