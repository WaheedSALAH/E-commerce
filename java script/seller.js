document.addEventListener("DOMContentLoaded", function () {
    let user_role = localStorage.getItem("user_role");

    if (user_role !== "seller") {
        window.location.href = "login.html"; 
    } 
    // else {
    //     console.log("Admin user is logged in: " + user_name);
    // }
});

let show_prod = document.querySelector("#prod")
let hidden_prod = document.querySelector("#products-section")

show_prod.addEventListener('click', function () {
    hidden_prod.style.display = "block";   
    
});

let go_to_add = document.querySelector('#func_show_add_product')
go_to_add.addEventListener('click', function () {
    location.href ="../html/add_prod_for_seller.html"

});

// location.href ="../html/add_prod_for_seller.html"

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
            if (product.img_url.startsWith("images/")) {

                count1 +=1;
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.product_name}</td>
                    <td>${product.price} $</td>
                    <td>${product.product_permition}</td>
                    <td>${product.stock}</td>
                    <td class = "img_prod"><img src="../${product.img_url}" alt=""></td>
                    <td>
                        <button class="btn_del" onclick="deleteProduct(${product.id})">Delete</button>
                        <button class="btn_edit" onclick="editProduct(${product.id})">Edit</button>
                    </td>
                `;
                tableBody.prepend(row);
            }
            else{
                count1 +=1;
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.product_name}</td>
                    <td>${product.price} $</td>
                    <td>${product.product_permition}</td>
                    <td>${product.stock}</td>
                    <td class = "img_prod"><img src="${product.img_url}" alt=""></td>
                    <td>
                        <button class="btn_del" onclick="deleteProduct(${product.id})">Delete</button>
                        <button class="btn_edit" onclick="editProduct(${product.id})">Edit</button>
                    </td>
                `;
                tableBody.prepend(row);
            }


        let rowOfstat = document.querySelector('#statOfprod')
        rowOfstat.innerHTML =`<td>${count1}</td>` //<<<<<<<<<<<<<< دا اللى بحط فيه عدد المتجات 
        }
      
    });
})

// let statOforder = document.querySelector('#statOforder')
// statOforder.innerHTML =`<td>${product.product_permition.length}</td>` //<<<<<<<<<<<<<< دا اللى هحط فيه عدد المتجات المطلوبة


let user_name = localStorage.getItem("user_name");

let header = document.querySelector(".header")

let userNameElement = document.createElement("h1");

userNameElement.textContent = `Welcome, ${user_name}! you act as seller `;

header.prepend(userNameElement);

// let logout = document.getElementById('logoutFROMseller');
// logout.addEventListener('click',function(){
//     localStorage.clear();
// })




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
                document.getElementById("Product_stock").value = product.stock;
                document.getElementById("productImageLink").value = product.img_url;
                document.getElementById("productImageLink2").value = product.img_url2;
                document.getElementById("productImageLink3").value = product.img_url3;
                document.getElementById("productImageLink4").value = product.img_url4;

                // Modify form submission to handle edit
                document.getElementById("editProductForm").onsubmit = function (e) {
                    e.preventDefault();
                    
                    // Prepare the updated fields only
                    const updatedFields = {};
                    const newName = document.getElementById("productName").value;
                    const newDescription = document.getElementById("productDescription").value;
                    const newPrice = document.getElementById("productPrice").value;
                    const newStock = document.getElementById("Product_stock").value;
                    const newImgUrl = document.getElementById("productImageLink").value;
                    const newImgUrl2 = document.getElementById("productImageLink2").value;
                    const newImgUrl3 = document.getElementById("productImageLink3").value;
                    const newImgUrl4 = document.getElementById("productImageLink4").value;

                    if (newName !== product.product_name) updatedFields.product_name = newName;
                    if (newDescription !== product.description) updatedFields.description = newDescription;
                    if (parseFloat(newPrice) !== product.price) updatedFields.price = parseFloat(newPrice);
                    if (newStock !== product.stock) updatedFields.stock = newStock;
                    if (newImgUrl !== product.img_url) updatedFields.img_url = newImgUrl;
                    if (newImgUrl2 !== product.img_url2) updatedFields.img_url2 = newImgUrl2;
                    if (newImgUrl3 !== product.img_url3) updatedFields.img_url3 = newImgUrl3;
                    if (newImgUrl4 !== product.img_url4) updatedFields.img_url4 = newImgUrl4;

                    let confirmation = confirm("Are you sure you want to update the product?");
                    if (!confirmation) return;

                    fetch(`/seller/edit-product/${id}`, {
                        method: 'PATCH', // Use PATCH for partial updates
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedFields),
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
        })
        .catch(error => {
            console.error("Error fetching products:", error);
            alert("An error occurred while fetching the product details.");
        });
}

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