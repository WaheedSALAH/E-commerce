let user_name = localStorage.getItem("user_name");

let header = document.querySelector(".header")

let userNameElement = document.createElement("h1");

userNameElement.textContent = `Welcome, ${user_name}! you act as seller `;

header.prepend(userNameElement);


document.getElementById("addProductForm").addEventListener("submit", function (e) {
    e.preventDefault(); // منع إرسال النموذج بشكل افتراضي

    // جمع البيانات
    const productName = document.getElementById("productName").value.trim();
    const productDescription = document.getElementById("productDescription").value.trim();
    const productPrice = document.getElementById("productPrice").value.trim();
    const productImageLink = document.getElementById("productImageLink").value.trim();

    // التحقق من صحة البيانات
    if (!productName || !productDescription || !productPrice || !productImageLink) {
        alert("All fields are required!");
        return;
    }

    const productData = {
        product_name: productName,
        description: productDescription,
        price: parseFloat(productPrice),
        img_url: productImageLink,
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
                document.getElementById("addProductForm").reset(); // Reset the form
            } else {
                alert(data.error || "Failed to add product.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while adding the product.");
        });
    
});
