package micronaut.two.data;
import edu.umd.cs.findbugs.annotations.NonNull;
import io.micronaut.core.annotation.Introspected;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Introspected
public class BookSaved {

    @NonNull
    @NotBlank
    private String name;

    @NonNull
    @NotBlank
    private String isbn;

    public BookSaved() {

    }

    public BookSaved(@NotNull @NotBlank String name, @NotNull @NotBlank String isbn) {
        this.name = name;
        this.isbn = isbn;
    }

    @NonNull
    public String getName() {
        return name;
    }

    public void setName(@NonNull String name) {
        this.name = name;
    }

    @NonNull
    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(@NonNull String isbn) {
        this.isbn = isbn;
    }
}
