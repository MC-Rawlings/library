const main = document.querySelector("main");

class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = false;
    }

}

class Library {

    constructor() {
        this.myLibrary = [];
    }
    // Create book with form inputs and push to myLibrary
    addBook() {
    const form = document.querySelector("form");

    const newBook = new Book(form.elements[0].value, form.elements[1].value, form.elements[2].value);
    this.myLibrary.push(newBook);
    
    };
}

let library = new Library;



// Show/hide new-book form
const addButton = document.querySelector(".button-add");
addButton.addEventListener("click", function() {
    const form = document.querySelector(".form");
    form.classList.toggle("hidden");
});




// Add books to DOM in card-styled format
    addCard = (bookTitle, bookAuthor, bookPages) => {

    const displayCard = document.createElement("div");
    displayCard.className = "card";
    displayCard.dataset.title = bookTitle;
    main.appendChild(displayCard);

    const title = document.createElement("h1");
    title.className = "book-title";
    title.textContent = `${bookTitle}`;
    displayCard.appendChild(title);

    const author = document.createElement("p");
    author.textContent = `by ${bookAuthor}`;
    displayCard.appendChild(author);

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${bookPages}`
    displayCard.appendChild(pages);

    const lineBreak = document.createElement("hr");
    displayCard.appendChild(lineBreak);

    const buttons = document.createElement("div");
    buttons.className = "controls";
    displayCard.appendChild(buttons);

    const isRead = document.createElement("img");
    isRead.className = "unread";
    isRead.src = "css/ellipse-outline.svg";
    buttons.appendChild(isRead);

    const removeCard = document.createElement("img");
    removeCard.className = "remove-button";
    removeCard.src = "css/close-circle-outline.svg";
    buttons.appendChild(removeCard);

    // Button to remove book 
    removeCard.addEventListener("click", function() {

        const cardTitle = removeCard.parentElement.parentElement.dataset.title;
        console.log(cardTitle);

        const cardIndex = library.myLibrary.findIndex(book => book.title == cardTitle);
        library.myLibrary.splice(cardIndex, 1);
        clearDisplay();
        library.myLibrary.forEach(function(book){
    
            addCard(book.title, book.author, book.pages);
        
        });
        
    });

    isRead.addEventListener("click", function() {

        const cardTitle = isRead.parentElement.parentElement.dataset.title;
        console.log(cardTitle);

        const cardIndex = library.myLibrary.findIndex(book => book.title == cardTitle);
        
        if (library.myLibrary[cardIndex].isRead === false) {
            library.myLibrary[cardIndex].isRead = true;
            isRead.className = "check";
            isRead.src = "css/checkmark-circle-outline.svg";
        } else {
            library.myLibrary[cardIndex].isRead = false;
            isRead.className = "unread";
            isRead.src = "css/ellipse-outline.svg";
        }

        
    });
}

const clearDisplay = () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {
        card.remove();
    })
};

// Confirm form, add & display book
const newBook = document.querySelector(".new-book");
newBook.addEventListener("click", function() {
    clearDisplay();
    library.addBook();
    library.myLibrary.forEach(function(book){
    
        addCard(book.title, book.author, book.pages);
    
    });
    document.querySelector("form").reset();
    document.querySelector(".form").classList.toggle("hidden");
});

// Clear & hide form
const cancelForm = document.querySelector(".cancel-form");
cancelForm.addEventListener("click", function() {
    document.querySelector("form").reset();
    document.querySelector(".form").classList.toggle("hidden");
})


