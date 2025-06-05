package com.hg.Booking.com.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

        import lombok.*;

import java.util.Arrays;


@Entity
@Table(name = "rooms")
public class RoomsRegister {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer floorNumber;

    private Integer roomNumber;

    private String roomType; // AC or NON-AC

    private Integer roomCapacity;

    private String img1;
    private String img2;
    private String img3;

    private String publicImgId1;
    private String publicImgId2;
    private String publicImgId3;


    private double price;

    // ✅ Proper foreign key reference to hotel owner
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonBackReference
    private OwnerHotelRegister ownerHotel;

    public RoomsRegister() {
    }

    public RoomsRegister(Integer id, Integer floorNumber, Integer roomNumber, String roomType, Integer roomCapacity, String img1, String img2, String img3, String publicImgId1, String publicImgId2, String publicImgId3, double price, OwnerHotelRegister ownerHotel) {
        this.id = id;
        this.floorNumber = floorNumber;
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.roomCapacity = roomCapacity;
        this.img1 = img1;
        this.img2 = img2;
        this.img3 = img3;
        this.publicImgId1 = publicImgId1;
        this.publicImgId2 = publicImgId2;
        this.publicImgId3 = publicImgId3;
        this.price = price;
        this.ownerHotel = ownerHotel;
    }

    public String getPublicImgId1() {
        return publicImgId1;
    }

    public void setPublicImgId1(String publicImgId1) {
        this.publicImgId1 = publicImgId1;
    }

    public String getPublicImgId2() {
        return publicImgId2;
    }

    public void setPublicImgId2(String publicImgId2) {
        this.publicImgId2 = publicImgId2;
    }

    public String getPublicImgId3() {
        return publicImgId3;
    }

    public void setPublicImgId3(String publicImgId3) {
        this.publicImgId3 = publicImgId3;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getFloorNumber() {
        return floorNumber;
    }

    public void setFloorNumber(Integer floorNumber) {
        this.floorNumber = floorNumber;
    }

    public Integer getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(Integer roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public Integer getRoomCapacity() {
        return roomCapacity;
    }

    public void setRoomCapacity(Integer roomCapacity) {
        this.roomCapacity = roomCapacity;
    }

    public String getImg1() {
        return img1;
    }

    public void setImg1(String img1) {
        this.img1 = img1;
    }

    public String getImg2() {
        return img2;
    }

    public void setImg2(String img2) {
        this.img2 = img2;
    }

    public String getImg3() {
        return img3;
    }

    public void setImg3(String img3) {
        this.img3 = img3;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public OwnerHotelRegister getOwnerHotel() {
        return ownerHotel;
    }

    public void setOwnerHotel(OwnerHotelRegister ownerHotel) {
        this.ownerHotel = ownerHotel;
    }

    @Override
    public String toString() {
        return "RoomsRegister{" +
                "id=" + id +
                ", floorNumber=" + floorNumber +
                ", roomNumber=" + roomNumber +
                ", roomType='" + roomType + '\'' +
                ", roomCapacity=" + roomCapacity +
                ", img1='" + img1 + '\'' +
                ", img2='" + img2 + '\'' +
                ", img3='" + img3 + '\'' +
                ", price=" + price +
                '}';
    }

}

