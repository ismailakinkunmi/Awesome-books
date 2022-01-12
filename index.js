/* eslint-disable max-classes-per-file */

class Book {
  constructor(title, author) {
    this.title = title.value;
    this.author = author.value;
  }
}

class LocalStoragConfig {
  static getBookFromStorage() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static AddBook(book) {
    const books = LocalStoragConfig.getBookFromStorage();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static RemoveStoring(title) {
    const books = LocalStoragConfig.getBookFromStorage();
    const filteredArray = books.filter((book) => book.title !== title);
    localStorage.setItem('books', JSON.stringify(filteredArray));
  }
}

class BookElements {
  static BookElement(book) {
    const bookContainer = document.querySelector('.book-container');
    const listContainer = document.createElement('div');
    listContainer.className = 'list-Container';
    listContainer.innerHTML += `
            <p class="text">"${book.title}" by ${book.author}</p>
            <button class='delete'>Remove</button>
            `;

    bookContainer.appendChild(listContainer);
  }
}

class Display {
  static displayBooksFromStorage() {
    const books = LocalStoragConfig.getBookFromStorage();
    books.forEach((book) => BookElements.BookElement(book));
  }

  static removeBook(target) {
    if (target.classList.contains('delete')) {
      target.parentElement.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', Display.displayBooksFromStorage);
document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title');
  const author = document.getElementById('author');

  const book = new Book(title, author);

  LocalStoragConfig.AddBook(book);

  BookElements.BookElement(book);

  const form = document.querySelector('#form');
  form.reset();
});

document.querySelector('.book-container').addEventListener('click', (e) => {
  Display.removeBook(e.target);

  LocalStoragConfig.RemoveStoring(
    e.target.parentElement.firstElementChild.textContent,
  );
});
