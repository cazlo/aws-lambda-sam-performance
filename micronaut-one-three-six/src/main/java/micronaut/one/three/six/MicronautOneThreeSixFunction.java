package micronaut.one.three.six;

import io.micronaut.function.executor.FunctionInitializer;
import io.micronaut.function.FunctionBean;
import javax.inject.*;
import java.io.IOException;
import java.util.function.Function;

@FunctionBean("micronaut-one-three-six")
public class MicronautOneThreeSixFunction extends FunctionInitializer implements Function<MicronautOneThreeSix, MicronautOneThreeSix> {

    @Override
    public MicronautOneThreeSix apply(MicronautOneThreeSix msg) {
         return msg;
    }

    /**
     * This main method allows running the function as a CLI application using: echo '{}' | java -jar function.jar 
     * where the argument to echo is the JSON to be parsed.
     */
    public static void main(String...args) throws IOException {
        MicronautOneThreeSixFunction function = new MicronautOneThreeSixFunction();
        function.run(args, (context)-> function.apply(context.get(MicronautOneThreeSix.class)));
    }    
}

