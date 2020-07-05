package quarkus.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import quarkus.data.BookRepository;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;

@Path("/book")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BookController {
    private static final Logger LOG = LoggerFactory.getLogger(BookController.class);

    private final BookRepository bookRepository;

    @Inject
    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @POST @Path("/")
    public Response postBook(@Valid Book book) {
        return bookRepository.createBook(book)
            .map(b -> Response.created(URI.create("/book/"+b.getIsbn())).entity(b).build())
            .orElseGet(() -> Response.serverError().entity("oops!").build());
    }

    @PUT @Path("/{id}")
    public Response putBook(@Valid Book book, @PathParam("id") String id) {
        return bookRepository.updateBook(book, id)
                .map(b -> Response.ok(b).build())
                .orElseGet(() -> Response.status(404).build());
    }

    @GET @Path("/{id}")
    public Response getBookById(@PathParam("id") String id) {
        return bookRepository.findById(id)
                .map(b -> Response.ok(b).build())
                .orElseGet(() -> Response.status(404).build());
    }
}
