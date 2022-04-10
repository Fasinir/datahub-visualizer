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

        //dataCategories is a list with strings and with another list in the last position
        //list at the last positions allows to create chart with many values

        //list is splitted into two lists: first with common path, second with specific names
        List<Object> dataCategories = new ArrayList<>(jsonConfig.getDataCategory());
        List<String> specificCategories = (List<String>) dataCategories.get(dataCategories.size()-1);
        dataCategories.remove(dataCategories.size()-1);

        //creating 2d array for demanded chart data
        List<List<Double>> collectedData = new ArrayList<>(specificCategories.size());
        for(int i = 0; i < specificCategories.size(); i++) {
            collectedData.add(new ArrayList<Double>());
        }

        //filling array with datahub data
        for(var i: dataJson.results()) {
            //timestamps
            LinkedHashMap<String, Object> sample = (LinkedHashMap<String, Object>) i;
            chartData.addLabel(((String) sample.get("timestamp")).substring(11, 19));

            //going deep through path to reach the data
            LinkedHashMap<String, Object> temp = (LinkedHashMap<String, Object>) sample.get("data");
            for(var j: dataCategories) {
                temp = (LinkedHashMap<String, Object>) temp.get((String) j);
            }

            //getting specific data
            for(int j = 0; j < specificCategories.size(); j++) {
                collectedData.get(j).add((Double) temp.get(specificCategories.get(j)));
            }
        }

        //assigning our data to chartData class
        for(int i = 0; i < specificCategories.size(); i++) {
            chartData.addDataset(specificCategories.get(i), collectedData.get(i));
        }
    }

    public ChartData getChartData() {
        return chartData;
    }
}
