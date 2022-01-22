/*
 * @Date: 2022-01-19 20:57:11
 * @LastEditors: GC
 * @LastEditTime: 2022-01-20 21:39:44
 * @FilePath: \BookList App\app.js
 */


// Book Class: Represent a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        // Set books to that array
        const books = Store.getBooks();

        // Loop through this books and we are calling a method and passing a book into it:
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector("#book-list");

        // Create a table row element
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        // Append the row to the list
        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");

        container.insertBefore(div, form);
        
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector(".alert").remove(), 3000);
        
    }

    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }
}

// Store Class: Handle Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;
    }

    static addBooks(book) {
        const books = Store.getBooks();
    
        // Push on whatever is passes on in here as a book
        books.push(book);

        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook() {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(books.isbn === isbn) {
                books.splice(index, 1);
            }   
        })
        localStorage.setItem("books", JSON.stringify(books));
    }
}


// Event: Display Book
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    // Validate
    if (title === "" || author === "" || isbn === "") {
        UI.showAlert("Please fill all these fields!", "danger");
    } else {
        // Instantiate a book from this book class
        const book = new Book(title, author, isbn);

        // Add book to UI
        UI.addBookToList(book);

        // Add book to store
        Store.addBooks(book);

        // Show success message
        UI.showAlert("Book added!", "success");
    
        // Clear fields:
        UI.clearFields();
    }

    
});

// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);

    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    

    UI.showAlert("Book removed!", "success");
})