function Book(title, author, pages, read = false) {
	if (!new.target) {
			throw Error("You must use the 'new' operator to call the constructor")
	}
	this.id = crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.toggleReadStatus = function () {
	this.read = !this.read;
} 

let books = []
const bookList = document.querySelector("#book-list")
const addBookBtn = document.querySelector("#add-book-btn")
const newBookDialog = document.querySelector("#new-book-dialog")
const cancelBookDialogBtn = document.querySelector("#cancel-book-dialog-btn")
const newBookForm = document.querySelector("#new-book-form")
const titleInput = document.querySelector("#title")
const authorInput = document.querySelector("#author")
const pagesInput = document.querySelector("#pages")
const readInput = document.querySelector("#read")

function addBookToLibrary(title, author, pages, read) {
	const book = new Book(title, author, pages, read);
	books.push(book);
	return book;
}

function deleteBookFromLibrary(id) {
	books = books.filter(book => book.id !== id);
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

		const readBookBtn = document.createElement("button");
		readBookBtn.textContent = book.read? "have read":"have not read"
		readBookBtn.addEventListener("click", () => {
			book.toggleReadStatus();
			displayBooks();
		});

		const removeCardBtn = document.createElement("button");
		removeCardBtn.textContent = "Delete Book";
		removeCardBtn.dataset.id = book.id;
		removeCardBtn.addEventListener("click", () => {
			deleteBookFromLibrary(book.id);
			displayBooks();
		});

		card.append(title, author, pages, readBookBtn, removeCardBtn);
		bookList.append(card);
	}
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("Dune", "Frank Herbert", 412, false);
displayBooks();
addBookBtn.addEventListener("click", () => newBookDialog.showModal());
newBookForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const title = titleInput.value;
	const author = authorInput.value;
	const pages = Number(pagesInput.value);
	const read = readInput.checked;
	addBookToLibrary(title, author, pages, read);
	displayBooks();
	newBookForm.reset();
	newBookDialog.close();
});
cancelBookDialogBtn.addEventListener("click", () => {
	newBookForm.reset();
	newBookDialog.close();
});
