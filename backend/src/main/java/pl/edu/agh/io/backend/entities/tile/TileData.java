package pl.edu.agh.io.backend.entities.tile;

import pl.edu.agh.io.backend.entities.data.DataJson;

import java.util.List;

public record TileData(List<DataJson> tileData) {
    public void addDataJson(DataJson dataJson) {
        tileData.add(dataJson);
    }
}
