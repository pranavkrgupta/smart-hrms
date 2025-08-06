package com.hrms.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hrms.entities.Designation;

public interface DesignationDao extends JpaRepository<Designation, Long> {

}
