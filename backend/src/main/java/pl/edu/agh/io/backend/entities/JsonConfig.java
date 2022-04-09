package pl.edu.agh.io.backend.entities;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class JsonConfig {
    private String endpointURL;

    public String getEndpointURL() {
        return endpointURL;
    }
}
