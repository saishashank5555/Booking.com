package com.hg.Booking.com.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;

import jakarta.validation.constraints.*;

import lombok.*;



import java.util.ArrayList;

import java.util.List;



@Entity
@Table(name = "OwnerHotels")
public class OwnerHotelRegister {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String hotelName;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private Integer numberOfFloors;


    @Email(message = "Email should be valid")
    @Column(unique = true, nullable = false)
    private String email;


    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be 10 digits")
    @Column(nullable = false)
    private String mobileNumber;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    // ✅ Bidirectional relationship with Room entity
    @OneToMany(mappedBy = "ownerHotel", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RoomsRegister> rooms = new ArrayList<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getNumberOfFloors() {
        return numberOfFloors;
    }

    public void setNumberOfFloors(Integer numberOfFloors) {
        this.numberOfFloors = numberOfFloors;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<RoomsRegister> getRooms() {
        return rooms;
    }

    public void setRooms(List<RoomsRegister> rooms) {
        this.rooms = rooms;
    }

    @Override
    public String toString() {
        return "OwnerHotelRegister{" +
                "id=" + id +
                ", hotelName='" + hotelName + '\'' +
                ", location='" + location + '\'' +
                ", numberOfFloors=" + numberOfFloors +
                ", email='" + email + '\'' +
                ", mobileNumber='" + mobileNumber + '\'' +
                ", password='" + password + '\'' +
                ", rooms=" + rooms +
                '}';
    }

    public OwnerHotelRegister(Integer id, String hotelName, String location, Integer numberOfFloors, String email, String mobileNumber, String password, List<RoomsRegister> rooms) {
        this.id = id;
        this.hotelName = hotelName;
        this.location = location;
        this.numberOfFloors = numberOfFloors;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.password = password;
        this.rooms = rooms;
    }

    public OwnerHotelRegister() {}
}

