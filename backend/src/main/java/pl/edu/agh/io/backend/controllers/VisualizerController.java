package pl.edu.agh.io.backend.controllers;

import org.springframework.web.bind.annotation.*;
import pl.edu.agh.io.backend.entities.response.ResponseData;
import pl.edu.agh.io.backend.services.VisualizerService;
import pl.edu.agh.io.backend.entities.config.JsonConfig;

@RestController
//@CrossOrigin(origins = "http://localhost:4200")
public class VisualizerController {
    private final VisualizerService visualizerService;

    public VisualizerController(VisualizerService visualizerService) {
        this.visualizerService = visualizerService;
    }

    @PostMapping(value = "/visualize")
    public ResponseData loadConfig(@RequestBody JsonConfig jsonConfig) {
        visualizerService.loadData(jsonConfig);
        return visualizerService.getResponseDataData();
    }
}
