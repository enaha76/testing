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
    
   
    
    axios.post('https://web/api/sub', requestBody)
    .then(response => {
        console.log(response.data);
        res.redirect('/index')
    })
    .catch(error => {
        console.error(error);
    });
    
})


app.get('/totrans',(req,res)=>{
    res.render('trans')

});
app.post('/trans',(req,res)=>{
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAzMSwidHlwZSI6ImNsaWVudCIsIm9yaWdpbiI6Im1vYmlsZSIsImlhdCI6MTY4NDg0ODY1OCwiZXhwIjoxNjg1NDQ4NjU4fQ.L9xci2to-rX8GZpLyeM7GTdPet4HmWGppHyEFZjtY3A";
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    // console.log(req.body)
    // console.log(config)
    axios.post('https://devmauripay.cadorim.com/api/mobile/transfert', req.body,config)
    .then(response => {
        console.log(response.data);
        res.redirect('/index');
    })
    .catch(error => {
        console.error(error);
        res.redirect('/index');
    });
});

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

  // Start the server after connecting to the database
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


