package micronaut.one.three.six;

import io.micronaut.function.client.FunctionClient;
import io.micronaut.http.annotation.Body;
import io.reactivex.Single;
import javax.inject.Named;

@FunctionClient
public interface MicronautOneThreeSixClient {

    @Named("micronaut-one-three-six")
    Single<MicronautOneThreeSix> apply(@Body MicronautOneThreeSix body);

}
