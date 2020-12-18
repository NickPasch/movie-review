// const { constants } = require('buffer');
const express = require('express');
const expressHand = require('express-handlebars');
// const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
// This is not required with a database
let users = []

var PORT = process.env.PORT || 3306;

app.engine('handlebars', expressHand({
    defaultLayout: 'main'
}));

app.use(express.urlencoded({extended:false}));


app.set('view engine', 'handlebars');

// app.set('views', path.join(__dirname, 'views/'));

app.get('/hello', (req, res) => {
    res.render('index', {name:"nick"})
});

app.get('/login', (req, res) => {
    res.render('login')
    console.log("hello")
});

app.post('/login', (req, res) => {
    
});

app.get('/register', (req, res) => {
    res.render('register');
    // console.log(users)
});


app.post('/register', async (req, res) => {
    console.log("posted")
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // This is not required with DB
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login');
        console.log("pushed")
    } catch{
        res.redirect('/register')
    }
    console.log(users)
});

app.listen(PORT, () => {
    console.log("running")
});
