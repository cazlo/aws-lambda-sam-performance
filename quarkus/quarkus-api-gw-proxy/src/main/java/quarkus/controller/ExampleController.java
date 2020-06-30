package quarkus.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import quarkus.data.BookRepository;
import quarkus.data.BookSaved;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/book")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ExampleController {
    private static final Logger LOG = LoggerFactory.getLogger(ExampleController.class);

    private final BookRepository bookRepository;

    @Inject
    public ExampleController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @PUT @Path("/")
    public BookSaved putBook(@Valid Book book) {
        return bookRepository.saveBook(book);
    }

    @GET @Path("/{id}")
    public Response getBookById(@PathParam("id") String id) {
        return bookRepository.findById(id)
                .map(b -> Response.ok(b).build())
                .orElse(Response.status(404).build());
    }
}
