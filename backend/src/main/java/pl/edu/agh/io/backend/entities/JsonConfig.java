package pl.edu.agh.io.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@AllArgsConstructor
@Getter
public class JsonConfig {

    @NotBlank
    private String endpointURL;

    @NotEmpty
    private List<Object> dataCategory;

}
