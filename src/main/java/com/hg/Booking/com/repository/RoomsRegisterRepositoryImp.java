package com.hg.Booking.com.repository;

import com.hg.Booking.com.Repos.RoomRegisterRepo;
import com.hg.Booking.com.model.RoomsRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

@Repository
public class RoomsRegisterRepositoryImp implements RoomsRegisterRepository {


    @Autowired
    RoomRegisterRepo roomRegisterRepo;



    @Override
    public RoomsRegister fetchAllRooms() {
        return roomRegisterRepo.findAll().stream().findFirst().orElse(null);
    }

    @Override
    public RoomsRegister saveRooms(RoomsRegister roomsRegister) {
        return roomRegisterRepo.save(roomsRegister);
    }


}
