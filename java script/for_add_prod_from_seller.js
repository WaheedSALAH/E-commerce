
document.getElementById("addProductForm").addEventListener("submit", function (e) {
    e.preventDefault(); // منع إرسال النموذج بشكل افتراضي

    // جمع البيانات
    const productName = document.getElementById("productName").value.trim();
    const productDescription = document.getElementById("productDescription").value.trim();
    const productPrice = document.getElementById("productPrice").value.trim();
    const stock = document.getElementById("Product_stock").value.trim();
    const productImageLink = document.getElementById("productImageLink").value.trim();
    const productImageLink2 = document.getElementById("productImageLink2").value.trim();
    const productImageLink3 = document.getElementById("productImageLink3").value.trim();
    const productImageLink4 = document.getElementById("productImageLink4").value.trim();

    // التحقق من صحة البيانات
    if (!productName || !productDescription || !productPrice || !productImageLink) {
        alert("All fields are required!");
        return;
    }

    const productData = {
        product_name: productName,
        description: productDescription,
        price: parseFloat(productPrice),
        stock : stock,
        img_url: productImageLink,
        img_url2:productImageLink2,
        img_url3:productImageLink3,
        img_url4:productImageLink4
    };





    // إرسال البيانات للـ backend
    fetch('/seller-dashboard', {
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
                alert("Product sent successfully!  please wait for admin confirmation");
                location.href = "seller-dashboard.html"
            } else {
                alert(data.error || "Failed to add product.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while adding the product.");
        });
    
});
