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
        public ResponseEntity<?> registerOwner(@RequestBody OwnerHotelRegister hotelRegister) {
        String email = hotelRegister.getEmail();
        sendOtpToEmail(email);
        tempUserCache.put(email, hotelRegister);

        return ResponseEntity.status(HttpStatus.OK).body("OTP sent to your email.");
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
//                return ResponseEntity.status(HttpStatus.OK).body("OTP verified. User registered successfully.");
                return ResponseEntity.status(HttpStatus.OK).body(savedUser);
            }
            else {
                return ResponseEntity.badRequest().body("Session expired or invalid email./ User NOT registered successfully");
            }
        }
        else {
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


        @GetMapping("/loginUsingEmailAndPassword")
        public ResponseEntity loginOwnerByEmailAndPassword(@RequestBody LoginUsingEmailAndPassword loginUsingEmailAndPassword)
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

    @GetMapping("/getOwnerByEmail/{email}")
    public ResponseEntity<?> getOwnerByEmail(@PathVariable String email) {
        OwnerHotelRegister ownerHotelRegister = ownerHotelService.selectOwnerByEmail(email);
        if (ownerHotelRegister != null) {
            return ResponseEntity.status(HttpStatus.OK).body(ownerHotelRegister);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Owner with this email does not exist");
        }
    }

    @GetMapping("/getOwnerByPhone/{phone}")
    public ResponseEntity<?> getOwnerByPhone(@PathVariable String phone) {
        OwnerHotelRegister ownerHotelRegister = ownerHotelService.selectOwnerByMobile(phone);
        if (ownerHotelRegister != null) {
            return ResponseEntity.status(HttpStatus.OK).body(ownerHotelRegister);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Owner with this phone number does not exist");
        }
    }


    @GetMapping("/getOwnerById/{ownerId}")
    public ResponseEntity<?> getOwnerDetailsById(@PathVariable Integer ownerId) {
        System.out.println("Fetching owner with ID: " + ownerId);
        OwnerHotelRegister ownerHotelRegister = ownerHotelService.selectOwnerById(ownerId);

        if (ownerHotelRegister != null) {
            System.out.println("Owner found: " + ownerHotelRegister);
            return ResponseEntity.status(HttpStatus.OK).body(ownerHotelRegister);
        } else {
            System.out.println("Owner with ID " + ownerId + " does not exist.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Owner with this ID does not exist");
        }
    }


    @GetMapping("/getAllOwners")
    public ResponseEntity<?> getAllOwners() {
            return ResponseEntity.status(HttpStatus.OK).body("Implementation not provided yet. Please check back later.");
    }


}