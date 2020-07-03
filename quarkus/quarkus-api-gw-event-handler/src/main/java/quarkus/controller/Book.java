package quarkus.controller;
import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class Book {

    private String name;

    public Book() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
