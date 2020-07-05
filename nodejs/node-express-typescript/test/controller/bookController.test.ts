import request from "supertest";
import app from "../../src/app";
import { Book } from "../../src/data/bookRepository";

describe("GET /book", () => {
    it("should return 200 OK", (done) => {
        request(app).get("/book")
            .expect(200, done);
    });
});

describe("GET /book/{id}", () => {
    it("should return 200 OK for default book", async () => {
        const response = await request(app).get("/book/42")
            .expect(200);
        console.log(response);
    });

    it("should return 404 for not found book", (done) => {
        request(app).get("/book/sidhsijbjfksfs")
            .expect(404, done);
    });
});

describe("POST /book", () => {
    it("should return 200 OK for default book", (done) => {
        request(app).post("/book")
            .send(new Book("id", "name"))
            .expect(201, done);
    });

});

describe("PUT /book/{id}", () => {
    it("should return 200 OK for default book", (done) => {
        request(app).put("/book/42")
            .send({name:"name"})
            .expect(200, done);
    });

    it("should 404 not found book", (done) => {
        request(app).put("/book/kfnldkjfd")
            .send({name:"name"})
            .expect(404, done);
    });
});