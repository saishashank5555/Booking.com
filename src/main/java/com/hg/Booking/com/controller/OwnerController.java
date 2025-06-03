package com.hg.Booking.com.controller;

import com.hg.Booking.com.dto.LoginUsingEmailAndPassword;
import com.hg.Booking.com.model.OwnerHotelRegister;
import com.hg.Booking.com.service.OwnerHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hotel-owner")
public class OwnerController
{
     @Autowired
     OwnerHotelService ownerHotelService;

        @PostMapping("/register")
        public ResponseEntity registerOwner(@RequestBody OwnerHotelRegister hotelRegister)
        {
             OwnerHotelRegister ownerHotelRegister = ownerHotelService.registerOwner(hotelRegister);
             if(ownerHotelRegister != null)
             {
                 return ResponseEntity.status(HttpStatus.OK).body(ownerHotelRegister);
             }
             else
             {
                 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Owner registration failed");
             }
        }

        @PostMapping("/loginUsingEmailAndPassword")
        public ResponseEntity loginOwnerByEmail(@RequestBody LoginUsingEmailAndPassword loginUsingEmailAndPassword)
        {
           if(loginUsingEmailAndPassword.getEmail() == null || loginUsingEmailAndPassword.getPassword() == null) {
               return ResponseEntity.badRequest().body("Email and password must not be null");
           }
           else {
               OwnerHotelRegister ownerHotelRegister = ownerHotelService.selectOwnerByEmailAndPassword(
                       loginUsingEmailAndPassword.getEmail(),
                       loginUsingEmailAndPassword.getPassword()
               );
               if(ownerHotelRegister != null)
               {
                   return ResponseEntity.status(HttpStatus.OK).body(ownerHotelRegister);
               }
               else
               {
                   return ResponseEntity.status(HttpStatus.NOT_FOUND)
                           .body("Owner with this email and password does not exist");
               }
           }
        }
}