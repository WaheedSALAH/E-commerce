const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/java-script', express.static(path.join(__dirname, 'java script')));
app.use(express.static(path.join(__dirname)));

// Routes for HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'html', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'html', 'register.html')));
app.get('/product-details', (req, res) => res.sendFile(path.join(__dirname, 'html', 'product-details.html')));
app.get('/seller-dashboard', (req, res) => res.sendFile(path.join(__dirname, 'html', 'seller-dashboard.html')));

// Handle POST request for user registration
app.post('/register', (req, res) => {
    const userData = req.body;
    const usersFilePath = path.join(__dirname, 'users.json');
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error reading users data.' });

        let users = [];
        if (data) users = JSON.parse(data);
        users.push(userData);

        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Error saving user data.' });
            res.status(200).json({ success: true, message: 'User registered successfully!' });
        });
    });
});

app.post('/seller-dashboard', (req, res) => {
    console.log("Received product data:", req.body); // Log incoming data

    const productsFilePath = path.join(__dirname, 'products.json');
    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ error: 'Error reading product data.' });
        }

        let products = [];
        if (data) products = JSON.parse(data);

        const newProduct = { id: Date.now(), ...req.body };
        products.push(newProduct);

        fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return res.status(500).json({ error: 'Error saving product data.' });
            }
            console.log("Product added successfully:", newProduct);
            res.status(200).json({ success: true, message: 'Product added successfully!', product: newProduct });
        });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
