package com.hg.Booking.com.service;

import com.hg.Booking.com.model.RoomsRegister;
import com.hg.Booking.com.repository.RoomsRegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class RoomsRegisterServiceImp  implements RoomsRegisterService{

    @Autowired
    RoomsRegisterRepository roomsRegisterRepository;


    @Autowired
    CloudinaryService cloudinaryService;

//    public RoomsRegisterServiceImp(CloudinaryService cloudinaryService) {
//        this.cloudinaryService = cloudinaryService;
//    }

    @Override
    public RoomsRegister addRooms(RoomsRegister roomsRegister, MultipartFile file, MultipartFile file2, MultipartFile file3) throws IOException {
        Map img1 = cloudinaryService.uploadImage(file);
        Map img2 = cloudinaryService.uploadImage(file);
        Map img3 = cloudinaryService.uploadImage(file);
        roomsRegister.setImg1((String) img1.get("url"));
        roomsRegister.setImg2((String) img2.get("url"));
        roomsRegister.setImg3((String) img3.get("url"));
        roomsRegister.setPublicImgId1((String) img1.get("public_id"));
        roomsRegister.setPublicImgId2((String) img2.get("public_id"));
        roomsRegister.setPublicImgId3((String) img3.get("public_id"));
        System.out.println("Image URLS and Public IDs mapped: "+ roomsRegister);
        return roomsRegisterRepository.saveRooms(roomsRegister);
    }

    @Override
    public RoomsRegister selectAllRooms() {
        return roomsRegisterRepository.fetchAllRooms();
    }


}