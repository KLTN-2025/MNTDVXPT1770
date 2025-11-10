package com.example.MovieGo.Model.Entity;

import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Reviews {
    private int reviewId;
    private int movieId;
    private int userId;
    private int rating;       // 5 sao
    private String comment;
    private LocalDateTime createdAt;
}
