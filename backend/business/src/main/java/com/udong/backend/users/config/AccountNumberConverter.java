<<<<<<<< HEAD:backend/business/src/main/java/com/udong/backend/global/config/AccountNumberConverter.java
package com.udong.backend.global.config;
========
package com.udong.backend.users.config;
>>>>>>>> origin/dev:backend/business/src/main/java/com/udong/backend/users/config/AccountNumberConverter.java

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Converter
@Component
@RequiredArgsConstructor
public class AccountNumberConverter implements AttributeConverter<String, String> {

    private final AesGcmCrypto crypto;

    @Override
    public String convertToDatabaseColumn(String attribute) {
        if (attribute == null || attribute.isBlank()) return null;
        return crypto.encrypt(attribute);
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isBlank()) return null;
        return crypto.decrypt(dbData);
    }
}
