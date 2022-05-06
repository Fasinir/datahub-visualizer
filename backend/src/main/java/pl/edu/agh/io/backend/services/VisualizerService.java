package pl.edu.agh.io.backend.services;

import org.springframework.stereotype.Service;
import pl.edu.agh.io.backend.entities.config.JsonConfig;
import pl.edu.agh.io.backend.entities.response.ResponseData;

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
