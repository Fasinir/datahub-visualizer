package pl.edu.agh.io.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pl.edu.agh.io.backend.entities.chart.ChartData;
import pl.edu.agh.io.backend.entities.chart.ChartType;
import pl.edu.agh.io.backend.entities.data.DataJson;
import pl.edu.agh.io.backend.entities.path.FullPath;
import pl.edu.agh.io.backend.entities.tile.LineBarTile;
import pl.edu.agh.io.backend.entities.tile.TileData;

import java.util.*;

@Service
public class ChartService {
    void addLineBarChartData(LineBarTile newTile, DataJson dataJson, List<String> xVals, LinkedHashMap<String, Object> dataConfig) {
        FullPath fullPath = getFullPath(dataConfig);

        Map<String, Double> collectedData = new LinkedHashMap<>(); //a map for collecting data: key = timestamp, value = desired value
        for (LinkedHashMap<String, Object> sample : dataJson.results()) {
            String fullDate = (String) sample.get("timestamp");
            String parsedDate = extractDateAndTime(fullDate);
            Double foundValue = getValueFromData(sample, fullPath);
            collectedData.put(parsedDate, foundValue);
        }

        List<Double> yVals = new ArrayList<>();
        for (String xVal : xVals) { //for each value from xVals (global for an entire tile) searching for a value in the created map; adding null if not present
            yVals.add(collectedData.getOrDefault(xVal, null));
        }

        ChartData newChart = new ChartData((String) dataConfig.get("label"), ChartType.valueOf((String) dataConfig.get("chartType")),
                yVals, castOutlier(dataConfig.get("outlierLow")), castOutlier(dataConfig.get("outlierHigh")));
        newTile.addChartData(newChart);
    }

    private Double castOutlier(Object outlier){
        if (outlier instanceof Integer integer)
            return integer.doubleValue();
        return (Double) outlier;
    }

    TileData getTileData(LinkedHashMap<String, Object> tileConfig) {
        TileData newTileData = new TileData(new ArrayList<>());
        List<LinkedHashMap<String, Object>> endpointsList = (List<LinkedHashMap<String, Object>>) tileConfig.get("endpoints");

        if (tileConfig.get("maxTime") == null || tileConfig.get("minTime") == null) {
            getLatestData(newTileData, endpointsList);
        }
        else {
            String dateRange = "?date_range=" + tileConfig.get("minTime") + "~" + tileConfig.get("maxTime");
            getTimeRangeData(newTileData, endpointsList, dateRange);
        }

        return newTileData;
    }

    private void getLatestData(TileData tileData, List<LinkedHashMap<String, Object>> endpointsList) {
        for (LinkedHashMap<String, Object> endpoint : endpointsList) {
            DataJson dataJson = getDataAPI((String) endpoint.get("url"));
            tileData.addDataJson(dataJson);
        }
    }

    private void getTimeRangeData(TileData tileData, List<LinkedHashMap<String, Object>> endpointsList, String dateRange) {
        for (LinkedHashMap<String, Object> endpoint : endpointsList) {
            DataJson totalTimeDataJson = new DataJson("", "", new ArrayList<>());

            DataJson dataJson = getDataAPI((String) endpoint.get("url") + dateRange);
            while(dataJson != null && !dataJson.results().isEmpty()) {
                totalTimeDataJson.addExtraResults(dataJson);
                dataJson = getDataAPI(dataJson.next().replace("%7E", "~"));
            }
            tileData.addDataJson(totalTimeDataJson);
        }
    }

    List<String> getTimestamps(TileData tileData) {
        Set<String> timestamps = new HashSet<>();
        for (DataJson dataJson : tileData.tileData()) {
            for (LinkedHashMap<String, Object> sample : dataJson.results()) {
                String fullDate = (String) sample.get("timestamp");
                String parsedDate = extractDateAndTime(fullDate);
                timestamps.add(parsedDate);
            }
        }

        List<String> timestampsList = new ArrayList<>(timestamps);
        Collections.sort(timestampsList);
        return timestampsList;
    }

    DataJson getDataAPI(String url) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, DataJson.class);
    }

    FullPath getFullPath(LinkedHashMap<String, Object> dataConfig) {
        String path = (String) dataConfig.get("jsonPath");
        List<String> pathList = new ArrayList<>(List.of(path.split("/")));
        String lastPathElem = (pathList.get(pathList.size() - 1));
        pathList.remove(pathList.size() - 1);

        return new FullPath(pathList, lastPathElem);
    }

    Double getValueFromData(LinkedHashMap<String, Object> dataSample, FullPath fullPath) {
        LinkedHashMap<String, Object> temp = (LinkedHashMap<String, Object>) dataSample.get("data");
        for (var j : fullPath.pathList()) {
            temp = (LinkedHashMap<String, Object>) temp.get(j);
        }
        return (Double) temp.get(fullPath.lastPathElem());
    }

    String extractDateAndTime(String fullDate) {
        return fullDate.substring(0, 10) + " " + fullDate.substring(11, 19);
    }
}
