package com.medical.springboot.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.medical.springboot.models.entity.PatientEntity;

public interface PatientRepository extends MongoRepository<PatientEntity, String> {

    public PatientEntity findFirstByEmail(String email);

    public PatientEntity findFirstById(String id);

    public Boolean existsByEmail(String email);

    public Boolean existsByIdAndIsDeleted(String id, Boolean isDeleted);

    @Query("{ $and: [{ 'isDeleted': false},{ $or: [ { 'fullName' : { $regex: ?0 , $options: 'i' } }, {'identificationCard' : { $regex: ?0 , $options: 'i' } } ] } ] }")
    public Page<PatientEntity> search(String keyword, Pageable pageable);

    public Page<PatientEntity> findByIsDeleted(Boolean isDeleted, Pageable pageable);
}
