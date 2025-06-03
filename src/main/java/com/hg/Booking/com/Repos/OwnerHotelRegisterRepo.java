package com.hg.Booking.com.Repos;

import com.hg.Booking.com.model.OwnerHotelRegister;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface OwnerHotelRegisterRepo extends JpaRepository<OwnerHotelRegister,Integer> {

    OwnerHotelRegister findByEmailAndPassword(String email, String password);

    OwnerHotelRegister findByMobileNumberAndPassword(String mobile, String password);

    OwnerHotelRegister findByEmail(String email);

    OwnerHotelRegister findByMobileNumber(String mobile);

}
