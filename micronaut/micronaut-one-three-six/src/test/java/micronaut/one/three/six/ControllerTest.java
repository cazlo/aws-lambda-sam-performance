package micronaut.one.three.six;

import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.client.RxHttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.test.annotation.MicronautTest;
import micronaut.one.three.six.controller.Book;
import micronaut.one.three.six.data.BookSaved;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;

import static micronaut.one.three.six.data.BookRepository.defaultBook;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@MicronautTest
public class ControllerTest {

    @Inject
    @Client("/")
    RxHttpClient client;

    @Test void itShouldPutBook() {
        Book inputBook = new Book();
        inputBook.setName("name");
        HttpRequest<Book> request = HttpRequest.PUT("/book", inputBook);

        HttpResponse<BookSaved> rsp = client.toBlocking().exchange(request, BookSaved.class);

        assertEquals(HttpStatus.OK, rsp.getStatus());
        assertNotNull(rsp.getBody());
        BookSaved actualBook = rsp.getBody().get();
        assertNotNull(actualBook.getIsbn());
        assertEquals(inputBook.getName(), actualBook.getName());
    }

    @Test void itShouldGetBook() {
        HttpRequest<Book> request = HttpRequest.GET("/book/" + defaultBook.getIsbn());

        HttpResponse<BookSaved> rsp = client.toBlocking().exchange(request, BookSaved.class);

        assertEquals(HttpStatus.OK, rsp.getStatus());
        assertNotNull(rsp.getBody());
        BookSaved actualBook = rsp.getBody().get();
        assertEquals(defaultBook.getIsbn(), actualBook.getIsbn());
        assertEquals(defaultBook.getName(), actualBook.getName());
    }
}
