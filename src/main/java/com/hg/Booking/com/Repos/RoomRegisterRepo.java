package com.hg.Booking.com.Repos;

import com.hg.Booking.com.model.RoomsRegister;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface RoomRegisterRepo extends JpaRepository<RoomsRegister, Integer>
{
}
