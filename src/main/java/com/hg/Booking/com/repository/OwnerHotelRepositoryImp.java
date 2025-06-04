package com.hg.Booking.com.repository;

import com.hg.Booking.com.Repos.OwnerHotelRegisterRepo;
import com.hg.Booking.com.model.OwnerHotelRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class OwnerHotelRepositoryImp implements OwnerHotelRepository{

    @Autowired
    OwnerHotelRegisterRepo hotelRegisterRepo;

    @Override
    public OwnerHotelRegister registerOwner(OwnerHotelRegister hotelRegister) {
        return hotelRegisterRepo.save(hotelRegister);
    }

    @Override
    public OwnerHotelRegister fetchOwnerByEmailAndPassword(String email, String password) {
        return hotelRegisterRepo.findByEmailAndPassword(email, password);
    }

    @Override
    public OwnerHotelRegister fetchOwnerByMobileAndPassword(String mobile, String password) {
        return hotelRegisterRepo.findByMobileNumberAndPassword(mobile, password);
    }

    @Override
    public OwnerHotelRegister fetchOwnerById(Integer ownerId) {
        Optional<OwnerHotelRegister> byId = hotelRegisterRepo.findById(ownerId);
        if(byId.isPresent())
            return byId.get();
        else
            return null;
    }

    @Override
    public List<OwnerHotelRegister> fetchAllOwners() {
        return hotelRegisterRepo.findAll();
    }

    @Override
    public OwnerHotelRegister fetchOwnerByEmail(String email) {
         return hotelRegisterRepo.findByEmail(email);

    }

    @Override
    public OwnerHotelRegister fetchOwnerByMobile(String mobile) {
        return hotelRegisterRepo.findByMobileNumber(mobile);
    }

    @Override
    public List<OwnerHotelRegister> fetchOwnersByHotelName(String hotelName) {
        return hotelRegisterRepo.findAll().stream()
                .filter(owner -> owner.getHotelName().equalsIgnoreCase(hotelName))
                .toList();
    }

    @Override
    public List<OwnerHotelRegister> fetchAllOwnersByLocation(String location) {
        return hotelRegisterRepo.findAll().stream()
                .filter(owner -> owner.getLocation().equalsIgnoreCase(location))
                .toList();
    }

    @Override
    public OwnerHotelRegister updateOwner(OwnerHotelRegister hotelRegister) {
        return hotelRegisterRepo.save(hotelRegister);
    }

    @Override
    public OwnerHotelRegister updateEmailById(Integer ownerId, String newEmail) {
        return hotelRegisterRepo.findById(ownerId)
                .map(owner -> {
                    owner.setEmail(newEmail);
                    return hotelRegisterRepo.save(owner);
                })
                .orElse(null);
    }

    @Override
    public OwnerHotelRegister updateEmailByMobile(String mobile, String newEmail) {
        OwnerHotelRegister byMobile = hotelRegisterRepo.findByMobileNumber(mobile);
        if (byMobile != null) {
            byMobile.setEmail(newEmail);
            return hotelRegisterRepo.save(byMobile);
        }
        return byMobile;
    }

    @Override
    public OwnerHotelRegister updateMobileByEmail(String email, String newMobile) {
        OwnerHotelRegister byEmail = hotelRegisterRepo.findByEmail(email);
        if (byEmail != null) {
            byEmail.setMobileNumber(newMobile);
            return hotelRegisterRepo.save(byEmail);
        }
        return byEmail;
    }

    @Override
    public OwnerHotelRegister updatePasswordByEmail(String email, String newPassword) {
        OwnerHotelRegister byEmail = hotelRegisterRepo.findByEmail(email);
        if (byEmail != null) {
            byEmail.setPassword(newPassword);
            return hotelRegisterRepo.save(byEmail);
        }
return  byEmail;
    }

    @Override
    public OwnerHotelRegister updatePasswordByMobile(String mobile, String newPassword) {
        OwnerHotelRegister byMobile = hotelRegisterRepo.findByMobileNumber(mobile);
        if (byMobile != null) {
            byMobile.setPassword(newPassword);
            return hotelRegisterRepo.save(byMobile);
        }
        return byMobile;
    }

    @Override
    public OwnerHotelRegister updatePasswordById(Integer ownerId, String newPassword) {
        return hotelRegisterRepo.findById(ownerId)
                .map(owner -> {
                    owner.setPassword(newPassword);
                    return hotelRegisterRepo.save(owner);
                })
                .orElse(null);
    }

    @Override
    public OwnerHotelRegister updateHotelNameByEmail(String email, String newHotelName) {
        OwnerHotelRegister byEmail = hotelRegisterRepo.findByEmail(email);
        if (byEmail != null) {
            byEmail.setHotelName(newHotelName);
            return hotelRegisterRepo.save(byEmail);
        }
        return byEmail;
    }

    @Override
    public OwnerHotelRegister updateHotelNameByMobile(String mobile, String newHotelName) {
        OwnerHotelRegister byMobile = hotelRegisterRepo.findByMobileNumber(mobile);
        if (byMobile != null) {
            byMobile.setHotelName(newHotelName);
            return hotelRegisterRepo.save(byMobile);
        }
        return byMobile;
    }

    @Override
    public void deleteOwner(Integer ownerId) {
        hotelRegisterRepo.deleteById(ownerId);
    }

    @Override
    public void deleteOwnerByEmail(String email) {
        OwnerHotelRegister owner = hotelRegisterRepo.findByEmail(email);
        if (owner != null) {
            hotelRegisterRepo.delete(owner);
        }
    }

    @Override
    public void deleteOwnerByMobile(String mobile) {
        OwnerHotelRegister owner = hotelRegisterRepo.findByMobileNumber(mobile);
        if (owner != null) {
            hotelRegisterRepo.delete(owner);
        }
    }

    @Override
    public void deleteOwnerByHotelName(String hotelName) {

    }

    @Override
    public void deleteOwnersByEmailAndPassword(String email, String password) {

    }

    @Override
    public List<OwnerHotelRegister> fetchAllOwnersByHotelName(String hotelName) {
        return null;
    }
}
