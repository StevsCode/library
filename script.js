const myLibrary = [];

function Book(title, author, genre, year, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.year = year;
  this.read = read;
}

function addBookToLibrary(title, author, genre, year, read) {
  const newBook = new Book(title, author, genre, year, read);
  myLibrary.push(newBook);
}

function displayBooks() {
  const libraryDisplay = document.getElementById("library-display");
  libraryDisplay.innerHTML = "";

  myLibrary.forEach(book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
      <p><strong>Year:</strong> ${book.year}</p>
      <p><strong>Read:</strong> ${book.read}</p>
      <button class="toggle-read-btn" data-id="${book.id}">Toggle Read</button>
      <button class="remove-btn" data-id="${book.id}">Remove</button>
    `;

    libraryDisplay.appendChild(bookCard);
  });

  document.querySelectorAll(".toggle-read-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
        toggleRead(event.target.dataset.id);
    });
  });


  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
        removeBook(event.target.dataset.id);
    });
  });
}

document.getElementById("new-book-btn").addEventListener("click", () => {
  document.getElementById("book-form-modal").showModal();
});

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("book-form-modal").closest();
});
document.getElementById("book-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const genre = document.getElementById("genre").value;
  const year = document.getElementById("year").value;
  const read = document.getElementById("read").checked ? "Yes" : "No";

  addBookToLibrary(title, author, genre, year);

  displayBooks();

  document.getElementById("book-form").reset();

  document.getElementById("book-form-modal").close();
});

function removeBook(bookId) {
  myLibrary = myLibrary.filter(book => book.id !== bookId);
  displayBooks(); // Refresh the display after removal
}

Book.prototype.toggleReadStatus = function () {
  this.read = this.read === "Yes" ? "No" : "Yes";
};

function toggleRead(bookId) {
  const book = myLibrary.find(book => book.id === bookId);
  if (book) {
      book.toggleReadStatus();
      displayBooks(); // Refresh the display after toggling
  }
}
