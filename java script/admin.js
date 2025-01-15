// location.reload()
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




// let hidden_form = document.querySelector("#addProductForm");
let showbtn = document.querySelector("#func_show_add_product");

showbtn.addEventListener('click', function () {
    // hidden_form.style.display = "block"; // Correctly set the display property
    // hidden_form.scrollIntoView({ behavior: "smooth" }); // Scroll to the form
    location.href ='../html/add_prod_for_admin.htm'

    
});

// let hidden_form2 = document.querySelector("#registrationForm");
let showbtn2 = document.querySelector("#func_show_add_user");

showbtn2.addEventListener('click', function () {

    location.href ='../html/add_user_for_admin.htm'

    // hidden_form2.style.display = "block"; 
    // hidden_form2.scrollIntoView({ behavior: "smooth" }); 

    
});

/////////////////////////////////////////////////////////^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\





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
                <button class = 'btn_user_edit' onclick="editUser(${user.id})">Edit</button>
            </td>
        `;


        tableBody.appendChild(row);
        let rowOfstat = document.querySelector('#statOfuser')
        rowOfstat.innerHTML =`<td>${myData.length}</td>` // <<<<<<<<<<<<<<<<<<< دا اللى بحط فيه عدد اليوزرس

    });
})


///////////////////////////////////////////////////////////^^^^^^^^^^^^^^^^^^^^^\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

////////////////////////////////////////////////////// عشااااااااااان اعرض المنتجات \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
fetch("../products.json").then((product) => {
    console.log(product)
    let myData = product.json()
    console.log(myData)
    return myData;
}).then((myData) => {
    const tableBody = document.querySelector("#products-table tbody");
    tableBody.innerHTML = "";
    myData.forEach(product => {
        const row = document.createElement("tr");
        if (product.publisher == 'admin') product.product_permition = 'by admin'
        if (product.publisher == 'seller') product.product_permition = 'by seller'
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.product_name}</td>
            <td>${product.price} $</td>
            <td>${product.product_permition}</td>

            <td>
                <button class="btn_del" onclick="deleteProduct(${product.id})">Delete</button>
                <button class="btn_edit" onclick="editProduct(${product.id})">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    let rowOfstat = document.querySelector('#statOfprod');
    rowOfstat.innerHTML = `<td>${myData.length}</td>` //<<<<<<<<<<<<<< دا اللى بحط فيه عدد المنتجات
});

////////////////////////////////////////////////////////////// Edit Product
document.querySelector("#products-table tbody").addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("btn_edit")) {
        let hidden_form3 = document.querySelector('#editProductForm');
        hidden_form3.style.display = "block";
        hidden_form3.scrollIntoView({ behavior: "smooth" });
    }
});


function editProduct(id) {
    // Fetch the product by id and populate the form
    fetch(`../products.json`)
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === id);
            if (product) {
                document.getElementById("productName").value = product.product_name;
                document.getElementById("productDescription").value = product.description;
                document.getElementById("productPrice").value = product.price;
                document.getElementById("productImageLink").value = product.img_url;
                document.getElementById("productImageLink2").value = product.img_url2;
                document.getElementById("productImageLink3").value = product.img_url3;
                document.getElementById("productImageLink4").value = product.img_url4;

                // Modify form submission to handle edit
                document.getElementById("editProductForm").onsubmit = function (e) {
                    e.preventDefault();
                    const updatedProduct = {
                        id: product.id, // Keep the same ID for the product
                        product_name: document.getElementById("productName").value,
                        description: document.getElementById("productDescription").value,
                        price: parseFloat(document.getElementById("productPrice").value),
                        img_url: document.getElementById("productImageLink").value,
                        img_url2: document.getElementById("productImageLink2").value,
                        img_url3: document.getElementById("productImageLink3").value,
                        img_url4: document.getElementById("productImageLink4").value
                    };
                    let confirmation = confirm("are u sure")
                    if(!confirmation)return;
                    fetch(`/admin/edit-product/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedProduct),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                alert("Product updated successfully!");
                                location.reload();
                            } else {
                                alert(data.error || "Failed to update product.");
                            }
                        })
                        .catch(error => {
                            console.error("Error:", error);
                            alert("An error occurred while updating the product.");
                        });
                };
            }
        });
}

////////////////////////////////////////////////////////////// Delete Product
function deleteProduct(id) {
    let confirmation = confirm("are u sure")
    if(!confirmation)return;
    fetch(`/admin/delete-product/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Product deleted successfully!");
                location.reload();
            } else {
                alert(data.error || "Failed to delete product.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while deleting the product.");
        });
}
/////////////////////////////////////////////////////////// Delete User
function deleteUser(id) {
    let confirmation = confirm("are u sure")
    if(!confirmation)return;
    fetch(`/admin/delete-user/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("User deleted successfully!");
                location.reload();
            } else {
                alert(data.error || "Failed to delete user.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while deleting the user.");
        });
}

/////////////////////////////////////////////////////////// Edit User
document.querySelector("#users-table tbody").addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("btn_user_edit")) {
        let hidden_form3 = document.querySelector('#editForm');
        hidden_form3.style.display = "block";
        hidden_form3.scrollIntoView({ behavior: "smooth" });
    }
});

function editUser(id) {
    fetch(`../users.json`)
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.id === id);
            if (user) {
                document.getElementById("username").value = user.username;
                document.getElementById("email").value = user.email;
                document.getElementById("password").value = user.password;
                document.getElementById("role").value = user.role;
                document.getElementById("banned").value = user.banned;

                // Modify form submission to handle edit
                document.getElementById("editForm").onsubmit = function (e) {
                    
                    e.preventDefault();
                    const updatedUser = {
                        id: user.id, // Keep the same ID for the user
                        username: document.getElementById("username").value,
                        email: document.getElementById("email").value,
                        password: document.getElementById("password").value,
                        role: document.getElementById("role").value,
                        banned: document.getElementById("banned").value
                    };
                     let confirmation = confirm("are u sure")
                    if(!confirmation)return;
                    fetch(`/admin/edit-user/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedUser),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                alert("User updated successfully!");
                                location.reload();
                            } else {
                                alert(data.error || "Failed to update user.");
                            }
                        })
                        .catch(error => {
                            console.error("Error:", error);
                            alert("An error occurred while updating the user.");
                        });
                };
            }
        });
}


/////////////////////////////////////// هنا كسلت واستدعيت ملف الريجيستر بتاع اليوزر وحطيته عندمن \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// const file = './register.js';

// import(file)
//   .then((module) => {
//     console.log(`Loaded module from ${file}`, module);
//   })
//   .catch((error) => {
//     console.error(`Failed to load module from ${file}:`, error);
//   });
////////////////////////////////////////////////////////^^^^^^^^^^^^^^^^^^^^^^^^^^^\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\