let show_prod = document.querySelector("#prod")
let hidden_prod = document.querySelector("#products-section")

show_prod.addEventListener('click', function () {
    hidden_prod.style.display = "block";   
});


let hidden_form = document.querySelector(".form-container");
let showbtn = document.querySelector("#func_show_add_product");

showbtn.addEventListener('click', function () {
    hidden_form.style.display = "block"; // Correctly set the display property
    hidden_form.scrollIntoView({ behavior: "smooth" }); // Scroll to the form

    
});

fetch("../products.json").then((product)=>{
    console.log(product)
    let myData = product.json()
    console.log(myData)
    return myData;


    
}).then((myData)=>{
    const tableBody = document.querySelector("#products-table tbody");
    tableBody.innerHTML = "";
    let count1 = 0;
    let count2 = 0;
    myData.forEach(product => {
        if(product.product_permition == true && product.publisher == 'seller' )
            {
                product.product_permition="approved";
                count2 +=1
                let statOforder = document.querySelector('#statOforder')
                statOforder.innerHTML =`<td>${count2}</td>` //<<<<<<<<<<<<<< دا اللى بحط فيه عدد المتجات 

            }
        else if(product.product_permition == 'waiting')product.product_permition="pending"
        else product.product_permition="rejected";

        if (product.publisher == 'seller')
        {
        count1 +=1;
        row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.product_name}</td>
            <td>${product.price} $</td>
            <td>${product.product_permition}</td
        `;
        tableBody.appendChild(row);

        let rowOfstat = document.querySelector('#statOfprod')
        rowOfstat.innerHTML =`<td>${count1}</td>` //<<<<<<<<<<<<<< دا اللى بحط فيه عدد المتجات 
        }
      
    });
})

// let statOforder = document.querySelector('#statOforder')
// statOforder.innerHTML =`<td>${product.product_permition.length}</td>` //<<<<<<<<<<<<<< دا اللى بحط فيه عدد المتجات 


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
                // document.getElementById("addProductForm").reset(); // Reset the 
                location.reload()
            } else {
                alert(data.error || "Failed to add product.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while adding the product.");
        });
    
});
