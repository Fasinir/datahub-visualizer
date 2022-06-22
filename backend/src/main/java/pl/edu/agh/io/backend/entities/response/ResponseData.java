package pl.edu.agh.io.backend.entities.response;

import java.util.List;

public record ResponseData(List<Object> tiles) {
    public void addTile(Object tile) {
        tiles.add(tile);
    }
}
