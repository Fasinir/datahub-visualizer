package pl.edu.agh.io.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pl.edu.agh.io.backend.entities.chart.ChartData;
import pl.edu.agh.io.backend.entities.chart.ChartType;
import pl.edu.agh.io.backend.entities.config.JsonConfig;
import pl.edu.agh.io.backend.entities.data.DataJson;
import pl.edu.agh.io.backend.entities.path.FullPath;
import pl.edu.agh.io.backend.entities.response.ResponseData;
import pl.edu.agh.io.backend.entities.tile.LineBarTile;
import pl.edu.agh.io.backend.entities.tile.SingleValueTile;
import pl.edu.agh.io.backend.entities.tile.TileType;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;

@Service
public class TilesService {
    private FullPath getFullPath(LinkedHashMap<String, Object> dataConfig) {
        String path = (String) dataConfig.get("jsonPath");
        List<String> pathList = new ArrayList<>(List.of(path.split("/")));
        String lastPathElem = (pathList.get(pathList.size() - 1));
        pathList.remove(pathList.size() - 1);

        return new FullPath(pathList, lastPathElem);
    }

    private Double getValueFromData(LinkedHashMap<String, Object> dataSample, FullPath fullPath) {
        LinkedHashMap<String, Object> temp = (LinkedHashMap<String, Object>) dataSample.get("data");
        for(var j: fullPath.pathList()) {
            temp = (LinkedHashMap<String, Object>) temp.get(j);
        }
        return (Double) temp.get(fullPath.lastPathElem());
    }

    private DataJson getDataAPI(LinkedHashMap<String, Object> tileConfig) {
        String url = (String) tileConfig.get("url");
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, DataJson.class);
    }

    private void addLineChartData(LineBarTile newTile, DataJson dataJson, LinkedHashMap<String, Object> dataConfig) {
        FullPath fullPath = getFullPath(dataConfig);

        List<String> timestamps = new ArrayList<>();
        List<Double> collectedData = new ArrayList<>();

        for(var i: dataJson.results()) {
            LinkedHashMap<String, Object> sample = (LinkedHashMap<String, Object>) i;

            String fullDate = (String) sample.get("timestamp");
            timestamps.add(fullDate.substring(11, 19));

            Double foundValue = getValueFromData(sample, fullPath);
            collectedData.add(foundValue);
        }

        ChartData newChart = new ChartData((String) dataConfig.get("label"), ChartType.valueOf((String) dataConfig.get("chartType")), timestamps, collectedData);
        newTile.addChartData(newChart);
    }

    private LineBarTile createLineBarTile(LinkedHashMap<String, Object> tileConfig) {
        List<LinkedHashMap<String, Object>> endpointsList = (List<LinkedHashMap<String, Object>>) tileConfig.get("endpoints");
        LineBarTile newTile = new LineBarTile(TileType.LINE_BAR_CHART, (String) tileConfig.get("tileLabel"), new ArrayList<>());

        for (LinkedHashMap<String, Object> endpoint : endpointsList) {
            DataJson dataJson = getDataAPI(endpoint);
            List<LinkedHashMap<String, Object>> dataConfigList = (List<LinkedHashMap<String, Object>>) endpoint.get("chartData");

            for (LinkedHashMap<String, Object> dataConfig : dataConfigList) {
                addLineChartData(newTile, dataJson, dataConfig);
            }
        }

        return newTile;
    }

    private SingleValueTile createSingleValueTile(LinkedHashMap<String, Object> tileConfig) {
        DataJson dataJson = getDataAPI(tileConfig);
        FullPath fullPath = getFullPath(tileConfig);

        Double foundValue = null;
        if(dataJson != null && !dataJson.results().isEmpty()) {
            LinkedHashMap<String, Object> lastMeasure = dataJson.results().get(0);
            foundValue = getValueFromData(lastMeasure, fullPath);
        }

        return new SingleValueTile(TileType.SINGLE_VALUE_CHART, (String) tileConfig.get("tileLabel"), foundValue);
    }

    ResponseData createTiles(JsonConfig jsonConfig) {
        ResponseData responseData = new ResponseData(new LinkedList<>());

        List <LinkedHashMap<String, Object>> tiles = jsonConfig.getTiles();
        for(LinkedHashMap<String, Object> tileConfig: tiles) {
            TileType type = TileType.valueOf((String) tileConfig.get("tileType"));

            if(type == TileType.LINE_BAR_CHART) {
                LineBarTile newTile = createLineBarTile(tileConfig);
                responseData.addTile(newTile);
            }
            else if(type == TileType.SINGLE_VALUE_CHART) {
                SingleValueTile newTile = createSingleValueTile(tileConfig);
                responseData.addTile(newTile);
            }
        }

        return responseData;
    }
}
