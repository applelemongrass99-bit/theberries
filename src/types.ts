export interface Book {
	id: string;
	title: string;
	author: string;
	pages: number;
	read: boolean;
}

// What the form hands back: a book without an id yet
export type NewBookData = Omit<Book, "id">;
