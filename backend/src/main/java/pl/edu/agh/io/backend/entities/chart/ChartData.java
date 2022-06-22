package pl.edu.agh.io.backend.entities.chart;

import java.util.List;

public record ChartData(String label, ChartType type, List<Double> yVals, Double outlierLow, Double outlierHigh,
                        String color) {
}
