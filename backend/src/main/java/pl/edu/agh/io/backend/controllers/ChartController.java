package pl.edu.agh.io.backend.controllers;

import org.springframework.web.bind.annotation.*;
import pl.edu.agh.io.backend.entities.ChartData;
import pl.edu.agh.io.backend.services.ChartService;
import pl.edu.agh.io.backend.entities.JsonConfig;

@RestController
public class ChartController {
    private final ChartService chartService;

    private ChartController(ChartService chartService) {
        this.chartService = chartService;
    }

    @GetMapping("/chart")
    private ChartData chartData() {
        return chartService.getChartData();
    }

    @PostMapping(value = "/config")
    private JsonConfig loadConfig(@RequestBody JsonConfig jsonConfig) {
        chartService.loadData(jsonConfig);
        return jsonConfig;
    }
}
