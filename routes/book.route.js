import books from "../books.js"; 
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json(books);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const book = books.find((book) => book.id == id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

router.post("/", (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const index = books.findIndex((book) => book.id == id);
    if (index !== -1) {
        books[index] = { ...books[index], ...req.body };
        res.json(books[index]);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const index = books.findIndex((book) => book.id == id);
    if (index !== -1) {
        books.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

export default router;
