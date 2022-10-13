const UNREADED_LIST_BOOK_ID = "books";
const READED_LIST_BOOK_ID = "readed-book";
const BOOK_ITEMID = "itemId";




function makeBook(data, author, year, isReaded) {

    const textTitle = document.createElement('h2');
    textTitle.innerText = data.toUpperCase();

    const textAuthor = document.createElement('h5');
    textAuthor.innerText = 'Penulis: ' + author;

    const textYear = document.createElement('p');
    textYear.innerText = 'Tahun: ' + year;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner')
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement('div');
    container.classList.add('item');
    container.append(textContainer);

    if (isReaded) {
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton()
        );
    }
    return container;
}

function createUndoButton() {
    return createButton("undo-button", function (event) {
        undoBookFromReaded(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function (event) {
        removeBookFromReaded(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check-button", function (event) {
        addBookFromReaded(event.target.parentElement);
    });
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function addBook() {
    const unreadedBookList = document.getElementById(UNREADED_LIST_BOOK_ID);
    const readedBookList = document.getElementById(READED_LIST_BOOK_ID);
    const textBook = document.getElementById("title").value;
    const authBook = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const checkBox = document.getElementById("complete");

    if (checkBox.checked) {
        const book = makeBook(textBook, authBook, year, true);
        const bookObject = composeBookObject(textBook, authBook, year, true);

        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
        readedBookList.append(book);
    } else {
        const book = makeBook(textBook, authBook, year, false);
        const bookObject = composeBookObject(textBook, authBook, year, false);

        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
        unreadedBookList.append(book);
    }
    updateDataToStorage();

}

function addBookFromReaded(taskElement) {
    const listReaded = document.getElementById(READED_LIST_BOOK_ID);
    const bookTitle = taskElement.querySelector(".inner > h2").innerText;
    const bookAuthor = taskElement.querySelector(".inner > h5").innerText;
    const bookYear = taskElement.querySelector(".inner > p").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    listReaded.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function removeBookFromReaded(taskElement) {

    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function undoBookFromReaded(taskElement) {
    const listUnreaded = document.getElementById(UNREADED_LIST_BOOK_ID);
    const bookTitle = taskElement.querySelector(".inner > h2").innerText;
    const bookAuthor = taskElement.querySelector(".inner > h5").innerText;
    const bookYear = taskElement.querySelector(".inner > p").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listUnreaded.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function refreshDataFromBooks() {
    const listUnreaded = document.getElementById(UNREADED_LIST_BOOK_ID);
    let listReaded = document.getElementById(READED_LIST_BOOK_ID);

    for (book of books) {
        const newBook = makeBook(book.task, book.author, book.year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;

        if (book.isCompleted) {
            listReaded.append(newBook);
        } else {
            listUnreaded.append(newBook);
        }
    }
}