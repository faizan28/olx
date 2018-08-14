require('dotenv').config()
var cloudinary = require('cloudinary');
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Users from './models/users';
import UsersDetails from './models/UsersDetails';
import {
    request
} from 'https';
import path from 'path'
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const app = express();

const router = express.Router();
const myres = {
    IsSuccess: true,
    data: {},
    message: '',
}
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

cloudinary.uploader.upload("http://via.placeholder.com/350x150", function(result) { 
  console.log(result) 
});
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`);


const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MONGODB CONNECTED');
}, err => {
    console.log('CONNECTION FAILED');
});
router
    .route('/api/users')
    .get((req, res) => {

        Users
            .find((err, Users) => {

                if (err) {
                    console.log(err);
                } else {
                    // res.setHeader('Content-Type', 'application/json');
                    res.json({
                        Users
                    });
                }
            }).select('-password').exec((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });
    });
router
    .route('api/users/:id')
    .post((req, res) => {
        Users(req.params.id, (err, Users) => {
            if (err)
                console.log(err);
            else
                res.json(Users);
        });
    });
router
    .route('/api/login')
    .post((req, res) => {
        Users.findOne({
            name: req.body.username,
            password: req.body.password
        }, (err, Users) => {
            if (err) {

                console.log(err);
            }
            if (Users) {
                myres.data = Users;
                myres.IsSuccess = true;
                myres.message = "Authroized";
                res.send(myres);
            } else {
                myres.message = "Not Authroized";
                myres.IsSuccess = false;
                myres.data = "";
                res.send(myres)
            }
            // res.json(Users);
        });
    });
router
    .route('/api/checkUser')
    .post((req, res) => {
        Users.find({
            name: req.body.name
        }, (err, resp) => {
            if (err) {
                res.status(400).send('Failed');
            } else {
                if (resp.length > 0) {
                    res.status(200).json({
                        'IsSuccess': false,
                        'message': 'Already Exists'
                    });
                    return;
                } else {
                    res.status(200).json({
                        'IsSuccess': true,
                        'message': 'Username Available'
                    });
                }
            }
        })
    })
router.route('/')
    .get((req, res) => {
        res.render('/public/index.html', {
            root: VIEWS
        });
    })
router
    .route('/api/Signupuser')
    .post((req, res) => {
        console.log(req.body);
        debugger;
        Users.find({
            name: req.body.name
        }, (err, resp) => {
            if (err) {
                res.status(400).send('Failed to create new record');
                return;
            }
            if (resp.length > 0) {
                res.status(200).json({
                    'IsSuccess': false,
                    'message': 'Already Exists'
                });
                return;
            } else {
                let users = new Users(req.body);
                users.save()
                    .then(users => {
                        res.status(200).json({
                            'IsSuccess': true,
                            'message': 'Added Successfully'
                        })
                    })
                    .catch(err => {
                        res.status(400).send('Failed to create new record');
                    })
            }
        }).count();
        // if (alreadyUser) {
        //     res.status(200).json({
        //         'Users': 'Already Exists'
        //     });

        // }

    })

//     app.use(express.static(__dirname + "/public"));
// app.use('/api', router);


app.use('/', router);
app.listen(4000, () => console.log('express server running on port 4000'));