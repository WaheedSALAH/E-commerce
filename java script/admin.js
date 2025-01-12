

fetch("../products.json").then((product)=>{
    console.log(product)
    let myData = product.json()
    console.log(myData)
    return myData;
}).then((myData)=>{
    const tableBody = document.querySelector("#products-table tbody");
    tableBody.innerHTML = "";
    myData.forEach(product => {
        const row = document.createElement("tr");
        if(product.publisher =='admin')product.product_permition = 'by admin'
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.product_name}</td>
            <td>${product.price} $</td>
            <td>${product.product_permition}</td>

            <td class = "${product.id}">
                <button onclick="deleteUser(${product.id})">Delete</button>
                <button onclick="editUser(${product.id})">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
        let rowOfstat = document.querySelector('#statOfprod')
        rowOfstat.innerHTML =`<td>${myData.length}</td>`
    });
})

let show_prod = document.querySelector("#prod")
let hidden_prod = document.querySelector("#products-section")

show_prod.addEventListener('click', function () {
    hidden_user.style.display = "none";   
    hidden_prod.style.display = "block";   
});


let show_users = document.querySelector("#userss")
let hidden_user = document.querySelector("#users-section")

show_users.addEventListener('click', function () {
    hidden_prod.style.display = "none";   
    hidden_user.style.display = "block";   
});




let hidden_form = document.querySelector(".form-container");
let showbtn = document.querySelector("#func_show_add_product");

showbtn.addEventListener('click', function () {
    hidden_form.style.display = "block"; // Correctly set the display property
    hidden_form.scrollIntoView({ behavior: "smooth" }); // Scroll to the form

    
});




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
                location.reload()
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



fetch("../users.json").then((user)=>{
    console.log(user)
    let myData = user.json()
    console.log(myData)
    return myData;
}).then((myData)=>{
    const tableBody = document.querySelector("#users-table tbody");
    tableBody.innerHTML = "";
    myData.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.banned}</td>
            <td>
                <button class = 'btn_del' onclick="deleteUser(${user.id})">Delete</button>
                <button class = 'btn_edit' onclick="editUser(${user.id})">Edit</button>
            </td>
        `;


        // btn_del = document.querySelector('.btn_del');
        // btn_edit = document.querySelector('.btn_edit')

        // if (user.username == 'admin' && user.role == 'admin'){
        //     btn_del.style.display = "none"
        //     btn_edit.style.display = "none"

        // }


        tableBody.appendChild(row);
        let rowOfstat = document.querySelector('#statOfuser')
        // console.log(product.lenght)
        rowOfstat.innerHTML =`<td>${myData.length}</td>`
    });
})



let hidden_form2 = document.querySelector("#registrationForm");
let showbtn2 = document.querySelector("#func_show_add_user");

showbtn2.addEventListener('click', function () {
    hidden_form2.style.display = "block"; // Correctly set the display property
    hidden_form2.scrollIntoView({ behavior: "smooth" }); // Scroll to the form

    
});

const file = './register.js';

import(file)
  .then((module) => {
    console.log(`Loaded module from ${file}`, module);
  })
  .catch((error) => {
    console.error(`Failed to load module from ${file}:`, error);
  });
