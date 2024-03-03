package com.medical.springboot.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.medical.springboot.models.entity.DoctorEntity;

public interface DoctorRepository extends MongoRepository<DoctorEntity, String> {

    public DoctorEntity findFirstByEmail(String email);
    public DoctorEntity findFirstById(String id);

    @Query(value = "{'_id': ?0}'}", fields = "{'fullName' : 1}")
    public String findFullNameById(String id);
    //
    public Page<DoctorEntity> findByIsDeleted(Boolean isDeleted, Pageable pageable);
}
