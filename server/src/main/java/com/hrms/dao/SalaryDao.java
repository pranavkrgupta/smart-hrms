package com.hrms.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hrms.entities.Salaries;

public interface SalaryDao extends JpaRepository<Salaries, Integer> {
	Optional<Salaries>findByUser_UserId(Long UserId);
}
