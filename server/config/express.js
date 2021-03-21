const express = require('server/config/express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    morgan = require('morgan');

module.exports.init = function() {

    //Initialize app
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
    app.use(cors(3000));

    //Enable request logging for development debugging
    app.use(morgan('dev'));

    //Body parsing middleware
    app.use(bodyParser.json());

    // If web app is in production, serves build folder
    if(process.env.NODE_ENV === 'production'){
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Routes all other requests to react application
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app;
}