package com.example.MovieGo.Model.Entity;

import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Reports {
    private int reportId;
    private ReportType reportType;
    private LocalDateTime generatedAt;

    public enum ReportType {
        revenue,
        view_count,
        activity
    }
}
