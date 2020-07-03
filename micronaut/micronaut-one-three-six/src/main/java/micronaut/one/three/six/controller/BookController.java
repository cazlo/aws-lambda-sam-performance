package micronaut.one.three.six.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import io.micronaut.validation.Validated;
import micronaut.one.three.six.data.BookRepository;
import micronaut.one.three.six.data.BookSaved;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.validation.Valid;

@Controller("/book")
@Validated
public class BookController {
    private static final Logger LOG = LoggerFactory.getLogger(BookController.class);

    private final BookRepository bookRepository;

    @Inject
    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Post("/")
    public BookSaved putBook(@Valid @Body Book book) {
        return bookRepository.createBook(book);
    }

    @Put("/{id}")
    public HttpResponse<BookSaved> updateBookById(@PathVariable(name = "id") String id, @Valid @Body Book book) {
        return bookRepository.update(id, book)
                .map(HttpResponse::ok)
                .orElse(HttpResponse.notFound());
    }

    @Get("/{id}")
    public HttpResponse<BookSaved> getBookById(@PathVariable(name = "id") String id) {
        return bookRepository.findById(id)
                .map(HttpResponse::ok)
                .orElse(HttpResponse.notFound());
    }
}
