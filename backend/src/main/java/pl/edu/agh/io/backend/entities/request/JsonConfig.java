package pl.edu.agh.io.backend.entities.request;

import lombok.NoArgsConstructor;

import java.util.LinkedHashMap;
import java.util.List;

@NoArgsConstructor
public class JsonConfig {
    private List<LinkedHashMap<String, Object>> tiles;

    public List<LinkedHashMap<String, Object>> getTiles() {
        return tiles;
    }
}
