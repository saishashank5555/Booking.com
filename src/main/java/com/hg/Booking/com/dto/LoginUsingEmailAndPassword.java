package com.hg.Booking.com.dto;

public class LoginUsingEmailAndPassword
{
    private String email;
    private String password;

    public LoginUsingEmailAndPassword() {
    }
    public LoginUsingEmailAndPassword(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    @Override
    public String toString() {
        return "LoginUsingEmailAndPassword{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
