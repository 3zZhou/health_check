const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const RawData = require('./rawData.model');
const RawEvent = require('./rawEvent.model');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
    'mongodb+srv://TreezyZhouPublic:treezyzhou@treezy-erqkb.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database

router.route('/getRawDataFromDb').get(function(req, res) {
    RawData.find(function(err, datas) {
        if (err) {
            console.log(err);
        } else {
            res.json(datas);
        }
    });
});

router.route('/getRawEventsFromDb').get(function(req, res) {
    RawEvent.find(function(err, datas) {
        if (err) {
            console.log(err);
        } else {
            res.json(datas);
        }
    });
});

// this is our create methid
// this method adds new data in our database
router.post('/putRawDataToDb', (req, res) => {
    let rawData = new RawData(req.body);
    rawData.save()
        .then(data => {
            res.status(200).json('Adding raw data successfully');
        })
        .catch(err => {
            res.status(400).send('Adding raw data to db failed');
        });
});

router.post('/putRawEventToDb', (req, res) => {
    let rawEvent = new RawEvent(req.body);
    debugger;
    rawEvent.save()
        .then(data => {
            res.status(200).json('Adding 1 event successfully');
        })
        .catch(err => {
            res.status(400).send('Adding 1 event to db failed');
        });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));