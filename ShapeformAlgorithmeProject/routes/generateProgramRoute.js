const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();

// instance of the controller
const GenerateProgramController = require('../controllers/generateProgramController');

router.route('/')
    .get(GenerateProgramController.getNewProgram)

module.exports = router;