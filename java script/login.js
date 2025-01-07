document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Fetch user data from JSON file
    const response = await fetch("../users.json");
    const users = await response.json();
    
    // console.log(users)
    // console.log(response)

    // Authenticate user
    const user = users.find((u) => u.username === username && u.password === password);

    const messageDiv = document.getElementById("message");

    if (user) {


        // Redirect
        if (user.role === "admin") {
            window.location.href = "admin-dashboard.html";
        } else if (user.role === "customer") {
            window.location.href = "../home.html";
        }
        else if(user.panned === true){
            messageDiv.innerHTML = `<p style="color: red;">you are panned.</p>`;

        }
        
        else if (user.role === "seller") {
            window.location.href = "seller-dashboard.html";
        
        }


    } else {
        messageDiv.innerHTML = `<p style="color: red;">Invalid username or password.</p>`;
    }
});
