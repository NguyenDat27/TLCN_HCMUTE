package com.medical.springboot.utils;

import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.medical.springboot.services.TokenService;
import com.medical.springboot.services.VerifyService;

@Component
public class ScheduledTasks {
  private static final Logger logger = LoggerFactory.getLogger(ScheduledTasks.class);
  @Autowired
  private TokenService tokenService;
  @Autowired
  private VerifyService verifyService;

  @Scheduled(cron = "0 0 0 * * ?", zone = "GMT+7") // second, minute, hour, day, month, weekday
  public void scheduleTaskToken() {
    logger.info("Cron Task Execute");
    logger.info("Cron Task :: Delete token expires at - {}", ZonedDateTime.now(ZoneId.of("GMT+7")));
    tokenService.deleteTokenExpiresAt();
    logger.info("Cron Task :: Delete verify code expires at - {}", ZonedDateTime.now(ZoneId.of("GMT+7")));
    verifyService.deleteVerifyCodeExpiresAt();
  }

}
