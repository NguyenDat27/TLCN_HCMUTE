package com.medical.springboot.services;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.medical.springboot.models.entity.AccountEntity;
import com.medical.springboot.models.entity.TokenEntity;
import com.medical.springboot.repositories.TokenRepository;

/**
 * Token
 */
@Service
public class TokenService {

    private static final Logger logger = LoggerFactory.getLogger(TokenService.class);
    @Autowired
    private JwtEncoder jwtEncoder;
    @Autowired
    private TokenRepository tokenRepository;

    // Create token
    public String generateToken(AccountEntity accountEntity, String personId) {
        Instant now = Instant.now();
        Instant expiresAt = now.plus(7, ChronoUnit.DAYS);
        String authorities = accountEntity.getRole();

        logger.debug("authorities: {}", authorities);
        logger.debug("personId: {}", personId);

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(expiresAt)
                .subject(personId + "," + accountEntity.getId())
                .claim("authorities", authorities)
                .build();

        String token = this.jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
        //
        TokenEntity tokenEntity = new TokenEntity();
        tokenEntity.setToken(token);
        tokenEntity.setExpiresAt(expiresAt);
        tokenEntity.setAccountId(accountEntity.getId());

        this.tokenRepository.save(tokenEntity);
        //
        return token;
    }

    // Delete token
    public Boolean deleteToken(String token) {
        try {
            this.tokenRepository.deleteByToken(token);
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    // Delete token by account id
    public void deleteTokenByAccountId(String accountId) {
        this.tokenRepository.deleteByAccountId(accountId);
    }

    // Check token
    public Boolean isExistsByToken(String token) {
        logger.info("isExistsByToken");
        return this.tokenRepository.existsByToken(token);
    }

    // Delete token expiresAt
    public void deleteTokenExpiresAt() {
        this.tokenRepository.deleteByExpiresAtBefore(Instant.now());
    }
}