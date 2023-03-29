const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Name of the tour is required'],
        unique:true,
        trim: true
    },
    price: {
        type:Number,
        required:[true, 'A tour must have a name']
    },
    priceDiscount: Number,
    duration: {
        type: Number,
        required: [true, 'A tour must have duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size.']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have difficulty']
    },
    ratingAverage: {
        type:Number,
        default:4.3
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have summary']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]

})

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;