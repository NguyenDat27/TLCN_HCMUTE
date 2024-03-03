package com.medical.springboot.configs;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.medical.springboot.utils.TokenFilter;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<TokenFilter> tokenFilter() {
        FilterRegistrationBean<TokenFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(tokenFilterBean());
        registrationBean.addUrlPatterns("/api/auth/*");
        registrationBean.setOrder(0);
        return registrationBean;
    }

    @Bean
    public TokenFilter tokenFilterBean() {
        return new TokenFilter();
    }
}
