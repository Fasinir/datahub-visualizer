package pl.edu.agh.io.backend.controllers;

import org.springframework.web.bind.annotation.*;
import pl.edu.agh.io.backend.entities.response.ResponseData;
import pl.edu.agh.io.backend.services.VisualizerService;
import pl.edu.agh.io.backend.entities.config.JsonConfig;

@RestController
public class VisualizerController {
    private final VisualizerService visualizerService;

    public VisualizerController(VisualizerService visualizerService) {
        this.visualizerService = visualizerService;
    }

    @GetMapping("/visualize")
    public ResponseData chartData() {
        return visualizerService.getResponseDataData();
    }

    @PostMapping(value = "/config")
    public JsonConfig loadConfig(@RequestBody JsonConfig jsonConfig) {
        visualizerService.loadData(jsonConfig);
        return jsonConfig;
    }
}
