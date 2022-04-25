package pl.edu.agh.io.backend.controllers;

import org.springframework.web.bind.annotation.*;
import pl.edu.agh.io.backend.entities.ChartData;
import pl.edu.agh.io.backend.services.ChartService;
import pl.edu.agh.io.backend.entities.JsonConfig;

import javax.validation.Valid;

@RestController
@CrossOrigin("http://localhost:4200")
public class ChartController {
    private final ChartService chartService;

    ChartController(ChartService chartService) {
        this.chartService = chartService;
    }

    @GetMapping("/chart")
    public ChartData chartData() {
        return chartService.getChartData();
    }

    @PostMapping(value = "/config")
    public JsonConfig loadConfig(@Valid @RequestBody JsonConfig jsonConfig) {
        chartService.loadData(jsonConfig);
        return jsonConfig;
    }
}
