package com.medical.springboot.services;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.medical.springboot.models.entity.AccountEntity;
import com.medical.springboot.repositories.AccountRepository;

@Service
public class AccountService implements IDao<AccountEntity> {
    private static final Logger logger = LoggerFactory.getLogger(AccountService.class);
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private TokenService tokenService;

    // Create
    @Override
    public AccountEntity create(AccountEntity t) {
        logger.debug("create account: {}", t);
        return accountRepository.save(t);
    }

    // Read all by key = email
    @Override
    public Page<AccountEntity> readAll(Pageable pageable) {
        logger.debug("read all account");
        return accountRepository.findByRoleNot("ADMIN", pageable);
    }

    // Read one
    public Optional<AccountEntity> findFirstByEmail(String email) {
        logger.debug("read account by email: {}", email);
        return Optional.ofNullable(accountRepository.findFirstByEmail(email));
    }

    public Optional<AccountEntity> findById(String id) {
        logger.debug("read account by id: {}", id);
        return accountRepository.findById(id);
    }

    // Update
    @Override
    public AccountEntity update(AccountEntity t) {
        logger.debug("update account: {}", t);
        return accountRepository.save(t);
    }

    // Delete
    @Override
    public boolean delete(String key) {
        try {
            accountRepository.deleteById(key);
            tokenService.deleteTokenByAccountId(key);
            logger.debug("delete account by id: {}", key);
            return true;
        } catch (Exception e) {
            logger.error("delete account by id: {}", key);
            logger.error(e.getMessage());
            return false;
        }
    }

    // Other methods
    public Boolean isExistsByEmail(String email) {
        logger.debug("check exists account by email: {}", email);
        return accountRepository.existsByEmail(email);
    }

    public Boolean isExistsByEmailAndStatus(String email, Boolean status) {
        logger.debug("check status account of email: {} - {}", email, status);
        return accountRepository.existsByEmailAndStatus(email, status);
    }

    public Boolean isExistsById(String id) {
        logger.debug("check exists account by id: {}", id);
        return accountRepository.existsById(id);
    }

    // Active account
    public Boolean activeAccount(String id) {
        logger.debug("active account by id: {}", id);
        try {
            AccountEntity account = accountRepository.findById(id).get();
            account.setStatus(true);
            accountRepository.save(account);
            return true;
        } catch (Exception e) {
            logger.error("active account by id: {}", id);
            return false;
        }
    }

    // Deactive account
    public Boolean deactiveAccount(String id) {
        logger.debug("deactivate account by id: {}", id);
        try {
            AccountEntity account = accountRepository.findById(id).get();
            tokenService.deleteTokenByAccountId(id);
            account.setStatus(false);
            accountRepository.save(account);
            return true;
        } catch (Exception e) {
            logger.error("deactivate account by id: {}", id);
            return false;
        }
    }
}
