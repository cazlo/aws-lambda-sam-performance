require("expect-more-jest");

const bookRepo = require("../../src/data/bookRepository");

describe("example repository", () => {
  it("should have books by default", () => {
    expect(bookRepo.getAllBooks()).toBeNonEmptyArray();
  });

  it("should get default book by id", () => {
    expect(bookRepo.getBook("42")).toBeNonEmptyObject();
  });
});
