const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Name of the tour is required'],
        unique:true
    },
    rating: {
        type:Number,
        default:4.3
    },
    price: {
        type:Number,
        required:[true, 'A tour must have a name']
    }
})

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;