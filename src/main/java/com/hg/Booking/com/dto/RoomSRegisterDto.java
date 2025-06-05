package com.hg.Booking.com.dto;

public class RoomSRegisterDto {

    private Integer floorNumber;

    private Integer roomNumber;

    private String roomType; // AC or NON-AC

    private Integer roomCapacity;
    private double price;

    private Integer owner_id;

    public RoomSRegisterDto() {
    }
    public RoomSRegisterDto(Integer floorNumber, Integer roomNumber, String roomType, Integer roomCapacity, double price, Integer owner_id) {
        this.floorNumber = floorNumber;
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.roomCapacity = roomCapacity;
        this.price = price;
        this.owner_id = owner_id;
    }

    public Integer getOwner_id() {
        return owner_id;
    }
    public void setOwner_id(Integer owner_id) {
        this.owner_id = owner_id;
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "RoomSRegisterDto{" +
                "floorNumber=" + floorNumber +
                ", roomNumber=" + roomNumber +
                ", roomType='" + roomType + '\'' +
                ", roomCapacity=" + roomCapacity +
                ", price=" + price +
                '}';
    }
}