import "expect-more-jest";

import * as bookRepo from "../../src/data/bookRepository";

describe("example repository", () => {
  it("should have books by default", () => {
    expect(bookRepo.getAllBooks()).toBeNonEmptyArray();
    expect(bookRepo.getAllBooks()).toBeArrayOfObjects();
  });

  it("should get default book by id", () => {
    expect(bookRepo.getBook("42")).toBeNonEmptyObject();
  });
});
