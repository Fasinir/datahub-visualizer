package pl.edu.agh.io.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pl.edu.agh.io.backend.entities.chart.ChartType;
import pl.edu.agh.io.backend.entities.tile.TileType;
import pl.edu.agh.io.backend.entities.config.JsonConfig;
import pl.edu.agh.io.backend.entities.tile.LineBarTile;
import pl.edu.agh.io.backend.entities.chart.ChartData;
import pl.edu.agh.io.backend.entities.response.ResponseData;
import pl.edu.agh.io.backend.entities.data.DataJson;
import pl.edu.agh.io.backend.entities.tile.SingleValueTile;

import java.util.*;


@Service
public class VisualizerService {
    private final TilesService tilesService;
    private ResponseData responseData;

    public VisualizerService(TilesService tilesService) {
        this.tilesService = tilesService;
    }

    public void loadData(JsonConfig jsonConfig) {
        this.responseData = tilesService.createTiles(jsonConfig);
    }

    public ResponseData getResponseDataData() {
        return responseData;
    }
}
