document.addEventListener("DOMContentLoaded", function () {
    // Get user_name from localStorage
    let user_name = localStorage.getItem("user_name");
    let role = localStorage.getItem("user_role");
    console.log(user_name);

    // Get the parent element containing the login/register links
    let userField = document.querySelector(".log_reg");

    // Get the element to be removed
    let removedItem = document.querySelector(".mybeRemoved");
    let logout = document.querySelector(".logout")
    // Replace the "mybeRemoved" div if user_name exists
    if (user_name && role =="customer") {
        // Create a new element to display the user name
        let userNameElement = document.createElement("div");
        userNameElement.textContent = `Welcome, ${user_name}!`;
        userNameElement.classList.add("user-welcome");
        logout.style.display ="block";

        // Replace the login/register links with the new user name element
        if (removedItem) {
            userField.replaceChild(userNameElement, removedItem);
        }
    }
});




fetch('products.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON
    })
    .then(data => {
        // console.log(data); // Log data to console

        const productsDiv = document.getElementById('product-list');

        // Add each product to the DOM
        data.forEach(product => {
            // Create product container
            const productDiv = document.createElement('div');
            
            productDiv.classList.add('product-card');
            if (product.product_permition == false || product.product_permition == "waiting") 
            {
                console.log('not permitted')
                return;
            }
            else{

                productDiv.innerHTML = `

                <div class="all">

                <div id="images">

                <img class="main-pic" src="${product.img_url}" alt="${product.product_name}">
                <img class="extra" src="${product.img_url2}" alt="${product.product_name}">
                <img class="extra" src="${product.img_url3}" alt="${product.product_name}">
                <img class="extra" src="${product.img_url4}" alt="${product.product_name}">
                </div>

                <h3>${product.product_name}</h3>
                <h1><strong>${product.price} $</strong></h1>
                <button>Add to Cart</button>
                
                <h5 id = "stock_val" >in stock ${product.stock} items !</h5>

                <ul>
                <li><h1>product details</h1></li>
                <li> <p>${product.description}</p> </li>
                </ul>   

                </div>

                    
  
                </div>


            `;
            }
            // Add product content
            

            // Append to the main container
            productsDiv.prepend(productDiv);

            // Add event listener for this product card
            productDiv.addEventListener('click', () => {
                // Store the clicked product's HTML in localStorage
                window.localStorage.setItem('product_stock', product.stock);
                window.localStorage.setItem('product', productDiv.outerHTML);

                // Redirect to the product details page
                window.location.href = 'html/product-details.html';
            });
        });
    })
    .catch(error => {
        console.error('Error fetching or processing JSON:', error);
    });





let product = document.querySelectorAll(".product-card");

product.forEach((product) => {

    product.addEventListener("click",(product)=>{
        
        window.localStorage.setItem(("product"),product.currentTarget.outerHTML)

        window.location.href = 'html/product-details.html';

        

    }) 
    
});

