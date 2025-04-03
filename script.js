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
  const book = new Book(title, author, genre, year, read);
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  const libraryContainer = document.getElementById("library-display");
  const dialogElement = document.getElementById("book-form-modal");
  
  if (dialogElement && dialogElement.parentNode === libraryContainer) {
    dialogElement.remove();
  }
  
  libraryContainer.innerHTML = "";

  if (myLibrary.length === 0) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className = "central";
    emptyDiv.style.padding = "50px";
    emptyDiv.innerHTML = `Your library is empty!<br>Click the + button to add a new book.`;
    libraryContainer.appendChild(emptyDiv);
  } else {
    myLibrary.forEach(book => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
      bookCard.setAttribute("data-id", book.id);

      const bookDetails = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Genre: ${book.genre}</p>
        <p>Year: ${book.year}</p>
        <p>Read: ${book.read ? 'Yes' : 'No'}</p>
        <button class="toggle-read-btn" onclick="toggleReadStatus('${book.id}')">Change Read Status</button>
        <button class="remove-btn" onclick="removeBook('${book.id}')">Remove Book</button>
      `;
      bookCard.innerHTML = bookDetails;

      libraryContainer.appendChild(bookCard);
    });
  }

  if (dialogElement) {
    libraryContainer.appendChild(dialogElement);
  }
}

function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
  displayBooks();
}

function toggleReadStatus(id) {
  const book = myLibrary.find(book => book.id === id);
  if (book) {
    book.read = !book.read;
  }
  displayBooks();
}

function openModalWithAnimation(modal) {
  modal.style.opacity = "0";
  modal.style.transform = "translateY(-20px)";
  modal.showModal();
  void modal.offsetWidth;
  modal.style.opacity = "1";
  modal.style.transform = "translateY(0)";
}

function closeModalWithAnimation(modal) {
  modal.style.opacity = "0";
  modal.style.transform = "translateY(-20px)";
  setTimeout(() => {
    modal.close();
    modal.style.opacity = "";
    modal.style.transform = "";
  }, 300);
}

document.addEventListener("DOMContentLoaded", function () {
  displayBooks();
  
  const modalElement = document.getElementById("book-form-modal");
  const newBookBtn = document.getElementById("new-book-btn");
  const closeModalBtn = document.getElementById("close-modal");
  const bookForm = document.getElementById("book-form");
  
  if (modalElement) {
    modalElement.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  }
  
  if (newBookBtn) {
    newBookBtn.addEventListener("click", () => {
      openModalWithAnimation(modalElement);
    });
  }

  if (bookForm) {
    bookForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const genre = document.getElementById("genre").value;
      const year = document.getElementById("year").value;
      const read = document.getElementById("read").checked;

      addBookToLibrary(title, author, genre, year, read);
      bookForm.reset();
      closeModalWithAnimation(modalElement);
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      closeModalWithAnimation(modalElement);
    });
  }
});
