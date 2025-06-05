package com.hg.Booking.com.service;

import com.hg.Booking.com.model.RoomsRegister;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface RoomsRegisterService
{

    public RoomsRegister selectAllRooms();

    RoomsRegister addRooms(RoomsRegister roomsRegister, MultipartFile file, MultipartFile file2, MultipartFile file3) throws IOException;
}
