const myLibrary = [];
const mainContent = document.querySelector('main');

function Book(title, author, pages, readBool) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readString = readBool ? "completed" : "not read yet";
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readString}.`
  }
}

function addBookToLibrary(title, author, pages, readBool) {
  const newBook = new Book(title, author, pages, readBool);
  myLibrary.push(newBook);
  console.log(newBook.info());
}

function createCard(titleContent, authorContent, pagesContent, readString, index){
  const bookCard = document.createElement('div');
  bookCard.className = 'book-card';
  

  const deleteButton = document.createElement('button');
  deleteButton.className = 'right';
  deleteButton.id = index;
  deleteButton.textContent = 'X';
  deleteButton.addEventListener("click", removeCard);
  

  const centerDiv = document.createElement('div');
  centerDiv.className = 'center';

  const title = document.createElement('h3');
  title.textContent = titleContent;
  centerDiv.appendChild(title);

  const author = document.createElement('h4');
  author.textContent = authorContent;
  centerDiv.appendChild(author);

  const pages = document.createElement('p');
  pages.textContent = pagesContent;
  centerDiv.appendChild(pages);

  const read = document.createElement('p');
  read.textContent = readString;
  centerDiv.appendChild(read);

  const readToggle = document.createElement('button');
  readToggle.className = index;
  readToggle.textContent = "Toggle Read";
  readToggle.addEventListener('click', toggleRead);
  centerDiv.appendChild(readToggle);
  
  bookCard.appendChild(deleteButton);
  bookCard.appendChild(centerDiv);
  mainContent.appendChild(bookCard);
}

function printBooks() {
  const libraryCards = [];
  const currentBooks = document.querySelectorAll('div.book-card');
  for (const bookCard of currentBooks){
    bookCard.remove();
  }
  let i = 0;
  for (const book of myLibrary) {
    createCard(book.title, book.author, book.pages, book.readString, i);
    i++;
  }
}

function processForm(e) {
  if (e.preventDefault) e.preventDefault();
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const read = document.getElementById("read");

  addBookToLibrary(title.value, author.value, pages.value, Boolean(read.value));

  title.value = '';
  author.value = '';
  pages.value = '';
  read.value = '';

  printBooks();

  return false;
}

const form = document.querySelector('form');
if (form.attachEvent) {
  form.attachEvent("submit", processForm);
} else {
  form.addEventListener("submit", processForm);
}

function removeCard(e){
  const bookToRemove = e.target.id;
  myLibrary.splice(bookToRemove, 1);
  printBooks(); 
}

function toggleRead(e){
  const entryToToggle = e.target.className;
  if (myLibrary[entryToToggle].readString === "completed") myLibrary[entryToToggle].readString = "not read yet";
  else if (myLibrary[entryToToggle].readString === "not read yet") myLibrary[entryToToggle].readString = "completed";
  printBooks();
  
}
