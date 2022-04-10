package pl.edu.agh.io.backend.entities;

import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
public class JsonConfig {
    private String endpointURL;
    private List<Object> dataCategory;

    public List<Object> getDataCategory() {
        return dataCategory;
    }

    public String getEndpointURL() {
        return endpointURL;
    }


}
