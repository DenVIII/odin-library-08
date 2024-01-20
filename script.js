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

    if (formInputs[formInputs.length - 1].checked) {
        values.push('read');
    } else {
        values.push('not yet read');
    }
    
    if (values.length > 1) {
        addBookToLibrary(new Book(...values));
        displayBooks(myLibrary);
        clearForm();
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

function clearForm() {
    for(let i = 0; i < formInputs.length - 1; i++) {
        formInputs[i].value = '';
    }
    formInputs[formInputs.length - 1].checked = false;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function deleteBookFromLibrary(index) {
    myLibrary.splice(index, 1);
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
            dataCell.classList.add(`${element.textContent.toLowerCase()}-cell`)
            tableRow.appendChild(dataCell);
        })
        bookCount += 1;
        tableRow.innerHTML += `
            <button class='delete-book' data-index = ${bookCount - 1}>x</button>
        `
        bookTable.appendChild(tableRow);
    });
    changeReadStatus();
    deleteBookBtns = document.querySelectorAll('.delete-book');
    deleteBookBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            deleteBookFromLibrary(btn.getAttribute('data-index'));
            displayBooks(myLibrary);
        })
    })
}

/* Right now this project have bad optimisation when it comes to adding or removing entries
because displayBooks behaviour. It shouldn't reload book list every time. 

This is note to self, so I remember that I should change that */

function changeReadStatus() {
    const readCells = document.querySelectorAll('.read-cell');
    readCells.forEach(cell => {
        cell.addEventListener('click', () => {
            switch (cell.textContent) {
                case 'read':
                    cell.textContent = 'not yet read';
                    myLibrary[cell.parentElement.rowIndex - 1].read = 'not yet read';
                    break;
                case 'not yet read':
                    cell.textContent = 'read';
                    myLibrary[cell.parentElement.rowIndex - 1].read = 'read';
            }
        })
    })
}