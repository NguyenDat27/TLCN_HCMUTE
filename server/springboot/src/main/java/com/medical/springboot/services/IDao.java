package com.medical.springboot.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IDao<T> {

    public T create(T t);

    public Page<T> readAll(Pageable pageable);

    public T update(T t);

    public boolean delete(String key);
}
