const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the "css", "java script", and "E-commerce" root directory
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/java-script', express.static(path.join(__dirname, 'java script')));

// Serve the root html files directly from the "E-commerce" folder
app.use(express.static(path.join(__dirname)));  // Serve static files from root folder

// Serve specific HTML pages (check the file paths)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));  // Serving home.html from the root folder
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'login.html'));  // Serve login.html from html folder
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'register.html'));  // Serve register.html from html folder
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'product-details.html'));  // Serve product-details.html from html folder
});

// Handle POST request for user registration
app.post('/register', (req, res) => {
    const userData = req.body;

    // Read existing users from users.json
    const usersFilePath = path.join(__dirname, 'users.json');
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while reading users data.' });
        }

        let users = [];
        if (data) {
            users = JSON.parse(data);
        }

        // Add new user to the list
        users.push(userData);

        // Write the updated data to users.json
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'An error occurred while saving user data.' });
            }
            res.status(200).json({ message: 'User registered successfully!' });
        });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
