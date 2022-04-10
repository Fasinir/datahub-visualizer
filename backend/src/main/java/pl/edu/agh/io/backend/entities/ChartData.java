package pl.edu.agh.io.backend.entities;

import java.util.List;
import java.util.Map;

public record ChartData(List<String> labels, Map<String, Object> datasets) {
    public void addLabel(String label) {
        this.labels.add(label);
    }

    public void addDataset(String key, Object value) {
        this.datasets.put(key, value);
    }
}
