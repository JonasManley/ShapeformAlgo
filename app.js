const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
// MongoDB Connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/shapeformtest');

const app = express()

// Routes instances
const template = require('./routes/template');
const generateProgram = require('./routes/generateProgramRoute');

// Setting Cors option
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());

// Routes
app.use('/template', template);
app.use('/generate', generateProgram);

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;
    
    // Respond to client
    res.status(status).json({
        error: {
            message: error.message
        } 
    });

    // Respond to ourselves
    console.error(err);
});

// Start the server
const port = app.get('port') || 3000;
app.listen(port, () => {
    console.log(`REST API running on port ${port}`);
});