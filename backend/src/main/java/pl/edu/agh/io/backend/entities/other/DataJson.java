package pl.edu.agh.io.backend.entities.other;

import java.io.Serializable;
import java.util.List;

public record DataJson(String next, String previous, List results) implements Serializable {
    @Override
    public String toString() {
        return "DataJson{" +
                "next='" + next + "\n" +
                ", previous='" + previous + "\n" +
                ", results=" + results +
                '}';
    }
}
