package com.example.MovieGo.Model.Entity;

import java.time.LocalDateTime;

import lombok.*;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Users {
    private int userId;
    private String fullName;
    private String email;
    private String password;
    private String phone;
    private String role;
    private String status;  
    private LocalDateTime createdAt;
}
