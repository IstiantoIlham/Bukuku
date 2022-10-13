document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("overlay-form");
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
        removeInput();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

function removeInput() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("year").value = "";
    document.getElementById("complete").checked = false;
    document.getElementById("overlay-form").style.display = "none";
}

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil di simpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});

/* Overlay Form */

const openForm = document.getElementById("open-form");
const closeForm = document.getElementById("close-form");
const bookCancle = document.getElementById("book-cancle");

const bookSubmit = document.getElementById("book-submit");

openForm.addEventListener("click", function () {
    document.getElementById("overlay-form").style.display = "flex";
});

closeForm.addEventListener("click", function () {
    document.getElementById("overlay-form").style.display = "none";
});

bookCancle.addEventListener("click", function () {
    document.getElementById("overlay-form").style.display = "none";
});

bookSubmit.addEventListener("click", function () {
    Swal.fire("Success!", "Berhasil ditambahkan", "success");
});
