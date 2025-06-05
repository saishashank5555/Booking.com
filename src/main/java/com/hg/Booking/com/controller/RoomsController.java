package com.hg.Booking.com.controller;

import com.hg.Booking.com.dto.RoomSRegisterDto;
import com.hg.Booking.com.model.OwnerHotelRegister;
import com.hg.Booking.com.model.RoomsRegister;
import com.hg.Booking.com.service.OwnerHotelService;
import com.hg.Booking.com.service.RoomsRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/rooms")
public class RoomsController
{

    @Autowired
    RoomsRegisterService roomsRegisterService;

    @Autowired
    OwnerHotelService ownerHotelService;

    @PostMapping(value = "/addRoom" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addRoom(@RequestPart("data") RoomSRegisterDto roomsRegisterDto ,
                                  @RequestPart("img1")MultipartFile file ,
                                  @RequestPart("img2")MultipartFile file2,
                                  @RequestPart("img3")MultipartFile file3)
    {
        System.out.println("Received request to add room: " + roomsRegisterDto);
        try {
            // Get owner by ID
            OwnerHotelRegister owner = ownerHotelService.selectOwnerById(roomsRegisterDto.getOwner_id());
            System.out.println("Owner fetched: " + owner);
            if (owner == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Owner not found");
            }

            // Map DTO to Entity
            RoomsRegister room = new RoomsRegister();
            room.setFloorNumber(roomsRegisterDto.getFloorNumber());
            room.setRoomNumber(roomsRegisterDto.getRoomNumber());
            room.setRoomType(roomsRegisterDto.getRoomType());
            room.setRoomCapacity(roomsRegisterDto.getRoomCapacity());
            room.setPrice(roomsRegisterDto.getPrice());
            room.setOwnerHotel(owner);
            System.out.println("Room details mapped: " + room);

            // Save room
            RoomsRegister savedRoom = roomsRegisterService.addRooms(room, file, file2, file3);
            System.out.println("Room saved successfully: " + savedRoom);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding room: " + e.getMessage());
        }
    }
}