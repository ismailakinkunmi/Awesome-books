const form = document.getElementById("myForm");
const container = document.getElementById("container");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const books = JSON.parse(localStorage.getItem("books")) || [];

const addBookToLocalStorage = (id, title, author) => {
  if (title && author) {
    books.push({
      id,
      title,
      author,
    });
    localStorage.setItem("books", JSON.stringify(books));
    return { id, title, author };
  }
  return null;
};

const createBookUi = ({ title, author, id }) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("content");
  container.appendChild(newDiv);
  return (newDiv.innerHTML += `
        <h1>${title}</h1>
        <h2>${author}</h2>
        <button class="remove" name=${id}>Remove</button>
        <div class="line"></div>
    `);
};

books.forEach(createBookUi);
form.onsubmit = (e) => {
  e.preventDefault();
  let id = Math.floor((1 + Math.random()) * 0x1000)
    .toString(16)
    .substring(1);
  const newBook = addBookToLocalStorage(id, bookTitle.value, bookAuthor.value);
  createBookUi(newBook);
  location.reload();
  bookTitle.value = "";
  bookAuthor.value = "";
  id = "";
};

const deleteBook = (id) => {
  const newBooks = books.filter((book) => book.id !== id);
  location.reload();
  return localStorage.setItem("books", JSON.stringify(newBooks));
};

document.querySelectorAll(".remove").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    deleteBook(e.target.name);
  });
});
