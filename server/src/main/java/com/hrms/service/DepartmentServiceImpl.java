package com.hrms.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.hrms.dao.DepartmentDao;
import com.hrms.dto.DepartmentDTO;
import com.hrms.entities.Department;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

	private final ModelMapper modelMapper;
	private DepartmentDao dao;


	@Override
	public List<DepartmentDTO> getAllDepartments() {
		return dao.findAll().stream().map(dep -> modelMapper.map(dep, DepartmentDTO.class)).toList();
	}

	@Override
	public DepartmentDTO createDepartment(DepartmentDTO depDto) {
		if (dao.existsByName(depDto.getName())) {
			throw new IllegalArgumentException("Department name already exists");
		}
		Department res = dao.save(modelMapper.map(depDto, Department.class));
		return modelMapper.map(res, DepartmentDTO.class);
	}

	@Override
	public DepartmentDTO updateDepartment(Long id, @Valid DepartmentDTO dto) {
		Optional<Department> dep = dao.findById(id);
		if (dep.isEmpty()) {
			throw new EntityNotFoundException("Deparment does not exist.");
		} else {
			Department tempDep = dep.get();
			tempDep.setName(dto.getName());
			tempDep.setDescription(dto.getDescription());
			dao.save(tempDep);
			return modelMapper.map(tempDep, DepartmentDTO.class);
		}
	}

	@Override
	public void deleteDepartment(Long id) {
		if (!dao.existsById(id)) {
			throw new EntityNotFoundException("Department does not exist.");
		}
		dao.deleteById(id);
	}

}
