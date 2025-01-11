document.addEventListener("DOMContentLoaded", function () {
    // Get user_name from localStorage
    let user_name = localStorage.getItem("user_name");
    console.log(user_name);

    // Get the parent element containing the login/register links
    let userField = document.querySelector(".log_reg");

    // Get the element to be removed
    let removedItem = document.querySelector(".mybeRemoved");

    // Replace the "mybeRemoved" div if user_name exists
    if (user_name) {
        // Create a new element to display the user name
        let userNameElement = document.createElement("div");
        userNameElement.textContent = `Welcome, ${user_name}!`;
        userNameElement.classList.add("user-welcome");

        // Replace the login/register links with the new user name element
        if (removedItem) {
            userField.replaceChild(userNameElement, removedItem);
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    let product = localStorage.getItem("product");

    let details = document.querySelector("#op");

    if (product) {
        details.innerHTML = product;  
    }
});
