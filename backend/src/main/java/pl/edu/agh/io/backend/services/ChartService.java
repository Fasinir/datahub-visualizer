package pl.edu.agh.io.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pl.edu.agh.io.backend.entities.ChartData;
import pl.edu.agh.io.backend.entities.DataJson;
import pl.edu.agh.io.backend.entities.JsonConfig;

import java.util.*;

@Service
public class ChartService {
    private JsonConfig jsonConfig;
    private ChartData chartData;

    public void loadData(JsonConfig jsonConfig) {
        this.jsonConfig = jsonConfig;
        String uri = jsonConfig.getEndpointURL();

        RestTemplate restTemplate = new RestTemplate();
        DataJson dataJson = restTemplate.getForObject(uri, DataJson.class);
        createChartData(dataJson);
    }

    private void createChartData(DataJson dataJson) {
        chartData = new ChartData(new ArrayList(), new LinkedHashMap());
        List<Double> pm1 = new ArrayList<>();
        List<Double> pm2_5 = new ArrayList<>();
        List<Double> pm10 = new ArrayList<>();

        for(int i = 0; i < dataJson.results().size(); i++) {
            LinkedHashMap<String, Object> sample = (LinkedHashMap<String, Object>) dataJson.results().get(i);
            chartData.addLabel(((String) sample.get("timestamp")).substring(11, 19));

            LinkedHashMap<String, Object> data = (LinkedHashMap<String, Object>) sample.get("data");
            LinkedHashMap<String, Object> particles = (LinkedHashMap<String, Object>) data.get("particleConcentrationSensor");
            LinkedHashMap<String, Object> concentration = (LinkedHashMap<String, Object>) particles.get("concentration");

            pm1.add((Double) concentration.get("pm1"));
            pm2_5.add((Double) concentration.get("pm2_5"));
            pm10.add((Double) concentration.get("pm10"));
        }

        chartData.addDataset("pm1", pm1);
        chartData.addDataset("pm2_5", pm2_5);
        chartData.addDataset("pm10", pm10);
    }

    public ChartData getChartData() {
        return chartData;
    }
}
