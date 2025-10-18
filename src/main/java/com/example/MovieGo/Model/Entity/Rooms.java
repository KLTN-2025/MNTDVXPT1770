package com.example.MovieGo.Model.Entity;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Rooms {
    private int roomId;
    private int cinemaId;
    private String roomName;
    private int seatCount;
}
