const express = require("express");
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const session = require('express-session');
const sequelize = require('./config/sequelize'); // Import the configured Sequelize instance
// const {logintest,users} = require('./models');
const logintest = require('./models/loginTest');
const users = require('./models/users');

const port = 3000;
// const logintest=require('./models/loginTest');

app.use(bodyParser.json());

sequelize
    .authenticate()
    .then(() => {
        console.log(
            "Connection to the database has been established successfully."
        );
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

app.use(
    session({
        secret: "cadorim",
        resave: false,
        saveUninitialized: false,
    })
);

// todo add varible session
// req.session.isAdmin = true;
//   req.session.save();

// todo: session distroy
// req.session.destroy(err => {
//     if (err) {
//         console.log(err)
//     } else {
//         res.redirect('/')
//     }
//     })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");

app.get("/totrans", (req, res) => {
    res.render("trans");
});

app.get('/tologintest', (req, res) => {
    res.render('AddUsers')
});
app.post('/addlogintest', async (req, res) => {
    try {

        const { email, password, reponse, repExcepte } = req.body; // Assuming the data is sent in the request body
        const createdLogin = await logintest.create({ email, password, reponse, repExcepte });
        res.status(201).json(createdLogin);
        console.log("insterted");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get("/test", (req, res) => {
    if (req.session.isonline) {
        const depots = req.query.depots;
        const retraits = req.query.retraits;
        const transs = req.query.transs;
        const logins = req.query.logins;
        // transs
        // logins
        res.render("test", {
            token: req.session.token,
            password: req.session.password,
            depots: depots,
            retraits: retraits,
            transs: transs,
            logins: logins,
        });
    } else {
        res.redirect("/login");
    }
});
app.post("/trans", (req, res) => {
    // mehaxios.get('http://localhost:3000/api/some-protected-endpoint', {
    //   headers: { Authorization: `Bearer ${token}` }
    // })

    //{ success: true, msg: 'transfer is done' }

    const bod = {
        tel_bf: req.body.tel_bf,
        password: req.session.password,
        montant: req.body.montant,
    };

    // console.log(req.body)
    // console.log(config)
    // 'https://devmauripay.cadorim.com/api/mobile/private/transfert
    axios
        .post("https://devmauripay.cadorim.com/api/mobile/private/transfert", bod, {
            headers: { Authorization: `Bearer ${req.session.token}` },
        })
        .then((response) => {
            // console.log(response.data);
            res.redirect(`/test?transs=${encodeURIComponent(response.data)}`);
        })
        .catch((error) => {
            console.error(error);
            res.redirect("/test");
        });
});

app.post("/login", (req, res) => {
    console.log(req.body);
    axios
        .post("https://devmauripay.cadorim.com/api/mobile/login", req.body)
        .then((response) => {
            // console.log(response.data);
            if (response.data.success) {
                req.session.isonline = true;
                req.session.token = response.data.token;
                req.session.password = req.body.password;
                req.session.save();
                //console.log("the token",response.data.token);
                res.redirect(`/test?logins=${encodeURIComponent(response.data)}`);
            } else {
                res.json({ message: "Login failed" });
            }
        })
        .catch((error) => {
            console.error(error);
        });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/add", (req, res) => {
    res.render("signup");
});

app.post("/addc", (req, res) => {
    console.log(req.body);
    axios
        .post("https://devmauripay.cadorim.com/api/mobile/add", req.body)
        .then((response) => {
            console.log(response.data);
            if (response.data.success) {
                res.json({ message: "Login successful", mag: response.data.mag });
            } else {
                res.json({ message: "Login failed" });
            }

            // res.redirect('/index');
        })
        .catch((error) => {
            console.error(error);
            res.redirect("/login");
        });
});

app.get("/depotpage", (req, res) => {
    res.render("depot");
});

app.post("/depot", (req, res) => {
    //{ success: true, msg: 'deposit is done', montant: 5 }

    const bod = {
        code: req.body.code,
        password: req.session.password,
    };

    // console.log(req.body)
    // console.log(config)
    //         'https://devmauripay.cadorim.com/api/mobile/private/transfert
    axios
        .post("https://devmauripay.cadorim.com/api/mobile/private/depot", bod, {
            headers: { Authorization: `Bearer ${req.session.token}` },
        })
        .then((response) => {
            console.log(response.data);
            res.redirect(`/test?depots=${encodeURIComponent(response.data)}`);
        })
        .catch((error) => {
            console.error(error);
            res.redirect("/test");
        });
});
app.get("toretrait", (req, res) => {
    res.render("retrait");
});
app.post("/retrait", (req, res) => {
    //{ success: true, msg: 'deposit is done', montant: 5 }

    const data = {
        code: req.body.code,
        password: req.session.password,
    };

    axios
        .post("https://devmauripay.cadorim.com/api/mobile/private/retrait", data, {
            headers: { Authorization: `Bearer ${req.session.token}` },
        })
        .then((response) => {
            console.log(response.data);
            res.redirect(`/test?retraits=${encodeURIComponent(response.data)}`);
        })
        .catch((error) => {
            console.error(error);
            res.redirect("/test");
        });
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/login");
        }
    });
});

// req.session.destroy(err => {
//     if (err) {
//         console.log(err)
//     } else {
//         res.redirect('/')
//     }
//     })

function log(va) {
    return axios.post("https://devmauripay.cadorim.com/api/mobile/login", va)
        .then(response => response)
        .catch(error => {
            // console.error(error);
            console.log("fuck");
        });
    // return { "email": "1234567", "password": "3456" };
}


app.get('/data', async (req, res) => {
    try {
        const usersData = await users.findAll({
            // attributes: ['email', 'password'], // Specify the columns to include in the result
        });

        const userArray = usersData.map(user => ({
            email: user.email,
            password: user.password,
        }));

        const response = { userArray };
        res.json(response);
        // return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/sequelize');
// const Logintests = require('../models/Logintests');

app.get('/all', async (req, res) => {
    try {
        const response2 = await axios.get('http://localhost:3000/data');
        const data = response2.data.userArray;

        const results = [];

        for (const user of data) {
            const response = await log(user);
            console.log(response.status)
            if(response.status === user.expected) {
                
                

            }
            else{
            
            }
            
            logintest.update(updatedValues, {
                where: { id: recordId }
            })
            // const result = {
            //     email: user.email,
            //     password: user.password,
            //     reponse: JSON.stringify(response),
            //     repExcepte: 'ok'
            // };

            // results.push(result);
        }

        const createdUsers = await logintest.bulkCreate(results);
        console.log('New users added:', createdUsers);

        res.json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
