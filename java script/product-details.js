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
    // Retrieve and parse the product data from localStorage
    let productJSON = localStorage.getItem("product");
    
    // Check if product data exists in localStorage
    if (productJSON) {
        let product = JSON.parse(productJSON); // Parse the JSON string into an object

        // Get the container to display the product details
        let details = document.querySelector("#op");

        if (details) {
            // Dynamically create the HTML content based on the product data
            if (product.img_url.startsWith("images/")) {

                
                details.innerHTML = `
                    <div class="product-card">
                    <div class="all">
                    <div id="images">
                            <img class="main-pic" src="../${product.img_url}" alt="${product.product_name}">
                            <img class="extra" src="../${product.img_url2}" alt="${product.product_name}">
                            <img class="extra" src="../${product.img_url3}" alt="${product.product_name}">
                            <img class="extra" src="../${product.img_url4}" alt="${product.product_name}">
                        </div>
                        <h3>${product.product_name}</h3>
                        <h1><strong>$${product.price}</strong></h1>
                        <i class="fas fa-shopping-bag addbag"></i>
                        <h5 id="stock_val">Stock: ${product.stock} items</h5>
                        <ul>
                            <li><h1>Product details</h1></li>
                            <li><p>${product.description}</p></li>
                        </ul>
                    </div>
                    </div>
                `;
            }
            else{
                details.innerHTML = `
                <div class="product-card">
                <div class="all">
                <div id="images">
                        <img class="main-pic" src="${product.img_url}" alt="${product.product_name}">
                        <img class="extra" src="${product.img_url2}" alt="${product.product_name}">
                        <img class="extra" src="${product.img_url3}" alt="${product.product_name}">
                        <img class="extra" src="${product.img_url4}" alt="${product.product_name}">
                    </div>
                    <h3>${product.product_name}</h3>
                    <h1><strong>$${product.price}</strong></h1>
                    <i class="fas fa-shopping-bag addbag"></i>
                    <h5 id="stock_val">Stock: ${product.stock} items</h5>
                    <ul>
                        <li><h1>Product details</h1></li>
                        <li><p>${product.description}</p></li>
                    </ul>
                </div>
                </div>
            `;
            }

        } else {
            console.error("The #op container is not found in the HTML.");
        }

        // Handle stock visibility
        let stock = parseInt(product.stock);
        if(stock>0)
            {
                let show_instock = document.getElementById("inStock")
                show_instock.style.display ="block";
        
            }
            else{
                let show_outstock =document.getElementById("outOfstock")
                let stock_val = document.getElementById('stock_val')
                show_outstock.style.display ="block";
                stock_val.style.display = "none"
            }
    } else {
        console.error("No product data found in localStorage.");
    }
});


// fetch('../products.json')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json(); // Parse JSON
//     })
//     .then(data => {
//         // console.log(data); // Log data to console


//         // Add each product to the DOM
//         data.forEach(product => {
//             console.log(product)
        
//         })})