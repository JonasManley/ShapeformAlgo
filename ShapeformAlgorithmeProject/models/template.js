const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    // https://mongoosejs.com/docs/schematypes.html
    stringT: String,
    numberT: Number,
    //dateT: Date,
    //bufferT: Buffer,
    //booleanT: Boolean,
    //arrayT: Array,
    //mapT: Map,
    /* 
    objectT: [{
        type: Schema.Types.ObjectId,
        ref: 'objectT'
    }] 
    */
});

const Template = mongoose.model('template', templateSchema);
module.exports = Template;