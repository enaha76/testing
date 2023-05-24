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
// mehaxios.get('http://localhost:3000/api/some-protected-endpoint', {
    //   headers: { Authorization: `Bearer ${token}` }
    // })

    //{ success: true, msg: 'transfer is done' }   
    
    const bod = {
        tel_bf:req.body.tel_bf,
        password :req.body.password,
        montant:req.body.montant
    }

    // console.log(req.body)
    // console.log(config)
    //         'https://devmauripay.cadorim.com/api/mobile/private/transfert
    axios.post('https://devmauripay.cadorim.com/api/mobile/private/transfert', bod,
    {
        headers: { Authorization: `Bearer ${req.body.token}` }
    }
    )
    .then(response => {
        console.log(response.data);
        res.redirect('/index');
    })
    .catch(error => {
        console.error(error);
        res.redirect('/index');
    });
});

app.post('/login',(req, res) => {

    console.log(req.body)
    axios.post('https://devmauripay.cadorim.com/api/mobile/login', req.body)
    .then(response => {


        // console.log(response.data);
        // if (response.data.success) {
        //     res.json({ message: "Login successful" });
        // } else {
        //     res.json({ message: "Login failed" });
        // }
        // console.log("the token",response.data.token);
        res.render('depot',{token : response.data.token});
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
        if (response.data.success) {
            res.json({ message: "Login successful",mag:response.data.mag });
        } else {
            res.json({ message: "Login failed" });
        }

        // res.redirect('/index');
    })
    .catch(error => {
        console.error(error);
        res.redirect('/index');
    });


})


app.get('/depotpage',(req,res)=>{
    res.render('depot')
});

app.post('/depot',(req,res)=>{
    //{ success: true, msg: 'deposit is done', montant: 5 } 
    
    const bod = {
        code:req.body.code,
        password :req.body.password,
    }

    // console.log(req.body)
    // console.log(config)
    //         'https://devmauripay.cadorim.com/api/mobile/private/transfert
    axios.post('https://devmauripay.cadorim.com/api/mobile/private/depot', bod,
    {
        headers: { Authorization: `Bearer ${req.body.token}` }
    }
    )
    .then(response => {
        console.log(response.data);
        res.redirect('/index');
    })
    .catch(error => {
        console.error(error);
        res.redirect('/index');
    });
    
    
    
    
    
});


  // Start the server after connecting to the database
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


