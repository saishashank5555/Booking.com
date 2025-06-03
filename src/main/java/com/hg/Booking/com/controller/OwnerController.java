package com.hg.Booking.com.controller;

import com.hg.Booking.com.dto.LoginUsingEmailAndPassword;
import com.hg.Booking.com.dto.OtpEntry;
import com.hg.Booking.com.model.OwnerHotelRegister;
import com.hg.Booking.com.service.EmailService;
import com.hg.Booking.com.service.OtpService;
import com.hg.Booking.com.service.OwnerHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/hotel-owner")
public class OwnerController
{
     @Autowired
     OwnerHotelService ownerHotelService;

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    private final Map<String, OwnerHotelRegister> tempUserCache = new ConcurrentHashMap<>();


    @PostMapping("/register")
        public ResponseEntity<?> registerOwner(@RequestBody OwnerHotelRegister hotelRegister)
        {
            String email = hotelRegister.getEmail();
            sendOtpToEmail(email);
            tempUserCache.put(email,hotelRegister);

            return ResponseEntity.ok("OTP sent to your email.");
        }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyTheOtp(@RequestBody OtpEntry otpEntry) {

        String email = otpEntry.getEmail();
        String otp = otpEntry.getOtp();

        boolean isValid = otpService.verifyOtp(email,otp);
        if (isValid) {
            otpService.clearOtp(email);

            // Retrieve user details from in-memory cache
            OwnerHotelRegister hotelRegister = tempUserCache.get(email);

            if (hotelRegister != null) {
                OwnerHotelRegister savedUser = ownerHotelService.registerOwner(hotelRegister);
                tempUserCache.remove(email);
                return ResponseEntity.ok("OTP verified. User registered successfully.");
            } else {
                return ResponseEntity.badRequest().body("Session expired or invalid email.");
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid OTP.");
        }
    }


    public void sendOtpToEmail(String email) {
            String otp = otpService.generateOtp(email);
            emailService.sendOtpEmail(email, otp);
        }

        public String verifyOtp(String email, String otp) {
            boolean isValid = otpService.verifyOtp(email, otp);
            if (isValid) {
                otpService.clearOtp(email);
                return "OTP verified successfully";
            } else {
                throw new RuntimeException("Invalid OTP");
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