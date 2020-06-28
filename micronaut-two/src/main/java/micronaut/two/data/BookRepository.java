package micronaut.two.data;

import micronaut.two.controller.Book;

import javax.inject.Singleton;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Singleton
public class BookRepository {

    private static final List<BookSaved> books = new ArrayList<>();

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
