package pl.edu.agh.io.backend.entities.response;

import pl.edu.agh.io.backend.entities.common.TileType;

import java.util.List;

public record BarChartTile(TileType type, String label, List<ChartData> chartData) {
    public void addChartData(ChartData chartData) {
        this.chartData.add(chartData);
    }
}
