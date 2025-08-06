package com.hrms.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hrms.entities.Designation;

public interface DesignationDao extends JpaRepository<Designation, Long> {

	@EntityGraph(attributePaths = {"department"})
    Optional<Designation> findByDesignationId(Long designationId);
}
