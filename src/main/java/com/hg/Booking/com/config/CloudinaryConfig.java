package com.hg.Booking.com.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dd65z3bee",
                "api_key", "314376313982121",
                "api_secret", "zb3LkFTwszzNpfjT4tyHzF0fa2M"
        ));
    }
}

