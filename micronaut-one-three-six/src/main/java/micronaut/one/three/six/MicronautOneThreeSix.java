package micronaut.one.three.six;

import io.micronaut.core.annotation.*;

@Introspected
public class MicronautOneThreeSix {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

