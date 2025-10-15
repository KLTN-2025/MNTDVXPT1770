package com.example.MovieGo.Model.Entity;

import java.time.LocalDate;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Movies {
    private int movieId;
    private String title;
    private String genre;
    private int duration;
    private LocalDate releaseDate;
    private String description;
    private String trailerUrl;
    private String posterUrl;
    private float rating;
    private Status status;

    public enum Status {
        nowshowing,
        comingsoon,
        ended
    }
}
