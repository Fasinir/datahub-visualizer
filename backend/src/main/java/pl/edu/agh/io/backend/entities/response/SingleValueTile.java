package pl.edu.agh.io.backend.entities.response;

import pl.edu.agh.io.backend.entities.common.TileType;

public record SingleValueTile(TileType type, String label, Double value) {
}
