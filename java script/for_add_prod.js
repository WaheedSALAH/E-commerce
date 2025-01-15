document.querySelector("#addProductForm").addEventListener("submit", function (e) {
    e.preventDefault(); 

    const productName = document.getElementById("productName").value.trim();
    const productDescription = document.getElementById("productDescription").value.trim();
    const productPrice = document.getElementById("productPrice").value.trim();
    const productImageLink = document.getElementById("productImageLink").value.trim();
    const productImageLink2 = document.getElementById("productImageLink2").value.trim();
    const productImageLink3 = document.getElementById("productImageLink3").value.trim();
    const productImageLink4 = document.getElementById("productImageLink4").value.trim();

    if (!productName || !productDescription || !productPrice || !productImageLink) {
        alert("All fields are required!");
        return;
    }

    const productData = {
        product_name: productName,
        description: productDescription,
        price: parseFloat(productPrice),
        img_url: productImageLink,
        img_url2:productImageLink2,
        img_url3:productImageLink3,
        img_url4:productImageLink4
    };
    
    fetch('/admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert("Product added successfully!");
                location.href = "../html/admin.html"
                // document.getElementById("addProductForm").reset(); // Reset the form
                // location.reload()
            } else {
                alert(data.error || "Failed to add product.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while adding the product.");
        });
});