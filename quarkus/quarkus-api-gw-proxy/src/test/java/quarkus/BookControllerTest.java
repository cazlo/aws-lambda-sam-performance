package quarkus;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;
import quarkus.controller.Book;
import quarkus.data.BookSaved;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static io.restassured.http.ContentType.JSON;
import static org.junit.jupiter.api.Assertions.*;
import static quarkus.data.BookRepository.defaultBook;

@QuarkusTest
public class BookControllerTest {
    @Test
    public void itShouldGetDefaultBook() {
        BookSaved book = when().get("/book/" + defaultBook.getIsbn())
                .then()
                .contentType("application/json")
                .extract().body().as(BookSaved.class);
        assertEquals(defaultBook.getName(), book.getName());
        assertEquals(defaultBook.getIsbn(), book.getIsbn());
    }

    @Test
    public void itShouldCreateABook() {
        Book bookIn = new Book("some new book");
        BookSaved saved = given().contentType(JSON).body(bookIn).post("/book")
                .then()
                .contentType("application/json")
                .extract().body().as(BookSaved.class);
        assertEquals(bookIn.getName(), saved.getName());
        assertNotNull(saved.getIsbn());
    }

    @Test
    public void itShouldUpdateDefaultBook() {
        Book bookIn = new Book("some new name");
        BookSaved saved = given().contentType(JSON).body(bookIn).put("/book/" + defaultBook.getIsbn())
                .then()
                .contentType("application/json")
                .extract().body().as(BookSaved.class);
        assertEquals(bookIn.getName(), saved.getName());
        assertNotNull(saved.getIsbn());
    }

    @Test
    public void itShould404ForGet() {
        when().get("/book/some-otter").then()
                .statusCode(404);
    }

    @Test
    public void itShould404ForPut() {
        Book bookIn = new Book("some new name");
        given().contentType(JSON).body(bookIn).put("/book/definitely-not-a-book").then()
                .statusCode(404);
    }
}
