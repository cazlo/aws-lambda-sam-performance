package micronaut.two;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.client.RxHttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.test.annotation.MicronautTest;
import micronaut.two.controller.Book;
import micronaut.two.data.BookSaved;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;

@MicronautTest
public class ControllerTest {

    @Inject
    @Client("/")
    RxHttpClient client;

    @Test void itShouldPutBook() {
        //when:
        Book b = new Book();
        b.setName("name");
        HttpRequest<Book> request = HttpRequest.PUT("/book", b);

        HttpResponse<BookSaved> rsp = client.toBlocking().exchange(request, BookSaved.class);

        //then: 'the endpoint can be accessed'
        assertEquals(HttpStatus.OK, rsp.getStatus());
        assertNotNull(rsp.body());
        assertNotNull(rsp.body().getIsbn());
        assertNotNull(rsp.body().getName());
    }
}
