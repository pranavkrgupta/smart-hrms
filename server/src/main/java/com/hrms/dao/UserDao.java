package com.hrms.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hrms.entities.UserEntity;

public interface UserDao extends JpaRepository<UserEntity, Long>{
	
	@EntityGraph(attributePaths = {"designation", "designation.department"})
	List<UserEntity> findAll();
	
	@EntityGraph(attributePaths = {"designation", "designation.department"})
    Optional<UserEntity> findById(Long id);
	
	Optional<UserEntity> findByEmail(String email);
}
