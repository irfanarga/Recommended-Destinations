const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const destinationSchema = new Schema({
  name: String,
  location: String,
  description: String,
  city: String,
  images: [
    {
      url: String,
      filename: String
    }
  ],
  phone: String,
  price: Number,
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

destinationSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } })
  }
})

module.exports = mongoose.model('Destination', destinationSchema);