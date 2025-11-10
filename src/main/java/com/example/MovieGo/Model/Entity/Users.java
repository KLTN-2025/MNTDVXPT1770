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
    private Role role;
    private Status status;  
    private LocalDateTime createdAt;

     public enum Role {
        customer,
        staff,
        admin
    }
    public enum Status {
        active,
        blocked
    }
}
