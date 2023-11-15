// ------------------------------Module Importation----------------------------------------//
// import express module
const express = require("express");

// import body-parser module
const bodyParser = require("body-parser");

//Import multer module
const multer = require("multer");

//Import path module
const path = require('path');

// import mongoose module
const mongoose = require("mongoose");

// import bcrypt module
const bcrypt = require("bcrypt");

// import axios module
const axios = require("axios");

// import request module
const request = require("request");
// 
const { ObjectId } = require("mongodb");

// connect APP to DB (sportVenus)
mongoose.connect('mongodb://127.0.0.1:27017/sportVenusDB');

// ------------------------------Express Application----------------------------------------//

// Create express apllication 
const app = express();
// ------------------------------Model Importation----------------------------------------//
const Match = require("./models/match");
const Team = require("./models/team");
const Player = require("./models/player");
const Stadium = require("./models/stadium");
const User = require("./models/user");
const Client = require("./models/validation");
const Comment = require("./models/comment");

// send JSON responses
app.use(bodyParser.json())
// Get object from request 
app.use(bodyParser.urlencoded({ extended: true }));
// Creation de raccoursie au lieu de backend/images le shortcut /images
// configauration path
app.use('/images', express.static(path.join('backend/images')))

const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        // date.now()=> time stamp  unique img name
        cb(null, imgName);
    }
});

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // * tous les FE(react/angular) origin des requests reusable
    //http://localhost:3000 if you want only one server

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

// DB Simulation

// ------------------------------Business Logic----------------------------------------//

//          _____________________________User___________________________
//Business Logic : Get All Users
app.get("/users", (req, res) => {
    console.log("here into BL:Get All Users");
    User.find().then(
        (docs) => {
            console.log("Here is docs", docs);
            res.json({ users: docs });
        });
});
//Business Logic : Signup
app.post("/users/signup", multer({ storage: storageConfig }).single('img'), (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    console.log("here is image name", req.file);
    console.log("Here into BL:Signup");
    bcrypt.hash(req.body.pwd, 8).then(
        (cryptedPwd) => {
            console.log("Here is Pwd crypted", cryptedPwd);
            let user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                pwd: cryptedPwd,
                gender: req.body.gender,
                role: req.body.role,
                avatar: url + '/images/' + req.file.filename
            });
            user.save(
                (err, doc) => {
                    console.log("Here error", err);
                    console.log("Here doc", doc);
                    if (err) {
                        if (err.errors.email) {
                            res.json({ message: "Email exist", emailExist: true });
                        }
                    } else {
                        res.json({ message: "User added with success" });
                    }
                });
        });
});
//Business Logic : Login
app.post("/users/login", (req, res) => {
    console.log("here into BL:login", req.body);
    let user;
    User.findOne({ email: req.body.email }).then(
        (doc) => {
            if (!doc) {
                res.json({ message: "0" });
            }
            user = doc;
            return bcrypt.compare(req.body.pwd, doc.pwd);
        }).then(
            (response) => {
                if (!response) {
                    res.json({ message: "1" });
                } else {
                    let userToSend = { fName: user.firstName, lName: user.lastName, id: user._id, role: user.role }
                    res.json({ message: "2", user: userToSend });
                }
            }
        )
});
//Business Logic:Edit User
app.put("/users", (req, res) => {
    console.log("here into BL:Edit User", req.body);
    // bcrypt.hash(req.body.pwd, 8).then(
    //     (cryptedPwd) => {
    //         console.log("Here is Pwd crypted", cryptedPwd);

    //         let user =req.body;
    //         user.pwd=cryptedPwd;
    //         User.updateOne({ _id: user._id }, user).then(
    //             (response) => {
    //                 console.log('here is res',response);
    //                 if (response.modifiedCount == 1) {
    //                     res.json({ message: "User is edited with success" });
    //                 } else {
    //                     res.json({ message: "Error" });
    //                 }
    //             });
    //     });

});
//Business Logic:Get User By Id
app.get("/users/:id", (req, res) => {
    let id = req.params.id;
    console.log("here into BL:Get User By Id", id);
    User.findOne({ _id: id }).then(
        (doc) => {
            doc ? res.json({ user: doc }) : res.json({ message: "User does not exist" });
        });
});
// Business Logic : Delete User
app.delete("/users/:id", (req, res) => {
    let id = req.params.id;
    console.log("Here into BL:Delete id", id);
    User.deleteOne({ _id: id }).then(
        (response) => {
            if (response.deletedCount == 1) {
                res.json({ isDeleted: true });
            } else {
                res.json({ isDeleted: false });
            }
        });
});
//          _____________________________Match____________________________
//Business Logic : Get All Matches
app.get("/matches", (req, res) => {
    console.log("here into BL:Get All Matches");
    Match.find().then((docs) => {
        res.json({ matches: docs });
    });
});

//Business Logic : Add Match
app.post("/matches", (req, res) => {
    let match = new Match({
        scoreOne: req.body.scoreOne,
        scoreTwo: req.body.scoreTwo,
        teamOne: req.body.teamOne,
        teamTwo: req.body.teamTwo
    });
    match.save(
        (err, doc) => {
            if (doc) {
                res.json({ message: "match added with success" });
            } else {
                res.json({ message: "Error" });
            }
        });
});

//Business Logic:Edit Match
app.put("/matches", (req, res) => {
    console.log("here into BL:Edit Match", req.body);
    Match.updateOne({ _id: req.body._id }, req.body).then(
        (response) => {
            if (response.modifiedCount == 1) {
                res.json({ message: "match is edited with success" });
            } else {
                res.json({ message: "Error" });
            }
        });
});

//Business Logic:Get Match By Id
app.get("/matches/:id", (req, res) => {
    let id = req.params.id;
    console.log("here into BL:Get Match By Id", id);
    Match.findOne({ _id: id }).then(
        (doc) => {
            doc ? res.json({ match: doc }) : res.json({ message: "Match does not exist" });
        });
});

//Business Logic:Delete Match By Id
app.delete("/matches/:id", (req, res) => {
    let id = req.params.id;
    console.log("here into BL:Delete Match By Id", id);
    Match.deleteOne({ _id: id }).then(
        (response) => {
            if (response.deletedCount == 1) {
                res.json({ isDeleted: true });
            } else {
                res.json({ isDeleted: false });
            }
        });
});
//Business Logic:search Matches By scores
app.post("/matches/search", (req, res) => {
    let scores = req.body;

    console.log("here intobody BL:Delete Match By scoreOne", scores);
    Match.find({
        $or: [
            { scoreOne: scores.scoreOne },
            { scoreTwo: scores.scoreTwo },
            { scoreOne: scores.scoreOne + scores.scoreTwo },
            { scoreTwo: scores.scoreOne + scores.scoreTwo },
        ]
    }).then((docs) => {
        docs ? res.json({ matches: docs }) : res.json({ message: "Match does not exist" });
    });
});
// Business Logic : Delete Matches By Ids
app.post("/matches/delete", (req, res) => {
    console.log("here into BL : delete matches by Ids ", req.body);
    Match.deleteMany({ $or: req.body }).then(
        (response) => {
            console.log("here is response after delete", response);
            if (response.deletedCount == req.body.length) {
                res.json({ message: "All matches are deleted" });
            } else {
                res.json({ message: "One match at least is not  deleted" })
            }
        });
});

// Business Logic : Add Comment
app.post("/matches/comment", (req, res) => {
    console.log("here into BL : Add comment", req.body);
    let comment = new Comment({
        content: req.body.content,
        userId: ObjectId(req.body.userId),
        matchId: ObjectId(req.body.matchId),
    });
    comment.save(
        (err, doc) => {
            if (doc) {
                console.log("here doc", doc);
                res.json({ message: "Comment added with success" });
            } else {
                res.json({ message: "Error" });
            }
        });
});

// Business Logic to get all matches with comment
app.get("/matches/comments", (req, res) => {
    console.log("here intp Bl:get All Matches With Commments");
    Match.aggregate(
        [
            {
                $lookup: {
                    from: "comments", // collection to join "selon la collection"
                    localField: "_id", //field from the input documents
                    foreignField: "matchId", //field from the documents of the "from" collection
                    as: "comments", // output array field (je peut le changer) 
                },
            },
        ],
        (error, docs) => {
            res.status(200).json({
                matches: docs,
            });
        }
    );

})
//          ______________________________Team_____________________________
//Business Logic : Get All Teams
app.get("/teams", (req, res) => {
    console.log("here into BL:Get All teams");
    Team.find().then((docs) => {
        res.json({ teams: docs });
    });
});
//Business Logic : Add Team
app.post("/teams", (req, res) => {
    let team = new Team({
        name: req.body.name,
        stadium: req.body.stadium,
        owner: req.body.owner,
        foundation: req.body.foundation,
        image: "",
    });
    team.save(
        (err, doc) => {
            if (doc) {
                res.json({ message: "Team added with success" });
            } else {
                res.json({ message: "Error" });
            }
        });

});
//Business Logic:Edit Team
app.put("/teams", (req, res) => {
    console.log("here into BL:Edit Team", req.body);
    Team.updateOne({ _id: req.body._id }, req.body).then(
        (response) => {
            if (response.modifiedCount == 1) {
                res.json({ message: "Team is edited with success" });
            } else {
                res.json({ message: "Error" });
            }
        });
});

//Business Logic:Get Team By Id
app.get("/teams/:id", (req, res) => {
    let id = req.params.id;
    console.log("here into BL:Get team By Id", id);
    Team.findOne({ _id: id }).then(
        (doc) => {
            doc ? res.json({ team: doc }) : res.json({ message: "Team does not exist" });
        });
});
//Business Logic:Delete Team By Id
app.delete("/teams/:id", (req, res) => {
    let id = req.params.id;
    console.log("here into BL:Delete Team By Id", id);
    Team.deleteOne({ _id: id }).then(
        (response) => {
            if (response.deletedCount == 1) {
                res.json({ isDeleted: true });
            } else {
                res.json({ isDeleted: false });
            }
        });
});

//          _____________________________Player____________________________
//Business Logic : Get All Players
app.get("/players", (req, res) => {
    console.log("here into BL:Get All Players");
    Player.find().then((docs) => {
        res.json({ players: docs });
    });
});
//Business Logic : Add Player
app.post("/players", (req, res) => {
    let player = new Player({
        name: req.body.name,
        age: req.body.age,
        position: req.body.position,
        number: req.body.number,
    });
    player.save(
        (err, doc) => {
            if (doc) {
                res.json({ message: "Player added with success" });
            } else {
                res.json({ message: "Error" });
            }
        });
});
//Business Logic:Edit Player
app.put("/players", (req, res) => {
    console.log("here into BL:Edit Player", req.body);
    Player.updateOne({ _id: req.body._id }, req.body).then(
        (response) => {
            if (response.modifiedCount == 1) {
                res.json({ message: "Player is edited with success" });
            } else {
                res.json({ message: "Error" });
            }
        });
});

//Business Logic:Get Player By Id
app.get("/players/:id", (req, res) => {
    let id = req.params.id;
    console.log("here into BL:Get Player By Id", id);
    Player.findOne({ _id: id }).then(
        (doc) => {
            doc ? res.json({ player: doc }) : res.json({ message: "Player does not exist" });
        });
});
//Business Logic:Delete Player By Id
app.delete("/players/:id", (req, res) => {
    let id = req.params.id;
    console.log("here into BL:Delete Player By Id", id);
    Player.deleteOne({ _id: id }).then(
        (response) => {
            if (response.deletedCount == 1) {
                res.json({ isDeleted: true });
            } else {
                res.json({ isDeleted: false });
            }
        });
});
//          _____________________________Stadium___________________________
//Business Logic : Get All Stadiums
app.get("/stadiums", (req, res) => {
    console.log("here into BL:Get All stadiums");
    Stadium.find().then((docs) => {
        res.json({ stadiums: docs });
    });
});
//Business Logic : Add Stadium
app.post("/stadiums", (req, res) => {
    console.log("here into BL:Add Stadium", req.body);
    let stadium = new Stadium({
        name: req.body.name,
        capacity: req.body.capacity,
        country: req.body.country,
    });
    stadium.save(
        (err, doc) => {
            if (doc) {
                res.json({ message: "Stadium added with success" });
            } else {
                res.json({ message: "Error" });
            }
        });
});
//Business Logic:Edit Stadium
app.put("/stadiums", (req, res) => {
    console.log("here into BL:Edit Stadium", req.body);
    Stadium.updateOne({ _id: req.body._id }, req.body).then(
        (response) => {
            if (response.modifiedCount == 1) {
                res.json({ message: "Stadium is edited with success" });
            } else {
                res.json({ message: "Error" });
            }
        });
});

//Business Logic:Get Stadium by Id
app.get("/stadiums/:id", (req, res) => {
    let id = req.params.id;
    console.log("here into BL:Get Stadium By Id", id);
    Stadium.findOne({ _id: id }).then(
        (doc) => {
            doc ? res.json({ stadium: doc }) : res.json({ message: "Stadium does not exist" });
        });
});
//Business Logic:Delete Stadium By Id
app.delete("/stadiums/:id", (req, res) => {
    let id = req.params.id;
    console.log("here into BL:Delete Stadium By Id", id);
    Stadium.deleteOne({ _id: id }).then(
        (response) => {
            if (response.deletedCount == 1) {
                res.json({ isDeleted: true });
            } else {
                res.json({ isDeleted: false });
            }
        });
});

//          _____________________________Weather___________________________

//Business Logic : Search Weather
app.post("/weather", (req, res) => {
    console.log("here into BL:Search Weather", req.body);
    const city = req.body.city;
    const apiKey = "62ee756a34835483299877a61961cafb";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";

    axios.get(apiUrl).then(
        (response) => {
            console.log('Here response', response);
            const weather = Object.assign(response.data.main, response.data.wind);
            weather.iconUrl = "http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png"

            console.log('Here weather main', weather);
            const result = {
                temp: weather.temp,
                pressure: weather.pressure,
                humidity: weather.humidity,
                deg: weather.deg,
                speed: weather.speed,
                name: response.data.name,
                icon: weather.iconUrl
            }
            res.status(200).json({
                weather: result,
                message: "1"
            })
        }).catch((error) => {
            res.status(200).json({
                message: "0"
            });
        });
});
//          _____________________________API teams___________________________

//Business Logic : Search teams by country
app.post("/teams/country", (req, res) => {
    console.log("here into BL:Search teams", req.body);
    const country = req.body.city;
    const apiUrl = `https://v2.api-football.com/teams/search/${country}`;
    // const key = "ec740d6d1fd218516e95cf108f96db1d";
    axios.get(apiUrl, {
        headers: {
            'x-rapidapi-key': 'ec740d6d1fd218516e95cf108f96db1d'
            // ec740d6d1fd218516e95cf108f96db1d abd errahmen key
        }
    })
        .then(response => {
            console.log("here is response", response.data.api);
            res.json({ teams: response.data.api.teams });
        })
        .catch(error => {
            console.log(error);

        });
});

// var options = {
//     method: 'GET',
//     url: 'https://v3.football.api-sports.io/teams',
//     qs: { country: country },
//     headers: {
//         'x-rapidapi-host': 'v3.football.api-sports.io',
//         'x-rapidapi-key': key
//     }
// };

// request(options, function (error, response, body) {
//     if (error) throw new Error(error);

//     console.log(JSON.parse(body).response);

// });
// });

// ------------------------------validation----------------------------------------//

app.post("/validation/inscription", (req, res) => {
    console.log("here into BL:inscriptiion", req.body);

    let client = new Client({
        nom: req.body.nom,
        prenom: req.body.prenom,
        tel: req.body.tel,
        pwd: req.body.pwd,
    });
    client.save(
        (err, doc) => {
            if (err) {

                res.json({ message: "error" })

            } else {
                res.json({ message: "User added with success" });
            }
        });
});
//Business Logic : connexion
app.post("/validation/connexion", (req, res) => {
    console.log("here into BL:connexion", req.body);
    Client.findOne({ tel: req.body.tel, pwd: req.body.pwd }).then(
        (data) => {
            console.log("here into BL:data", data);
            if (data) {

                res.json({ user: data, message: "1" });
            }
            else {
                res.json({ message: "0" });
            }
        });
});

//Business Logic : Get All clients
app.get("/validation", (req, res) => {
    console.log("here into BL:Get All clients");
    Client.find().then(
        (docs) => {
            res.json({ users: docs });
        });
});

//Business Logic:Get User By Id
app.get("/validation/:id", (req, res) => {
    let id = req.params.id
    console.log("here into BL:Get Client", id);
    Client.findOne({ _id: id }).then(
        (doc) => {
            doc ? res.json({ user: doc }) : res.json({ message: "Client does not exist" });
        });
});
//Business Logic:Edit User
app.put("/validation", (req, res) => {
    console.log("here into BL:Edit User", req.body);

    Client.updateOne({ _id: req.body._id }, req.body).then(
        (response) => {
            console.log('here is res', response);
            if (response.modifiedCount == 1) {
                res.json({ message: "User is edited with success" });
            } else {
                res.json({ message: "Error" });
            }
        });
});
// ------------------------------App Exportation----------------------------------------//

//Make app importable from another files
module.exports = app
