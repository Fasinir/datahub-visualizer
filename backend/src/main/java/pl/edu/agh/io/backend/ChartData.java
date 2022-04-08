package pl.edu.agh.io.backend;

import java.util.List;
import java.util.Map;

public class ChartData {
    private List<String> labels;
    private Map<String, Object> datasets;

    public ChartData(List<String> labels, Map<String, Object> datasets) {
        this.labels = labels;
        this.datasets = datasets;
    }

    public List<String> getLabels() {
        return labels;
    }

    public void setLabels(List<String> labels) {
        this.labels = labels;
    }

    public void addLabel(String label) {
        this.labels.add(label);
    }

    public Map<String, Object> getDatasets() {
        return datasets;
    }

    public void setDatasets(Map<String, Object> datasets) {
        this.datasets = datasets;
    }

    public void addDataset(String key, Object value) {
        this.datasets.put(key, value);
    }
}