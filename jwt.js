const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/login.html")
});
const Thirasak = '24681011';

app.get('/home', (req, res) => {
    if(!req.cookies.Thirasak) return res.redirect('/error')

    jwt.verify(req.cookies.Thirasak, Thirasak, (err, result) => {
        if(err) {
            return res.redirect('/error')
        }
        res.sendFile(__dirname + "/data.html")
    })
});

app.get('/error', (req, res) => {
    res.sendFile(__dirname + "/error.html")
});

app.post('/login', (req, res) => {
    if(req.body.user == "Thirasak" && req.body.pass == Thirasak){
        try {
            const token = jwt.sign({username: "admin"}, Thirasak)
            res.cookie('Thirasak', token)
            res.redirect('/home')

        } catch(error){
        
        res.redirect('/')
            
        }
        
    }
    else {
        
        res.redirect('/')
    }
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});