package com.hrms.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hrms.entities.User;

public interface UserDao extends JpaRepository<User, Long>{
	
	@EntityGraph(attributePaths = {"designation", "designation.department"})
	List<User> findAll();
	
	@EntityGraph(attributePaths = {"designation", "designation.department"})
    Optional<User> findById(Long id);
}
