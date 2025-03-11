const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('./db/conn');
const hbs = require('hbs');
const mongoose = require("mongoose");
const port = process.env.PORT || 3001;
const Register = require('./models/registers');

const static_path = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);

app.get('/', (req, res) => res.render('index'));

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;

        if (password === cpassword) {
            const registerEmployee = new Register({
                fullname: req.body.fullname,
                email: req.body.email,
                phone: req.body.phone,
                option: req.body.option,
                message: req.body.message,
            });

            await registerEmployee.save();
            res.status(201).render('index');
        } else {
            res.send("Please Enter The Correct Password");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/registers', async (req, res) => {
    try {
        const users = await Register.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.delete('/api/registers/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const deletedUser = await Register.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Deletion Error:", error);
        res.status(500).json({ error: "Failed to delete user" });
    }
});

app.listen(port, () => console.log("This is live on port number ${port}!"))