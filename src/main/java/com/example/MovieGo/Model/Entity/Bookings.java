package com.example.MovieGo.Model.Entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Bookings {
    private int bookingId;
    private Users userId;
    private Showtimes showtimeId;
    private LocalDateTime bookingDate;
    private BigDecimal totalPrice;
    private PaymentStatus paymentStatus;
    private PaymentMethod paymentMethod;

    public enum PaymentStatus {
        pending,
        paid,
        cancelled
    }

    public enum PaymentMethod {
        online,
        offline
    }
}
