package com.hg.Booking.com.controller;

import com.hg.Booking.com.model.RoomsRegister;
import com.hg.Booking.com.service.RoomsRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rooms")
public class RoomsController
{

    @Autowired
    RoomsRegisterService roomsRegisterService;

    @PostMapping("/add")
    public ResponseEntity addRoom(@RequestBody RoomsRegister roomsRegister) {
        if (roomsRegister == null) {
            return ResponseEntity.badRequest().body("Invalid room data");
        }else {
            RoomsRegister savedRoom = roomsRegisterService.addRooms(roomsRegister);
            if (savedRoom != null) {
                return ResponseEntity.status(HttpStatus.OK).body(savedRoom);
            } else {
                return ResponseEntity.status(500).body("Failed to add room");
            }
        }
    }

    @GetMapping("/all")
    public ResponseEntity getAllRooms() {
        RoomsRegister roomsRegister = roomsRegisterService.selectAllRooms();
        if (roomsRegister != null) {
            return ResponseEntity.status(HttpStatus.OK).body(roomsRegister);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No rooms found");
        }
    }


}
