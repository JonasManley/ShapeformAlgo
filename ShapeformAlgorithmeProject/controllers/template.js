const Template = require('../models/template');

/*
    We can interact with mongoose in 3 different ways:
    1) Callbacks
    2) Promises
    3) Async/Await (Promises)
*/

module.exports = {
    // Method template - this is where the logic of the api is implemented.
    // Callback
    /*
    metod1: (req, res, next) => {
        Template.find({}, (err, templates) => {
            if (err) {
                next(err);
            }
            res.status(200).json(templates);
        })
    },

    
    newTemplate: (req, res, next) => {
        const newTemplate = new Template(req.body);
        newTemplate.save((err, template) => {
            res.status(201).json(template);
        })
    }, */

    // Promises
    /*
    metod1: (req, res, next) => {
        Template.find({})
        .then(template => {
            res.status(200).json(templates);
        })
    },

    
    newTemplate: (req, res, next) => {
        const newTemplate = new Template(req.body);
        newTemplate.save()
            .then(template => {
                res.status(201).json(template);
            })
    }, */

    // Async/Await (Promises)
    metod1: async (req, res, next) => {
        const templates = await Template.find({});
        res.status(200).json(templates);
    },

    newTemplate: async (req, res, next) => {
        const newTemplate = new Template(req.body);
        const template = await newTemplate.save();
        res.status(201).json(template);
    },

    getTemplate: async (req, res, next) => {
        const { templateId } = req.params;
        const template = await Template.findById(templateId);
        res.status(200).json(template);
    },

    replaceTemplate: async (req, res, next) => {
        // enforce that req.body must contain all the fields
        const { templateId } = req.params;
        const newTemplate = req.body;
        const result = await Template.findByIdAndUpdate(templateId, newTemplate);
        res.status(200).json({ success: true });
    },

    updateTemplate: async (req, res, next) => {
        // req.body may contain any number of fields
        const { templateId } = req.params;
        const newTemplate = req.body;
        const result = await Template.findByIdAndUpdate(templateId, newTemplate);
        res.status(200).json({ success: true });
    },

    deleteTemplate: async (req, res, next) => {
        const { templateId } = req.params;
        await Template.findByIdAndDelete(templateId);
        res.status(200).json({ success: true });
    }
};

