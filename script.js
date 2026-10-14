function Book(title, author, pages) {
	if (!new.target) {
			throw Error("You must use the 'new' operator to call the constructor")
	}
	this.id = crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.pages = pages;
}
		
Book.prototype.info = function () {
	return `${this.title} is authored by ${this.author} and has ${this.pages} pages.`
} 

const books = []
const bookList = document.querySelector("#book-list")
const newBookForm = document.querySelector("#new-book-form")
const titleInput = document.querySelector("#title")
const authorInput = document.querySelector("#author")
const pagesInput = document.querySelector("#pages")


function addBookToLibrary(title, author, pages) {
	const book = new Book(title, author, pages);
	books.push(book);
	return book;
}

function displayBooks() {
	bookList.innerHTML = ""
	for (const book of books) {
		const card = document.createElement("div");
		card.classList.add("card");
		
		const title = document.createElement("h2");
		title.textContent = book.title;
		
		const author = document.createElement("p");
		author.textContent = `authored by ${book.author}`;

		const pages = document.createElement("p");
		pages.textContent = `${book.pages} pages`;
		
		card.append(title, author, pages);
		bookList.append(card);
	}
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310);
addBookToLibrary("Dune", "Frank Herbert", 412);
displayBooks();
newBookForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const title = titleInput.value;
	const author = authorInput.value;
	const pages = pagesInput.value;
	addBookToLibrary(title, author, pages);
	displayBooks()
});





