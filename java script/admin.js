let products = [
    { id: 1, name: "Product A", price: 100 },
    { id: 2, name: "Product B", price: 200 }
];






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
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.product_name}</td>
            <td>${product.price} $</td>

            <td class = "${product.id}">
                <button onclick="deleteUser(${product.id})">Delete</button>
                <button onclick="editUser(${product.id})">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
})





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
                <button onclick="deleteUser(${user.id})">Delete</button>
                <button onclick="editUser(${user.id})">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
})


function deleteUser(id) {
    users = users.filter(user => user.id !== id);
    renderUsers();
}

function editUser(id) {
    const user = myData.find(user => user.id === id);
    const newName = prompt("Enter new name:", user.name);
    const newEmail = prompt("Enter new email:", user.email);
    if (newName && newEmail) {
        user.name = newName;
        user.email = newEmail;
        renderUsers();
    }
}


// function deleteProduct(id) {
//     products = products.filter(product => product.id !== id);
//     renderProducts();
// }

// // Functions to render data
// function renderProducts() {
    //     const tableBody = document.querySelector("#products-table tbody");
    //     tableBody.innerHTML = "";
    //     products.forEach(product => {
        //         const row = document.createElement("tr");
        //         row.innerHTML = `
        //             <td>${product.id}</td>
        //             <td>${product.name}</td>
        //             <td>${product.price}</td>
        //             <td>
        //                 <button onclick="deleteProduct(${product.id})">Delete</button>
        //             </td>
        //         `;
        //         tableBody.appendChild(row);
        //     });
        // }
        
        
        
        
// document.querySelector("#add-product-form").addEventListener("submit", (e) => {
//     e.preventDefault();
//     const name = document.querySelector("#product-name").value;
//     const price = parseFloat(document.querySelector("#product-price").value);
//     const id = products.length ? products[products.length - 1].id + 1 : 1;
//     products.push({ id, name, price });
//     renderProducts();
//     e.target.reset();
// });

// document.querySelector("#add-user-form").addEventListener("submit", (e) => {
    //     e.preventDefault();
    //     const name = document.querySelector("#user-name").value;
    //     const email = document.querySelector("#user-email").value;
    //     const id = users.length ? users[users.length - 1].id + 1 : 1;
    //     users.push({ id, name, email });
    //     renderUsers();
    //     e.target.reset();
    // });
    
    // // Initial rendering
    // renderProducts();
// renderUsers();