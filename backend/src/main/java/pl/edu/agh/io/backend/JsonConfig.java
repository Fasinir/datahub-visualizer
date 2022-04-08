package pl.edu.agh.io.backend;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.NoArgsConstructor;
import lombok.extern.jackson.Jacksonized;

@NoArgsConstructor
@Jacksonized
public class JsonConfig {
    private String endpointURL;

    public JsonConfig(String endpointURL) {
        this.endpointURL = endpointURL;
    }

    public String getEndpointURL() {
        return endpointURL;
    }

    public void setEndpointURL(String endpointURL) {
        this.endpointURL = endpointURL;
    }
}
