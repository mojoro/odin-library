const myLibrary = [];
const mainContent = document.querySelector('main');

class Book {
  constructor(title, author, pages, readBool) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readString = readBool ? "completed" : "not read yet";
    this.info = () => {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readString}.`
    }
  }

  addBookToLibrary() {
    myLibrary.push(this);
  }

  createCard(index) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'right';
    deleteButton.id = index;
    deleteButton.textContent = 'X';
    deleteButton.addEventListener("click", removeCard);

    const centerDiv = document.createElement('div');
    centerDiv.className = 'center';

    const titleHead = document.createElement('h3');
    titleHead.textContent = this.title;
    centerDiv.appendChild(titleHead);

    const authorHead = document.createElement('h4');
    authorHead.textContent = this.author;
    centerDiv.appendChild(authorHead);

    const pagesP = document.createElement('p');
    pagesP.textContent = this.pages;
    centerDiv.appendChild(pagesP);

    const read = document.createElement('p');
    read.textContent = this.readString;
    centerDiv.appendChild(read);

    const readToggle = document.createElement('button');
    readToggle.className = index;
    readToggle.textContent = "Toggle Read";
    readToggle.addEventListener('click', toggleRead);
    centerDiv.appendChild(readToggle);

    bookCard.appendChild(deleteButton);
    bookCard.appendChild(centerDiv);
    mainContent.appendChild(bookCard)
  }
}

function printBooks() {
  const currentBooks = document.querySelectorAll('div.book-card');
  for (const bookCard of currentBooks){
    bookCard.remove();
  }
  let i = 0;
  for (const book of myLibrary) {
    book.createCard(i);
    i++;
  }
}

function processForm(e) {
  if (e.preventDefault) e.preventDefault();
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const read = document.getElementById("read");

  const newBook = new Book(title.value, author.value, pages.value, Boolean(read.value));
  newBook.addBookToLibrary();

  title.value = '';
  author.value = '';
  pages.value = '';
  read.value = '';

  printBooks();

  return false;
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

const form = document.querySelector('form');
if (form.attachEvent) {
  form.attachEvent("submit", processForm);
} else {
  form.addEventListener("submit", processForm);
}
