// document.addEventListener("DOMContentLoaded", function () {
//     // Get user_name from localStorage
//     let user_name = localStorage.getItem("user_name");
//     let role = localStorage.getItem("user_role");
//     console.log(user_name);

//     // Get the parent element containing the login/register links
//     let userField = document.querySelector(".log_reg");

//     // Get the element to be removed
//     let removedItem = document.querySelector(".mybeRemoved");
//     let logout = document.querySelector(".logout")
//     // Replace the "mybeRemoved" div if user_name exists
//     if (user_name && role =="customer") {
//         // Create a new element to display the user name
//         let userNameElement = document.createElement("div");
//         userNameElement.textContent = `Welcome, ${user_name}!`;
//         userNameElement.classList.add("user-welcome");
//         logout.style.display ="block";

//         // Replace the login/register links with the new user name element
//         if (removedItem) {
//             userField.replaceChild(userNameElement, removedItem);
//         }
//     }
// });














// fetch('products.json')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json(); // Parse JSON
//     })
//     .then(data => {
//         const productsDiv = document.getElementById('product-list');
//         const searchInput = document.getElementById("product-name-filter");
//         const search_btn = document.getElementById('apply-name-filter'); 

//         // Function to display products
//         function displayProducts(filteredData) {
//             productsDiv.innerHTML = ''; // Clear previous products
//             filteredData.forEach(product => {
//                 // Create product container
//                 const productDiv = document.createElement('div');
//                 productDiv.classList.add('product-card');

//                 if (product.product_permition === false || product.product_permition === "waiting") {
//                     console.log('Product not permitted');
//                     return;
//                 }

//                 productDiv.innerHTML = `
//                 <div class="all">
//                     <div id="images">
//                         <img class="main-pic" src="${product.img_url}" alt="${product.product_name}">
//                         <img class="extra" src="${product.img_url2}" alt="${product.product_name}">
//                         <img class="extra" src="${product.img_url3}" alt="${product.product_name}">
//                         <img class="extra" src="${product.img_url4}" alt="${product.product_name}">
//                     </div>
//                     <h3>${product.product_name}</h3>
//                     <h1><strong>$${product.price}</strong></h1>
//                     <i class="fas fa-shopping-bag  addbag"></i>
//                     <h5 id="stock_val">In stock ${product.stock} items!</h5>
//                     <ul>
//                         <li><h1>Product details</h1></li>
//                         <li><p>${product.description}</p></li>
//                     </ul>
//                 </div>
//                 `;

//                 // Add event listener to the main image for hover effect
//                 const mainPic = productDiv.querySelector('.main-pic');
//                 // const extraImages = productDiv.querySelectorAll('.extra');

//                 // Mouse enter event to change the main image source to the second image
//                 mainPic.addEventListener('mouseenter', function () {
//                     mainPic.src = product.img_url2;  // Change to second image on hover
//                 });

//                 mainPic.addEventListener('click', function () {
//                     mainPic.src = product.img_url;  // دى من غير ما اعملها كانت الصورة بتتغير في صفحة الديتيلز عشان الماوس انتر مش زي الهوفر
//                 });

//                 // Mouse leave event to reset back to the original image
//                 mainPic.addEventListener('mouseleave', function () {
//                     mainPic.src = product.img_url;  // Reset to the original image
//                 });

//                 // Add event listener for this product card to store in localStorage and navigate
//                 productDiv.addEventListener('click', () => {
//                     window.localStorage.setItem('product_stock', product.stock);
//                     window.localStorage.setItem('product', productDiv.outerHTML);
//                     window.location.href = 'html/product-details.html';
//                 });

//                 // Append the product content to the main container
//                 productsDiv.appendChild(productDiv);
//             });
//         }

//         // Display all products initially
//         displayProducts(data);

        
//         // Search input event listener
//         search_btn.addEventListener("click", function() {
//             const searchQuery = searchInput.value.toLowerCase();
            
//             // Filter the products based on the search query
//             const filteredProducts = data.filter(product =>
//                 product.product_name.toLowerCase().includes(searchQuery)
//             );
            
//             // Display the filtered products
//             displayProducts(filteredProducts);
//         });

//         // Reload page if the search input is cleared
//         searchInput.addEventListener('input', function() {
//             if (searchInput.value === "") {
//                 location.reload();
//             }
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching or processing JSON:', error);
//     });





//     ////////////////////////////////////////عشان لما ادوس على المنتج اخزنه ف اللوكال واروح على صفحة ديتيلز\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//     const addbagIcons = document.querySelectorAll('.addbag');
//     addbagIcons.forEach(addbag => {
// console.log(addbag);});

    



// let product = document.querySelectorAll(".product-card");

// product.forEach((product) => {

//     product.addEventListener("click",(product)=>{
        
//         window.localStorage.setItem(("product"),product.currentTarget.outerHTML)

//         window.location.href = 'html/product-details.html';

        

//     }) 
    
// });

////////////////////////////////////////////////////////new v


document.addEventListener("DOMContentLoaded", function () {
    // Get user_name and role from localStorage
    let user_name = localStorage.getItem("user_name");
    let role = localStorage.getItem("user_role");
    console.log(user_name);

    // Get the parent element containing the login/register links
    let userField = document.querySelector(".log_reg");
    let removedItem = document.querySelector(".mybeRemoved");
    let logout = document.querySelector(".logout");

    // If user_name exists and role is "customer", display user info and show logout
    if (user_name && role === "customer") {
        let userNameElement = document.createElement("div");
        userNameElement.textContent = `Welcome, ${user_name}!`;
        userNameElement.classList.add("user-welcome");
        logout.style.display = "block";

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
        const productsDiv = document.getElementById('product-list');
        const searchInput = document.getElementById("product-name-filter");
        const search_btn = document.getElementById('apply-name-filter');

        // Function to display products
        function displayProducts(filteredData) {
            productsDiv.innerHTML = ''; // Clear previous products
            filteredData.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product-card');

                if (product.product_permition === false || product.product_permition === "waiting") {
                    console.log('Product not permitted');
                    return;
                }

                productDiv.innerHTML = `
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
                    <h5 id="stock_val">In stock ${product.stock} items!</h5>
                    <ul>
                        <li><h1>Product details</h1></li>
                        <li><p>${product.description}</p></li>
                    </ul>
                </div>
                `;

                // Handle image hover behavior
                const mainPic = productDiv.querySelector('.main-pic');
                
                mainPic.addEventListener('mouseenter', function () {
                    mainPic.src = product.img_url2;
                });
                
                mainPic.addEventListener('click', function () {
                    mainPic.src = product.img_url;  // دى من غير ما اعملها كانت الصورة بتتغير في صفحة الديتيلز عشان الماوس انتر مش زي الهوفر
                });

                mainPic.addEventListener('mouseleave', function () {
                    mainPic.src = product.img_url;
                });

                // Add event listener to navigate to product details on product card click
                productDiv.addEventListener('click', function () {
                    window.localStorage.setItem('product_stock', product.stock);
                    window.localStorage.setItem('product', productDiv.outerHTML);
                    window.location.href = 'html/product-details.html';
                });

                // Add event listener for the shopping bag icon (Add to Bag functionality)
                const addbag = productDiv.querySelector('.addbag');
                addbag.addEventListener('click', function (e) {
                    e.stopPropagation()
                    // window.location.href = 'html/login.html'

                });

                // Append the product content to the main container
                productsDiv.appendChild(productDiv);
            });
        }

        // Display all products initially
        displayProducts(data);

        // Search input event listener to filter products
        search_btn.addEventListener("click", function () {
            const searchQuery = searchInput.value.trim().toLowerCase();
            const filteredProducts = data.filter(product =>
                product.product_name.toLowerCase().includes(searchQuery)
            );
            displayProducts(filteredProducts);
        });

        // Reset products if the search input is cleared
        searchInput.addEventListener('input', function () {
            if (searchInput.value === "") {
                displayProducts(data); // Reload all products when input is cleared
            }
        });
    })
    .catch(error => {
        console.error('Error fetching or processing JSON:', error);
    });
