const mongoose = require('mongoose');

const alphabetValidator = {
  validator: function (v) {
    return /^[A-Za-z\s]+$/.test(v);
  },
  message: (props) =>
    `${props.value} is not a valid name, please use only alphabets`,
};

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name of the tour is required'],
    unique: true,
    trim: true,
    validate: alphabetValidator,
  },
  secretTour: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a name'],
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be less than regular price.',
    },
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size.'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have difficulty'],
    enum: {
      values: ['easy', 'medium', 'hard'],
      message: 'Difficulty should be one of easy, medium, or hard',
    },
  },
  ratingAverage: {
    type: Number,
    default: 4.3,
    min: [1, 'The average rating must be 1.0 or above'],
    max: [5, 'The average rating must be 5.0 or below'],
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have summary'],
    validate: alphabetValidator,
  },
  description: {
    type: String,
    trim: true,
    validate: alphabetValidator,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
