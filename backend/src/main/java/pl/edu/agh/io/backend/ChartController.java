package pl.edu.agh.io.backend;

import org.springframework.web.bind.annotation.*;

@RestController
public class ChartController {
    private final ChartService chartService;

    public ChartController(ChartService chartService) {
        this.chartService = chartService;
    }

    @GetMapping("/chart")
    public ChartData chartData() {
        return chartService.getChartData();
    }

    @PostMapping(value = "/config")
    public JsonConfig loadConfig(@RequestBody JsonConfig jsonConfig) {
        chartService.loadData(jsonConfig);
        return jsonConfig;
    }
}