/* eslint-disable max-classes-per-file */
const title = document.getElementById('title');
const author = document.getElementById('author');
const form = document.getElementById('form');

class Book {
  constructor(title, author) {
    this.id = Math.floor(Math.random() * 10000)
      .toString()
      .substring();
    this.title = title.value;
    this.author = author.value;
  }

  static displayBookOnUi(book) {
    const booksContainer = document.getElementById('container');
    const listContainer = document.createElement('div');
    listContainer.className = 'list-Container';
    listContainer.innerHTML += `
            <p class="text">"${book.title}" by ${book.author}</p>
            <button class='delete' id=${book.id}>Remove</button>
            `;
    booksContainer.appendChild(listContainer);
  }

  static getBooksFromLocalStorage() {
    let books;
    if (!localStorage.getItem('books')) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const displayList = Book.getBooksFromLocalStorage();
    displayList.forEach((book) => Book.displayBookOnUi(book));
  }

  static addBooksToLocalStorage(book) {
    const newlist = Book.getBooksFromLocalStorage();
    newlist.push(book);
    localStorage.setItem('books', JSON.stringify(newlist));
  }

  static removeBooksFromLocalStorage(bookId) {
    const newList = Book.getBooksFromLocalStorage();
    newList.forEach((item, index) => {
      if (item.id === bookId) {
        newList.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(newList));
  }

  static removeBookUi(book) {
    if (book.classList.contains('delete')) {
      book.parentElement.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', Book.displayBooks());

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (title === '' || author === '') {
    form.reset();
  } else {
    const book = new Book(title, author);
    Book.displayBookOnUi(book);
    Book.addBooksToLocalStorage(book);
    form.reset();
  }
});

document.querySelector('#container').addEventListener('click', (e) => {
  Book.removeBookUi(e.target);
  Book.removeBooksFromLocalStorage(e.target.id);
});

class DisplayThePage {
  static navigationBar(e) {
    e.preventDefault();
    const thePage = e.target.getAttribute('data-target');
    document.querySelector('.display').classList.remove('display');
    document.getElementById(thePage).classList.add('display');
  }

  static pageView() {
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach((item) => {
      item.addEventListener('click', DisplayThePage.navigationBar);
    });
  }
}
document.addEventListener('DOMContentLoaded', DisplayThePage.pageView);
document.getElementById('time').innerHTML = Date();
