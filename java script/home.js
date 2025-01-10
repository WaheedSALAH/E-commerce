fetch('products.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON
    })
    .then(data => {
        console.log(data); // Log data to console

        const productsDiv = document.getElementById('product-list');

        // Add each product to the DOM
        data.forEach(product => {
            // Create product container
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-card');
            // Add product content
            productDiv.innerHTML = `

                <div class="all">

                <div id="images">

                <img class="main-pic" src="${product.img_url}" alt="${product.product_name}">
                <img class="extra" src="${product.img2_url}" alt="${product.product_name}">
                </div>

                <h3>${product.product_name}</h3>
                <h1><strong>${product.price}</strong></h1>
                <button>Add to Cart</button>

                <ul>
                <li><h1>product details</h1></li>
                <li> <p>${product.description}</p> </li>
                </ul>   

                </div>

                    
  
                </div>


            `;

            // Append to the main container
            productsDiv.prepend(productDiv);

            // Add event listener for this product card
            productDiv.addEventListener('click', () => {
                // Store the clicked product's HTML in localStorage
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
