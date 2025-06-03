package com.hg.Booking.com.service;


import com.hg.Booking.com.model.OwnerHotelRegister;
import com.hg.Booking.com.repository.OwnerHotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class OwnerHotelServiceImp implements OwnerHotelService{

    @Autowired
    OwnerHotelRepository ownerHotelRepository;

    @Override
    public OwnerHotelRegister registerOwner(OwnerHotelRegister hotelRegister) {
        return ownerHotelRepository.registerOwner(hotelRegister);
    }

    @Override
    public OwnerHotelRegister selectOwnerByEmailAndPassword(String email, String password) {
        return ownerHotelRepository.fetchOwnerByEmailAndPassword(email, password);
    }

    @Override
    public OwnerHotelRegister selectOwnerByMobileAndPassword(String mobile, String password) {
        return null;
    }

    @Override
    public OwnerHotelRegister selectOwnerById(Integer ownerId) {
        return null;
    }

    @Override
    public List<OwnerHotelRegister> selectAllOwners() {
        return null;
    }

    @Override
    public OwnerHotelRegister selectOwnerByEmail(String email) {
        return null;
    }

    @Override
    public OwnerHotelRegister selectOwnerByMobile(String mobile) {
        return null;
    }

    @Override
    public List<OwnerHotelRegister> selectOwnersByHotelName(String hotelName) {
        return null;
    }

    @Override
    public List<OwnerHotelRegister> getAllOwnersByLocation(String location) {
        return null;
    }

    @Override
    public OwnerHotelRegister updateOwner(OwnerHotelRegister hotelRegister) {
        return null;
    }

    @Override
    public OwnerHotelRegister updateEmailById(Integer ownerId, String newEmail) {
        return null;
    }

    @Override
    public OwnerHotelRegister updateEmailByMobile(String mobile, String newEmail) {
        return null;
    }

    @Override
    public OwnerHotelRegister updateMobileByEmail(String email, String newMobile) {
        return null;
    }

    @Override
    public OwnerHotelRegister updatePasswordByEmail(String email, String newPassword) {
        return null;
    }

    @Override
    public OwnerHotelRegister updatePasswordByMobile(String mobile, String newPassword) {
        return null;
    }

    @Override
    public OwnerHotelRegister updatePasswordById(Integer ownerId, String newPassword) {
        return null;
    }

    @Override
    public OwnerHotelRegister updateHotelNameByEmail(String email, String newHotelName) {
        return null;
    }

    @Override
    public OwnerHotelRegister updateHotelNameByMobile(String mobile, String newHotelName) {
        return null;
    }

    @Override
    public void deleteOwner(Integer ownerId) {

    }

    @Override
    public void deleteOwnerByEmail(String email) {

    }

    @Override
    public void deleteOwnerByMobile(String mobile) {

    }

    @Override
    public void deleteOwnerByHotelName(String hotelName) {

    }

    @Override
    public void deleteOwnersByEmailAndPassword(String email, String password) {

    }

    @Override
    public List<OwnerHotelRegister> getAllOwnersByHotelName(String hotelName) {
        return null;
    }
}
