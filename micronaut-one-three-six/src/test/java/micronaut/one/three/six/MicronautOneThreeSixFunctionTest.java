package micronaut.one.three.six;

import io.micronaut.test.annotation.MicronautTest;
import org.junit.jupiter.api.Test;
import javax.inject.Inject;

import static org.junit.jupiter.api.Assertions.assertEquals;

@MicronautTest
public class MicronautOneThreeSixFunctionTest {

    @Inject
    MicronautOneThreeSixClient client;

    @Test
    public void testFunction() throws Exception {
    	MicronautOneThreeSix body = new MicronautOneThreeSix();
    	body.setName("micronaut-one-three-six");
        assertEquals("micronaut-one-three-six", client.apply(body).blockingGet().getName());
    }
}
