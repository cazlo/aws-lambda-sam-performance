package micronaut.one.three.six;

import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.client.RxHttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.test.annotation.MicronautTest;
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
        //when:
        HttpRequest request = HttpRequest.GET("/ping");

        HttpResponse<String> rsp = client.toBlocking().exchange(request, String.class);

        //then: 'the endpoint can be accessed'
        assertEquals(HttpStatus.OK, rsp.getStatus());
        assertNotNull(rsp.body());
    }
}
