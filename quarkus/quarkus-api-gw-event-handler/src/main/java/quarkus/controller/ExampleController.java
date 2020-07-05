package quarkus.controller;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.jboss.logging.Logger;
import quarkus.data.BookRepository;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.Collections;
import java.util.Map;

@Named("processing")
public class ExampleController implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    private static final Logger log = Logger.getLogger(ExampleController.class);

    @Inject
    ObjectMapper objectMapper;

    @Inject
    BookRepository bookRepository;

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent request, Context context) {

        switch (request.getHttpMethod()) {
            case "GET":
                return bookRepository.findById(request.getPathParameters().get("id"))
                        .map(b -> response(200, b))
                        .orElseGet(() -> response(404, "nope not found"));
            case "PUT":
                try {
                    var book = objectMapper.readValue(request.getBody(), Book.class);
                    var id = request.getPathParameters().get("id");
                    return bookRepository.findById(id)
                            .map(b -> bookRepository.updateBook(book, id))
                            .map(b -> response(200, b))
                            .orElseGet(() -> response(404, "nope not found"));
                } catch (JsonProcessingException e) {
                    return response(400, "you dun goofed up and sent a bad message");
                }
            case "POST":
                try {
                    var book = objectMapper.readValue(request.getBody(), Book.class);
                    var savedBook = bookRepository.createBook(book);
                    return response(201, savedBook);
                } catch (JsonProcessingException e) {
                    return response(400, "you dun goofed up and sent a bad message");
                }
            default:
                return response(405, "not allowed");
        }

    }

    private APIGatewayProxyResponseEvent response(Integer statusCode, Object body) {
        if (body instanceof String) {
            return new APIGatewayProxyResponseEvent()
                    .withBody((String)body)
                    .withHeaders(Collections.singletonMap("Content-Type", "text/html"))
                    .withStatusCode(statusCode);
        }
        try {
            return new APIGatewayProxyResponseEvent()
                    .withBody(objectMapper.writeValueAsString(body))
                    .withHeaders(Collections.singletonMap("Content-Type", "application/json"))
                    .withStatusCode(statusCode);
        } catch (JsonProcessingException e) {
            return new APIGatewayProxyResponseEvent()
                    .withBody("something terrible has happened")
                    .withHeaders(Collections.singletonMap("Content-Type", "text/html"))
                    .withStatusCode(500);
        }

    }

}
