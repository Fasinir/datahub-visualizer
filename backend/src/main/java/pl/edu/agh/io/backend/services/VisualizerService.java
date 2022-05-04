package pl.edu.agh.io.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pl.edu.agh.io.backend.entities.common.ChartType;
import pl.edu.agh.io.backend.entities.common.TileType;
import pl.edu.agh.io.backend.entities.request.*;
import pl.edu.agh.io.backend.entities.response.BarChartTile;
import pl.edu.agh.io.backend.entities.response.ChartData;
import pl.edu.agh.io.backend.entities.response.ResponseData;
import pl.edu.agh.io.backend.entities.other.DataJson;
import pl.edu.agh.io.backend.entities.response.SingleValueTile;

import java.util.*;


@Service
public class VisualizerService {
    private JsonConfig jsonConfig;
    private ResponseData responseData;

    public void loadData(JsonConfig jsonConfig) {
        this.jsonConfig = jsonConfig;
        createTiles();
    }

    private void addLineChartData(BarChartTile newTile, DataJson dataJson, LinkedHashMap<String, Object> dataConfig) {
        String path = (String) dataConfig.get("jsonPath");
        List<String> pathList = new ArrayList<>(List.of(path.split("/")));
        String lastPathElem = (pathList.get(pathList.size() - 1));
        pathList.remove(pathList.size() - 1);

        List<String> timestamps = new ArrayList<>();
        List<Double> collectedData = new ArrayList<>();

        for(var i: dataJson.results()) {
            LinkedHashMap<String, Object> sample = (LinkedHashMap<String, Object>) i;
            timestamps.add(((String) sample.get("timestamp")).substring(11, 19));

            LinkedHashMap<String, Object> temp = (LinkedHashMap<String, Object>) sample.get("data");
            for(var j: pathList) {
                temp = (LinkedHashMap<String, Object>) temp.get((String) j);
            }
            collectedData.add((Double) temp.get(lastPathElem));
        }

        ChartData newChart = new ChartData((String) dataConfig.get("label"), ChartType.valueOf((String) dataConfig.get("chartType")), timestamps, collectedData);
        newTile.addChartData(newChart);
    }

    private void createLineBarTile(LinkedHashMap<String, Object> tileConfig) {
        List<LinkedHashMap<String, Object>> endpointsList = (List<LinkedHashMap<String, Object>>) tileConfig.get("endpoints");
        BarChartTile newTile = new BarChartTile(TileType.LINE_BAR_CHART, (String) tileConfig.get("tileLabel"), new ArrayList<>());

        for (LinkedHashMap<String, Object> endpoint : endpointsList) {
            String url = (String) endpoint.get("url");
            List<LinkedHashMap<String, Object>> dataConfigList = (List<LinkedHashMap<String, Object>>) endpoint.get("chartData");

            RestTemplate restTemplate = new RestTemplate();
            DataJson dataJson = restTemplate.getForObject(url, DataJson.class);

            for (LinkedHashMap<String, Object> dataConfig : dataConfigList) {
                addLineChartData(newTile, dataJson, dataConfig);
            }
        }

        responseData.addTile(newTile);
    }

    private void createSingleValueTile(LinkedHashMap<String, Object> tileConfig) {
        String url = (String) tileConfig.get("url");
        RestTemplate restTemplate = new RestTemplate();
        DataJson dataJson = restTemplate.getForObject(url, DataJson.class);

        String path = (String) tileConfig.get("jsonPath");
        List<String> pathList = new ArrayList<>(List.of(path.split("/")));
        String lastPathElem = (pathList.get(pathList.size() - 1));
        pathList.remove(pathList.size() - 1);

        LinkedHashMap<String, Object> lastMeasure = (LinkedHashMap<String, Object>) dataJson.results().get(0);
        LinkedHashMap<String, Object> temp = (LinkedHashMap<String, Object>) lastMeasure.get("data");
        for(var j: pathList) {
            temp = (LinkedHashMap<String, Object>) temp.get((String) j);
        }
        Double collectedValue = (Double) temp.get(lastPathElem);

        SingleValueTile newTile = new SingleValueTile(TileType.SINGLE_VALUE_CHART, (String) tileConfig.get("tileLabel"), collectedValue);
        responseData.addTile(newTile);
    }

    private void createTiles() {
        responseData = new ResponseData(new LinkedList<>());

        List <LinkedHashMap<String, Object>> tiles = jsonConfig.getTiles();
        for(LinkedHashMap<String, Object> tileConfig: tiles) {
            TileType type = TileType.valueOf((String) tileConfig.get("tileType"));

            if(type == TileType.LINE_BAR_CHART) {
                createLineBarTile(tileConfig);
            }
            else if(type == TileType.SINGLE_VALUE_CHART) {
                createSingleValueTile(tileConfig);
            }
        }
    }

    public ResponseData getResponseDataData() {
        return responseData;
    }
}
