package pl.edu.agh.io.backend.entities.response;

import pl.edu.agh.io.backend.entities.common.ChartType;

import java.util.List;

public record ChartData(String label, ChartType type, List<String> xVals, List<Double> yVals) {
}
