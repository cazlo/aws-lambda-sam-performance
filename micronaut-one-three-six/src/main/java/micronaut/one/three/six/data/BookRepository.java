package micronaut.one.three.six.data;

import micronaut.one.three.six.controller.Book;

import javax.inject.Singleton;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Singleton
public class BookRepository {
    public static final BookSaved defaultBook = new BookSaved("Hitchhiker's Guide", "42");
    private static final List<BookSaved> books = new ArrayList<>(){{
        add(defaultBook);
    }};

    public BookSaved saveBook(Book toSave){
        BookSaved saved = new BookSaved();
        saved.setIsbn(UUID.randomUUID().toString());
        saved.setName(toSave.getName());
        books.add(saved);
        return saved;
    }

    public Optional<BookSaved> findById(String id){
        return books.stream()
                .filter(b -> b.getIsbn().equals(id))
                .findFirst();
    }
}
