// @ts-check

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    cooking: {type: String, required: true},
    pictures: [{type: String, required: true}],
    ingredient: [{
        igr_name: {type: String, required: true},
        unit: {type: String, required: true},
        value: {type: String, required: true},
        type: {type: String, required: true}
    }]
})

module.exports = mongoose.model('Receipt', schema,'receipts');
