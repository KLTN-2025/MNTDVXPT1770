package com.example.MovieGo.Model.Entity;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Seats {
    private int seatId;
    private Rooms roomId;
    private String seatNumber;
    private SeatType seatType;
    private Status status;

    public enum SeatType {
        standard,
        vip
    }

    public enum Status {
        available,
        broken
    }
}
