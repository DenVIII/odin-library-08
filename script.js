let myLibrary = [];
const tableHeaders = document.querySelectorAll('th');
const formCallBtn = document.querySelector('#form-call');
const formSubmitBtn = document.querySelector('#form-submit');
const bookForm = document.querySelector('.book-form');
const formInputs = document.querySelectorAll('input');
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not yet read');

let deleteBookBtns = document.querySelectorAll('.delete-book');

addBookToLibrary(theHobbit);
displayBooks(myLibrary);

formSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const values = [];
    for(let i = 0; i < formInputs.length - 1; i++) {
        const inputValue = formInputs[i].value;
        if (inputValue) {
            values.push(inputValue);
        } else {
            values.length = 0;
            break;
        }
    }
    values.push(formInputs[formInputs.length - 1].checked);
    if (values.length > 1) {
        console.log(values)
        addBookToLibrary(new Book(...values));
        displayBooks(myLibrary);
        bookForm.classList.toggle('active');
    }
})

formCallBtn.addEventListener('click', (e) => {
    e.preventDefault();
    bookForm.classList.toggle('active');
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function deleteBookFromLibrary(index) {
    console.log(index)
    myLibrary.splice(index, 1);
    console.log(myLibrary)
}

function displayBooks(library) {
    const bookTable = document.querySelector('tbody');
    let bookCount = 0;
    bookTable.innerHTML = `
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Read</th>
        </tr>
    `
    library.forEach(book => {
        const tableRow = document.createElement('tr');
        tableHeaders.forEach(element => {
            const dataCell = document.createElement('td');
            dataCell.textContent = book[element.textContent.toLowerCase()];
            tableRow.appendChild(dataCell);
        })
        bookCount += 1;
        tableRow.innerHTML += `
            <button class='delete-book' data-index = ${bookCount - 1}>x</button>
        `
        bookTable.appendChild(tableRow);
    });
    deleteBookBtns = document.querySelectorAll('.delete-book');
    deleteBookBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            deleteBookFromLibrary(btn.getAttribute('data-index'));
            displayBooks(myLibrary);
        })
    })
}

console.log(deleteBookBtns)