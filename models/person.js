const mongoose = require('mongoose');

const personSchema  = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default : 0
    },
    favoriteFoods : {
        type: [String],
        default: []
    }

})

const person = mongoose.model('Person',personSchema);

module.exports = person;