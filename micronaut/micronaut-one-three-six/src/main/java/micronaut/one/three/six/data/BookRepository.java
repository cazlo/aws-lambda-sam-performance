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
    private static final List<BookSaved> books = new ArrayList<BookSaved>(){{
        add(defaultBook);
    }};

    public BookSaved createBook(Book toSave){
        BookSaved saved = new BookSaved();
        saved.setIsbn(UUID.randomUUID().toString());
        saved.setName(toSave.getName());
        return saved;
    }

    public Optional<BookSaved> findById(String id){
        return books.stream()
                .filter(b -> b.getIsbn().equals(id))
                .findFirst();
    }

    public Optional<BookSaved> update(String id, Book toUpdate){
        return findById(id)
                .map(b -> {
                    b.setName(toUpdate.getName());
                    return b;
                });
    }
}
