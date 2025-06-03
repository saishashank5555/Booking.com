package com.hg.Booking.com.service;

import com.hg.Booking.com.model.RoomsRegister;
import com.hg.Booking.com.repository.RoomsRegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomsRegisterServiceImp  implements RoomsRegisterService{

    @Autowired
    RoomsRegisterRepository roomsRegisterRepository;

    @Override
    public RoomsRegister addRooms(RoomsRegister roomsRegister) {
        return roomsRegisterRepository.saveRooms(roomsRegister);
    }
    @Override
    public RoomsRegister selectAllRooms() {
        return roomsRegisterRepository.fetchAllRooms();
    }
}