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