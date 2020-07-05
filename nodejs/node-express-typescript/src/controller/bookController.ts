import { Response, Request } from "express";
import { createBook, getAllBooks, getBook, updateBook } from "../data/bookRepository";

// get /book/{id}
export const get = (req: Request, res: Response): void => {
  const book = getBook(req.params.id);

  if (!book) res.status(404).json({});

  res.json(book);
};
// get /book
export const getAll = (req: Request, res: Response): void => {
  res.json(getAllBooks());
};
// post /book
export const post = (req: Request, res: Response): void => {
  const book = createBook(req.body.name);
  res.status(201).json(book);
};
// put /book/{id}
export const put = (req: Request, res: Response): void => {
  const { id } = req.params;
  const book = getBook(id);

  if (!book) res.status(404).json({});

  updateBook({ ...book, ...req.body }, id);
  res.json(book);
};
