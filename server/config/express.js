const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path'),
    morgan = require('morgan'),
    passport = require('passport'),
    memberRoutes = require('../routes/member.routes');

module.exports.init = function() {
    mongoose.set('useCreateIndex', true);
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGODB_URI || require('./config.js').db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        ()=>{
            //all-set and ready to go
            console.log("Connected to MongoDB database");
        },
        error => {
            //handle initial connection error
            console.log("Initial connection error: " + error);
        }
    );
    mongoose.connection.on('error', error => {
        console.log(error);
    });

    const app = express();

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
    });

    const cors = require('cors');
    app.use(cors());
    //Enable request logging for development debugging
    app.use(morgan('dev'));
    //Body parsing middleware
    app.use(bodyParser.json());
    app.use(passport.initialize());
    require('./passport')(passport);
    app.use('/api/members', memberRoutes);

    // If web app is in production, serves build folder
    if(process.env.NODE_ENV === 'production'){
        app.use(express.static(path.join(__dirname, '../../frontend/build')));
        //Route other requests to frontend
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
        });
    }

    return app;
}