import { useState } from "react";
import BookCard from "./components/BookCard";
import NewBookDialog from "./components/NewBookDialog";
import type { Book, NewBookData } from "./types";

function createBook(
	title: string,
	author: string,
	pages: number,
	read: boolean = false
): Book {
	return { id: crypto.randomUUID(), title, author, pages, read };
}

export default function App() {
	const [books, setBooks] = useState<Book[]>([
		createBook("The Hobbit", "J.R.R. Tolkien", 310, true),
		createBook("Dune", "Frank Herbert", 412, false),
	]);
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);

	function addBook({ title, author, pages, read }: NewBookData): void {
		setBooks((prev) => [...prev, createBook(title, author, pages, read)]);
		setDialogOpen(false);
	}

	function deleteBook(id: string): void {
		setBooks((prev) => prev.filter((book) => book.id !== id));
	}

	function toggleRead(id: string): void {
		setBooks((prev) =>
			prev.map((book) =>
				book.id === id ? { ...book, read: !book.read } : book
			)
		);
	}

	return (
		<>
			<h1>My Library</h1>
			<div id="book-list">
				{books.map((book) => (
					<BookCard
						key={book.id}
						book={book}
						onToggleRead={() => toggleRead(book.id)}
						onDelete={() => deleteBook(book.id)}
					/>
				))}
			</div>
			<button id="add-book-btn" onClick={() => setDialogOpen(true)}>
				Add Book
			</button>
			<NewBookDialog
				open={dialogOpen}
				onAdd={addBook}
				onClose={() => setDialogOpen(false)}
			/>
		</>
	);
}
