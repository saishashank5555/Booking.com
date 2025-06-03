package com.hg.Booking.com.service;

import com.hg.Booking.com.model.OwnerHotelRegister;

import java.util.List;

public interface OwnerHotelService {

    public OwnerHotelRegister registerOwner(OwnerHotelRegister hotelRegister);
    public OwnerHotelRegister selectOwnerByEmailAndPassword(String email,String password);
    public OwnerHotelRegister selectOwnerByMobileAndPassword(String mobile,String password);
    public OwnerHotelRegister selectOwnerById(Integer ownerId);
    public List<OwnerHotelRegister> selectAllOwners();
    public OwnerHotelRegister selectOwnerByEmail(String email);
    public OwnerHotelRegister selectOwnerByMobile(String mobile);
    public List<OwnerHotelRegister> selectOwnersByHotelName(String hotelName);
    public List<OwnerHotelRegister> getAllOwnersByLocation(String location);
    public OwnerHotelRegister updateOwner(OwnerHotelRegister hotelRegister);
    public OwnerHotelRegister updateEmailById(Integer ownerId, String newEmail);
    public OwnerHotelRegister updateEmailByMobile(String mobile, String newEmail);
   public  OwnerHotelRegister updateMobileByEmail(String email, String newMobile);
    public OwnerHotelRegister updatePasswordByEmail(String email, String newPassword);
    public OwnerHotelRegister updatePasswordByMobile(String mobile, String newPassword);
    public OwnerHotelRegister updatePasswordById(Integer ownerId, String newPassword);
    public OwnerHotelRegister updateHotelNameByEmail(String email, String newHotelName);
    public OwnerHotelRegister updateHotelNameByMobile(String mobile, String newHotelName);
    public void deleteOwner(Integer ownerId);
    public void deleteOwnerByEmail(String email);
    public void deleteOwnerByMobile(String mobile);
    public void deleteOwnerByHotelName(String hotelName);

    public void deleteOwnersByEmailAndPassword(String email, String password);
    public List<OwnerHotelRegister> getAllOwnersByHotelName(String hotelName);

}
