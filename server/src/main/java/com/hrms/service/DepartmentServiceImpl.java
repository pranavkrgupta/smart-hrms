package com.hrms.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.hrms.dao.DepartmentDao;
import com.hrms.dto.DepartmentReqDto;
import com.hrms.dto.DepartmentResDto;
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
	public List<DepartmentResDto> getAllDepartments() {
		return dao.findAll().stream().map(dep -> modelMapper.map(dep, DepartmentResDto.class)).toList();
	}

	@Override
	public DepartmentResDto createDepartment(DepartmentReqDto depDto) {
		if (dao.existsByName(depDto.getName())) {
			throw new IllegalArgumentException("Department name already exists");
		}
		Department res = dao.save(modelMapper.map(depDto, Department.class));
		return modelMapper.map(res, DepartmentResDto.class);
	}

	@Override
	public DepartmentResDto updateDepartment(Long id, @Valid DepartmentReqDto dto) {
		Optional<Department> dep = dao.findById(id);
		if (dep.isEmpty()) {
			throw new EntityNotFoundException("Deparment does not exist.");
		} else {
			Department tempDep = dep.get();
			tempDep.setName(dto.getName());
			tempDep.setDescription(dto.getDescription());
			dao.save(tempDep);
			return modelMapper.map(tempDep, DepartmentResDto.class);
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
