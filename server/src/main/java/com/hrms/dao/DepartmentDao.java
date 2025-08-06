package com.hrms.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hrms.entities.Department;

public interface DepartmentDao extends JpaRepository<Department, Long> {
	Boolean existsByName(String name);
}
