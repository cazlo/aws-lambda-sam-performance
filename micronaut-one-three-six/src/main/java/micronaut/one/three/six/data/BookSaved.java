package micronaut.one.three.six.data;
import io.micronaut.core.annotation.Introspected;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Introspected
public class BookSaved {

    @NotNull
    @NotBlank
    private String name;

    @NotNull
    @NotBlank
    private String isbn;

    public BookSaved() {

    }

    public BookSaved(@NotNull @NotBlank String name, @NotNull @NotBlank String isbn) {
        this.name = name;
        this.isbn = isbn;
    }

    @NotNull
    public String getName() {
        return name;
    }

    public void setName(@NotNull String name) {
        this.name = name;
    }

    @NotNull
    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(@NotNull String isbn) {
        this.isbn = isbn;
    }
}
