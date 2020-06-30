package quarkus.controller;
import io.quarkus.runtime.annotations.RegisterForReflection;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@RegisterForReflection
public class Book {

    @NotNull
    @NotBlank
    private String name;

    public Book() {
    }

    @NotNull
    public String getName() {
        return name;
    }

    public void setName(@NotNull String name) {
        this.name = name;
    }
}
