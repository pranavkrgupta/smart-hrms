package com.hrms.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.hrms.dao.DepartmentDao;
import com.hrms.dao.DesignationDao;
import com.hrms.dto.DesignationReqDto;
import com.hrms.dto.DesignationResDto;
import com.hrms.entities.Department;
import com.hrms.entities.Designation;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DesignationServiceImpl implements DesignationService {

	private final ModelMapper modelMapper;
	private DesignationDao desDao;
	private DepartmentDao depDao;

	@Override
	public List<DesignationResDto> getAllDesignations() {
		return desDao.findAll().stream().map(des -> {
			DesignationResDto dto = new DesignationResDto();
			dto.setDesignationId(des.getDesignationId());
			dto.setName(des.getName());
			dto.setDescription(des.getDescription());
			dto.setDepartmentId(des.getDepartment().getDepartmentId());
			dto.setDepartmentName(des.getDepartment().getName());
			return dto;
		}).toList();
	}

	@Override
	public DesignationResDto createDesignation(DesignationReqDto dto) {
//		do not directly try to save model mapped Entity created out of DTO (dao.save(modelMapper.map(dto, Designation.class))): dto contains dep_id > model mapper creates a stub dep with same id > insertion fails because this new stub designation isn't tracked by hibernate and has the same id as an existing tracked entity 
		Optional<Department> dep = depDao.findById(dto.getDepartmentId());
		if (dep.isEmpty()) {
			throw new IllegalArgumentException("Invalid department id.");
		} else {
			Department persistentDep = dep.get();
			Designation tempDes = new Designation();
			tempDes.setName(dto.getName());
			tempDes.setDescription(dto.getDescription());
			tempDes.setDepartment(persistentDep);
			return modelMapper.map(desDao.save(tempDes), DesignationResDto.class);
		}
	}

	@Override
	public DesignationResDto updateDesignation(long id, DesignationReqDto dto) {
		Optional<Department> dep = depDao.findById(dto.getDepartmentId());
		Optional<Designation> des = desDao.findById(id);
		if (dep.isEmpty()) {
			throw new IllegalArgumentException("Invalid department id.");
		} else if (des.isEmpty()) {
			throw new IllegalArgumentException("Invalid designation id.");
		} else {
			Department persistentDep = dep.get();
			Designation persistentDes = des.get();
			persistentDes.setName(dto.getName());
			persistentDes.setDescription(dto.getDescription());
			persistentDes.setDepartment(persistentDep);
			return modelMapper.map(desDao.save(persistentDes), DesignationResDto.class);
		}
	}

	@Override
	public void deleteDesignation(long id) {
		// TODO Auto-generated method stub
		Boolean exists = desDao.existsById(id);
		if (!exists) {
			throw new IllegalArgumentException("Department does not exist.");
		}
		desDao.deleteById(id);
	}

}
