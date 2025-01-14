//////////////////////////////////////////////////////عشااااااااااان اعرض المنتجات \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
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
        if(product.publisher == 'admin')product.product_permition = 'by admin'
        if(product.publisher == 'seller')product.product_permition = 'by seller'
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.product_name}</td>
            <td>${product.price} $</td>
            <td>${product.product_permition}</td>

            <td>
                <button id ='${product.id}'>Delete</button>
                <button class ='${product.id}'>Edit</button>
            </td>
        `;
        console.log(product.id)
        let id = document.getElementById(`${product.id}`)
        console.log(id)
        // console.log(document.getElementById('${product.id}'))
        tableBody.appendChild(row);
        let rowOfstat = document.querySelector('#statOfprod')
        rowOfstat.innerHTML =`<td>${myData.length}</td>` //<<<<<<<<<<<<<< دا اللى بحط فيه عدد المتجات 
    });
})
/////////////////////////////////////////////////////////^^^^^^^^^^^^^^^^^^^^^^^^\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\




////////////////////////////////////////////////////////زراير الظهور والاخفاء والانتقال\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
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

let hidden_form2 = document.querySelector("#registrationForm");
let showbtn2 = document.querySelector("#func_show_add_user");

showbtn2.addEventListener('click', function () {
    hidden_form2.style.display = "block"; 
    hidden_form2.scrollIntoView({ behavior: "smooth" }); 

    
});

/////////////////////////////////////////////////////////^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//////////////////////////////////////////////////////// عشان اضيف المنتج من خلال الادمن \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

document.getElementById("addProductForm").addEventListener("submit", function (e) {
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

///////////////////////////////////////////////////////////////^^^^^^^^^^^^^^^^^^^^^^^^^\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\




////////////////////////////////////////////////////////////// عشان اعرض اليوزرس\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
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
            <td>${user.role}</td>
            <td>
                <button class = 'btn_del' onclick="deleteUser(${user.id})">Delete</button>
                <button class = 'btn_edit' onclick="editUser(${user.id})">Edit</button>
            </td>
        `;


        tableBody.appendChild(row);
        let rowOfstat = document.querySelector('#statOfuser')
        rowOfstat.innerHTML =`<td>${myData.length}</td>` // <<<<<<<<<<<<<<<<<<< دا اللى بحط فيه عدد اليوزرس

    });
})


///////////////////////////////////////////////////////////^^^^^^^^^^^^^^^^^^^^^\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



/////////////////////////////////////// هنا كسلت واستدعيت ملف الريجيستر بتاع اليوزر وحطيته عندمن \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const file = './register.js';

import(file)
  .then((module) => {
    console.log(`Loaded module from ${file}`, module);
  })
  .catch((error) => {
    console.error(`Failed to load module from ${file}:`, error);
  });
////////////////////////////////////////////////////////^^^^^^^^^^^^^^^^^^^^^^^^^^^\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\