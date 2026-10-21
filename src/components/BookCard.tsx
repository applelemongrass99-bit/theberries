import type { Book } from "../types";

interface BookCardProps {
	book: Book;
	onToggleRead: () => void;
	onDelete: () => void;
}

export default function BookCard({ book, onToggleRead, onDelete }: BookCardProps) {
	return (
		<div className="card">
			<h2>{book.title}</h2>
			<p>authored by {book.author}</p>
			<p>{book.pages} pages</p>
			<button
				className={book.read ? "toggle-read is-read" : "toggle-read"}
				onClick={onToggleRead}
			>
				{book.read ? "have read" : "have not read"}
			</button>
			<button className="delete-btn" onClick={onDelete}>
				Delete Book
			</button>
		</div>
	);
}
