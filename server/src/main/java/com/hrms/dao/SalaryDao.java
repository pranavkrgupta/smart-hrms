package com.hrms.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hrms.dto.SalaryResDTO;
import com.hrms.entities.Salaries;
import com.hrms.entities.UserEntity;

public interface SalaryDao extends JpaRepository<Salaries, Long> {

	List<Salaries> findAllByUser_UserId(Long loggedInuserId);

}
