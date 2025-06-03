package com.hg.Booking.com.model;

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

    @Lob
    private byte[] img1;

    @Lob
    private byte[] img2;

    @Lob
    private byte[] img3;

    private double price;

    // ✅ Proper foreign key reference to hotel owner
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private OwnerHotelRegister ownerHotel;


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

    public byte[] getImg1() {
        return img1;
    }

    public void setImg1(byte[] img1) {
        this.img1 = img1;
    }

    public byte[] getImg2() {
        return img2;
    }

    public void setImg2(byte[] img2) {
        this.img2 = img2;
    }

    public byte[] getImg3() {
        return img3;
    }

    public void setImg3(byte[] img3) {
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
                ", img1=" + Arrays.toString(img1) +
                ", img2=" + Arrays.toString(img2) +
                ", img3=" + Arrays.toString(img3) +
                ", price=" + price +
                ", ownerHotel=" + ownerHotel +
                '}';
    }

    public RoomsRegister(Integer id, Integer floorNumber, Integer roomNumber, String roomType, Integer roomCapacity, byte[] img1, byte[] img2, byte[] img3, double price, OwnerHotelRegister ownerHotel) {
        this.id = id;
        this.floorNumber = floorNumber;
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.roomCapacity = roomCapacity;
        this.img1 = img1;
        this.img2 = img2;
        this.img3 = img3;
        this.price = price;
        this.ownerHotel = ownerHotel;
    }

    public RoomsRegister() {
    }
}

