package pl.edu.agh.io.backend.entities.data;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.List;

public record DataJson(String next, String previous, List<LinkedHashMap<String, Object>> results) implements Serializable {
}
