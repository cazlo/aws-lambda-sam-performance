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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@MicronautTest
public class ControllerTest {

    @Inject
    @Client("/")
    RxHttpClient client;

    @Test void itShouldPutBook() {
        Book b = new Book();
        b.setName("name");
        HttpRequest<Book> request = HttpRequest.PUT("/book", b);

        HttpResponse<BookSaved> rsp = client.toBlocking().exchange(request, BookSaved.class);

        assertEquals(HttpStatus.OK, rsp.getStatus());
        assertNotNull(rsp.body());
        assertNotNull(rsp.body().getIsbn());
        assertNotNull(rsp.body().getName());
    }
}
