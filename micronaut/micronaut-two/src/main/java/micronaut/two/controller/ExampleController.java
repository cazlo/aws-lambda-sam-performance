package micronaut.two.controller;

import io.micronaut.http.annotation.*;
import io.micronaut.validation.Validated;
import micronaut.two.data.BookRepository;
import micronaut.two.data.BookSaved;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.validation.Valid;

@Controller("/book")
@Validated
public class ExampleController {
    private static final Logger LOG = LoggerFactory.getLogger(ExampleController.class);

    private final BookRepository bookRepository;

    @Inject
    public ExampleController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Put("/")
    public BookSaved putBook(@Valid @Body Book book) {
        return bookRepository.saveBook(book);
    }

    @Get("/{id}")
    public BookSaved getBookById(@PathVariable(name = "id") String id) {
        return bookRepository.findById(id)
                .orElseGet(() -> {
                    BookSaved book = new BookSaved();
                    book.setName("test");
                    return book;
                });
    }
}
