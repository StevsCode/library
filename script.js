const myLibrary = [];

function Book(title, author, genre, year) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.year = year;
}

function addBookToLibrary(title, author, genre, year) {
  const newBook = new Book(title, author, genre, year);
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
      <p><strong>ID:</strong> ${book.id}</p>
    `;

    libraryDisplay.appendChild(bookCard);
  });
}