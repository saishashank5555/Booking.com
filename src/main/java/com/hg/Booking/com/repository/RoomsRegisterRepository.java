package com.hg.Booking.com.repository;

import com.hg.Booking.com.model.RoomsRegister;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;


public interface RoomsRegisterRepository
{
   

    public RoomsRegister fetchAllRooms();

    RoomsRegister saveRooms(RoomsRegister roomsRegister);
}