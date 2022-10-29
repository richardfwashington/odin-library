var library = [];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

Book.prototype.info = function() {
    return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + (this.haveRead ? 'have read' : 'have not read');
};

function addBookToLibrary(book) {
    library.push(book);
}


var LOTR = new Book('The Lord of The Rings', 'J.R.R Tolkein', 350, false);
var TR = new Book('The Road', 'Cormack McArthy', 120, true);

addBookToLibrary(LOTR);
addBookToLibrary(TR);

var booksDom = document.querySelector('#books');

render();

function render() {
    // Clear the library

    booksDom.textContent = '';

    // Add each book to the dom

    for(const [index, book] of library.entries()) {
        let bookDom = document.createElement('li');
        bookDom.textContent = book.info() + ' ';

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('data-id', index);

        // Add event listener to remove the item from the library and re-render
        deleteButton.addEventListener('click', function() {
            library.splice(this.dataset.id, 1);
            render();
        });

        let readButton = document.createElement('button');
        readButton.textContent = 'Read';
        readButton.setAttribute('data-id', index);

        // Add event listener to remove the item from the library and re-render
        readButton.addEventListener('click', function() {
            console.log(this.dataset.id);
            library[this.dataset.id].haveRead = true;
            render();
        });

        bookDom.appendChild(deleteButton);
        bookDom.appendChild(readButton);

        booksDom.appendChild(bookDom);
    }
}

var addBookButton = document.querySelector('#new_book');

addBookButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    var title = document.querySelector('#name').value;
    var author = document.querySelector('#author').value;
    var pages = document.querySelector('#pages').value;
    book = new Book(title, author, pages);

    addBookToLibrary(book);

    render();
});