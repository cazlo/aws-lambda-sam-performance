package quarkus.data;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class BookSaved {

    private String name;

    private String isbn;

    public BookSaved() {

    }

    public BookSaved(String name, String isbn) {
        this.name = name;
        this.isbn = isbn;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
}
