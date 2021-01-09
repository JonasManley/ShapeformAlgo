const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();

// instance of the controller
const TemplateController = require('../controllers/template');
const Template = require('../models/template');

router.route('/')
    .get(TemplateController.metod1)
    .post(TemplateController.newTemplate);

router.route('/:templateId')
    .get(TemplateController.getTemplate)
    .put(TemplateController.replaceTemplate)
    .patch(TemplateController.updateTemplate)
    .delete(TemplateController.deleteTemplate)

module.exports = router;