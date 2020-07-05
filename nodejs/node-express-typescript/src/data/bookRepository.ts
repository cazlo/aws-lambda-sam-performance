import { v4 } from "uuid";

export class Book {
  id: string;
  name: string;

  constructor(id:string, name:string){
    this.name = name;
    this.id = id;
  }
}

// Ephemeral in-memory data store
const books = [
  new Book("42", "The Answer To Everything")
];

export const createBook = (name: string): Book => {
  const book = new Book(v4(), name);
  // books.push(book);
  return book;
};
export const byId = (id: string) => (b: Book): boolean => b.id === id;
export const getBook = (id: string): Book => books.find(byId(id));
export const getAllBooks = (): Book[] => books;
export const updateBook = (book: Book, id: string): Book => {
  const foundIdx = books.findIndex(byId(id));
  books[foundIdx] = book;
  return book;
};
