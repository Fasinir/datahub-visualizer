package pl.edu.agh.io.backend.entities.tile;

public record SingleValueTile(TileType type, String label, Integer refreshingRate, Double value) {
}
