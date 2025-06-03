package com.hg.Booking.com.dto;

public class OtpEntry {

    private String email;
    private String otp;
    private long timestamp;


    public OtpEntry(String email, String otp, long timestamp) {
        this.email = email;
        this.otp = otp;
        this.timestamp = timestamp;
    }

    public OtpEntry()
    {}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "OtpEntry{" +
                "email='" + email + '\'' +
                ", otp='" + otp + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}