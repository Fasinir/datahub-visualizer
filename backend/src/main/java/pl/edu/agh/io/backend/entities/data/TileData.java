package pl.edu.agh.io.backend.entities.data;

import java.util.List;

public record TileData(List<DataJson> tileData) {

    public void addDataJson(DataJson dataJson) {
        tileData.add(dataJson);
    }
}
