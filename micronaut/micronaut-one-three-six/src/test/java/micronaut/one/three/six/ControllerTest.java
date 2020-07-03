package micronaut.one.three.six;

import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.client.RxHttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.http.client.exceptions.HttpClientResponseException;
import io.micronaut.test.annotation.MicronautTest;
import micronaut.one.three.six.controller.Book;
import micronaut.one.three.six.data.BookSaved;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;

import static micronaut.one.three.six.data.BookRepository.defaultBook;
import static org.junit.jupiter.api.Assertions.*;

@MicronautTest
public class ControllerTest {

    @Inject
    @Client("/")
    RxHttpClient client;

    @Test void itShouldCreateBook() {
        Book inputBook = new Book();
        inputBook.setName("some new book name");
        HttpRequest<Book> request = HttpRequest.POST("/book/", inputBook);

        HttpResponse<BookSaved> rsp = client.toBlocking().exchange(request, BookSaved.class);

        assertEquals(HttpStatus.OK, rsp.getStatus());
        assertNotNull(rsp.getBody());
        BookSaved actualBook = rsp.getBody().get();
        assertNotNull(actualBook.getIsbn());
        assertEquals(inputBook.getName(), actualBook.getName());
    }

    @Test void itShouldNotCreateInvalidBook() {
        Book emptyBook = new Book();
        HttpRequest<Book> request = HttpRequest.POST("/book/", emptyBook);

        HttpClientResponseException error = assertThrows(
                HttpClientResponseException.class,
                () -> { HttpResponse<BookSaved> rsp = client.toBlocking().exchange(request, BookSaved.class); }
        );

        assertEquals(HttpStatus.BAD_REQUEST, error.getResponse().getStatus());
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

    @Test void notFoundGetUnkownBook() {
        HttpRequest<Book> request = HttpRequest.GET("/book/" + defaultBook.getIsbn() + "not-found-for-sure!");

        HttpClientResponseException error = assertThrows(
                HttpClientResponseException.class,
                () -> { HttpResponse<BookSaved> rsp = client.toBlocking().exchange(request, BookSaved.class); }
             );

        assertEquals(HttpStatus.NOT_FOUND, error.getResponse().getStatus());
    }

    @Test void itShouldUpdateBook() {
        Book inputBook = new Book();
        inputBook.setName("name");
        HttpRequest<Book> request = HttpRequest.PUT("/book/" + defaultBook.getIsbn(), inputBook);

        HttpResponse<BookSaved> rsp = client.toBlocking().exchange(request, BookSaved.class);

        assertEquals(HttpStatus.OK, rsp.getStatus());
        assertNotNull(rsp.getBody());
        BookSaved actualBook = rsp.getBody().get();
        assertNotNull(actualBook.getIsbn());
        assertEquals(inputBook.getName(), actualBook.getName());
    }

    @Test void notFoundForUpdateUnkownBook() {
        Book inputBook = new Book();
        inputBook.setName("name");
        HttpRequest<Book> request = HttpRequest.PUT("/book/123dfke9djkfd", inputBook);

        HttpClientResponseException error = assertThrows(
                HttpClientResponseException.class,
                () -> { HttpResponse<BookSaved> rsp = client.toBlocking().exchange(request, BookSaved.class); }
        );
        assertEquals(HttpStatus.NOT_FOUND, error.getResponse().getStatus());
    }
}
