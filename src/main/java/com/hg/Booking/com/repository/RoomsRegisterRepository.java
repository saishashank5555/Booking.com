package com.hg.Booking.com.repository;

import com.hg.Booking.com.model.RoomsRegister;
import org.springframework.stereotype.Repository;


public interface RoomsRegisterRepository
{
    public RoomsRegister saveRooms(RoomsRegister roomsRegister);

    public RoomsRegister fetchAllRooms();

}
