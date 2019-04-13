const mongoose = require('mongoose');


const vechicleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    brand: String,
    model: String
})

module.exports = mongoose.model('Vechicle', vechicleSchema);