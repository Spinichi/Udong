<<<<<<<< HEAD:backend/business/src/main/java/com/udong/backend/global/config/PasswordConfig.java
package com.udong.backend.global.config;
========
package com.udong.backend.users.config;
>>>>>>>> origin/dev:backend/business/src/main/java/com/udong/backend/users/config/PasswordConfig.java

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
