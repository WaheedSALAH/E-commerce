let product = document.querySelectorAll(".product-card");

product.forEach((product) => {

    product.addEventListener("click",(product)=>{
        
        window.localStorage.setItem(("product"),product.currentTarget.outerHTML)

        window.location.href = 'html/product-details.html';

        

    }) 
    
});
