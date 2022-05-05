package pl.edu.agh.io.backend.entities.data;

import java.io.Serializable;
import java.util.List;

public record DataJson(String next, String previous, List results) implements Serializable {
}
