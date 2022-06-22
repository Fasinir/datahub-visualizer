package pl.edu.agh.io.backend.services;

import org.springframework.stereotype.Service;
import pl.edu.agh.io.backend.entities.config.JsonConfig;
import pl.edu.agh.io.backend.entities.data.DataJson;
import pl.edu.agh.io.backend.entities.path.FullPath;
import pl.edu.agh.io.backend.entities.response.ResponseData;
import pl.edu.agh.io.backend.entities.tile.LineBarTile;
import pl.edu.agh.io.backend.entities.tile.SingleValueTile;
import pl.edu.agh.io.backend.entities.tile.TileData;
import pl.edu.agh.io.backend.entities.tile.TileType;

import java.util.*;

@Service
public class TilesService {
    private final ChartService chartService;

    public TilesService(ChartService chartService) {
        this.chartService = chartService;
    }

    ResponseData createTiles(JsonConfig jsonConfig) {
        ResponseData responseData = new ResponseData(new LinkedList<>());

        List<LinkedHashMap<String, Object>> tiles = jsonConfig.getTiles();
        for (LinkedHashMap<String, Object> tileConfig : tiles) {
            TileType type = TileType.valueOf((String) tileConfig.get("tileType"));

            if (type == TileType.LINE_BAR_CHART) {
                LineBarTile newTile = createLineBarTile(tileConfig);
                responseData.addTile(newTile);
            } else if (type == TileType.SINGLE_VALUE_CHART) {
                SingleValueTile newTile = createSingleValueTile(tileConfig);
                responseData.addTile(newTile);
            }
        }

        return responseData;
    }

    private SingleValueTile createSingleValueTile(LinkedHashMap<String, Object> tileConfig) {
        DataJson dataJson = chartService.getDataAPI((String) tileConfig.get("url"));
        FullPath fullPath = chartService.getFullPath(tileConfig);

        Double foundValue = null;
        if (dataJson != null && !dataJson.results().isEmpty()) {
            LinkedHashMap<String, Object> lastMeasure = dataJson.results().get(0);
            foundValue = chartService.getValueFromData(lastMeasure, fullPath);
        }

        return new SingleValueTile(TileType.SINGLE_VALUE_CHART, (String) tileConfig.get("tileLabel"), (Integer) tileConfig.get("refreshingRate"), foundValue);
    }

    private LineBarTile createLineBarTile(LinkedHashMap<String, Object> tileConfig) {
        List<LinkedHashMap<String, Object>> endpointsList = (List<LinkedHashMap<String, Object>>) tileConfig.get("endpoints");
        TileData tileData = chartService.getTileData(tileConfig);    //getting data from datahub for the entire tile
        List<String> xVals = chartService.getTimestamps(tileData);   //getting sorted unique timestamps for the entire tile and sorting them.

        LineBarTile newTile = new LineBarTile(TileType.LINE_BAR_CHART, (String) tileConfig.get("tileLabel"), (Integer) tileConfig.get("refreshingRate"), xVals, new ArrayList<>());

        int dataIndex = 0;
        for (LinkedHashMap<String, Object> endpoint : endpointsList) {
            DataJson dataJson = tileData.tileData().get(dataIndex);
            List<LinkedHashMap<String, Object>> dataConfigList = (List<LinkedHashMap<String, Object>>) endpoint.get("chartData");

            for (LinkedHashMap<String, Object> dataConfig : dataConfigList) {
                chartService.addLineBarChartData(newTile, dataJson, xVals, dataConfig);  //extracting data for each chart
            }
            dataIndex++;
        }

        return newTile;
    }
}
