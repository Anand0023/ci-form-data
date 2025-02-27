const express = require('express');
const app = express();
const path = require('path');
require('./db/conn');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const Register = require('./models/registers');
const { log } = require('console');

const static_path = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views' , template_path);
hbs.registerPartials(partials_path);

app.get('/', (req, res) => res.render('index'));

app.get('/register' ,(req , res)=>{
    res.render('register');
})

app.post('/register' , async(req , res)=>{

    try {
        
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;

        if(password === cpassword){

            const registerEmployee = new Register({
                fullname : req.body.fullname,
                email : req.body.email,
                phone : req.body.phone,
                gender : req.body.gender,
                password : req.body.password,
                confirmPassword : req.body.confirmPassword,
            })

                const registered = await registerEmployee.save();
                res.status(201).render('index')

        }else{
            res.send("Please Enter The Correct Password");
        }

    }
     catch (error) {
      res.status(400).send(error);  
    }
    
})

app.listen(port, () => console.log(`This is live on port number ${port}!`));
