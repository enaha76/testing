const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const port = 3000;



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');



app.get('/aff',(req, res) => {
    const requestBody = {
        "email":41234567,
        "password":"1234"
    }
    
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    
    axios.post('https://web/api/sub', requestBody)
    .then(response => {
        console.log(response.data);
        res.redirect('/index')
    })
    .catch(error => {
        console.error(error);
    });
    
})


app.post('/uploude',(req, res) => {

    console.log(req.body)
    axios.post('https://devmauripay.cadorim.com/api/mobile/login', req.body)
    .then(response => {
        console.log(response.data);
        res.redirect('/index');
    })
    .catch(error => {
        console.error(error);
    });
})

app.get('/index',(req, res) => {
    res.render('index')
})



app.get('/add',(req, res) => {
    res.render('sighup')
})


app.post('/addc',(req, res) => {
    console.log(req.body)
    axios.post('https://devmauripay.cadorim.com/api/mobile/add', req.body)
    .then(response => {
        console.log(response.data);
        res.redirect('/index');
    })
    .catch(error => {
        console.error(error);
    });


})

  // Start the server after connecting to the database
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


