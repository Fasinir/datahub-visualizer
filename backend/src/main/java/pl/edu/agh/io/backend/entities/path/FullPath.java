package pl.edu.agh.io.backend.entities.path;

import java.util.List;

public record FullPath(List<String> pathList, String lastPathElem) {

}
