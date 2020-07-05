package quarkus.data;

import quarkus.controller.Book;

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

    public Optional<BookSaved> createBook(Book toSave){
        BookSaved saved = new BookSaved();
        saved.setIsbn(UUID.randomUUID().toString());
        saved.setName(toSave.getName());
        return Optional.of(saved);
    }

    public Optional<BookSaved> findById(String id){
        return books.stream()
                .filter(b -> b.getIsbn().equals(id))
                .findFirst();
    }

    public Optional<BookSaved> updateBook(Book book, String id){
        return books.stream()
                .filter(b -> b.getIsbn().equals(id))
                .peek(b -> b.setName(book.getName()))
                .findFirst();

    }
}
