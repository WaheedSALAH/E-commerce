document.addEventListener("DOMContentLoaded", function () {
    let product = localStorage.getItem("product");

    let details = document.querySelector("#op");

    if (product) {
        details.innerHTML = product;  
    }
});
