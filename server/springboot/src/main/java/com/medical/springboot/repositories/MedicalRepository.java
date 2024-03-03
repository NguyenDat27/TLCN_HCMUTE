package com.medical.springboot.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.medical.springboot.models.entity.MedicalEntity;

public interface MedicalRepository extends MongoRepository<MedicalEntity, String> {

    @Query(value = "{ 'patientId' : ?0 }", fields = "{'patientId' : 1, 'date' : 1,'doctorId' : 1  }")
    public Page<MedicalEntity> findByPatientId(String patientId, Pageable pageable);

    @Query(value = "{ $and: [ { $or: [{ 'diagnosis' : { $regex: ?0 , $options: 'i' } }, { 'clinics' : { $regex: ?0 , $options: 'i' } }, { 'clinicalDiagnosis' : { $regex: ?0 , $options: 'i' } }, { 'bloodPressure' : { $regex: ?0 , $options: 'i' } } ] }, { 'patientId': { $regex: ?1 } }, { 'doctorId': { $regex: ?2 } } ] }", fields = "{'patientId' : 1, 'date' : 1,'doctorId' : 1  }")
    public Page<MedicalEntity> find(String keyword, String patientId, String doctorId, Pageable pageable);

    // statistical
    @Query(value = "{$and: [ { 'doctorId' : { $regex: ?0 } }, { 'date' : { $gte: ?1 } }, { 'date' : { $lte: ?2 } } ] }")
    public List<MedicalEntity> findByDateBetween(String doctor, Date startDate, Date endDate);
    //Count medicals
    @Query(value = "{'doctorId' : { $regex: ?0 } }", count = true)
    public int countByDoctorId(String doctor);
    // get all medicals of doctor
    @Query(value = "{ 'doctorId' : ?0 }")
    public List<MedicalEntity> findAllPatientIdByDoctorId(String doctorId);
    // statistical blood pressure of patient
    @Query(value = "{$and: [ { 'patientId' : ?0 }, { 'date' : { $gte: ?1 } }, { 'date' : { $lte: ?2 } } ] }")
    public List<MedicalEntity> findByPatientIdAndDateBetween(String patientId, Date startDate, Date endDate);
}
