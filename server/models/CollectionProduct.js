// const mongoose = require('mongoose');

// const collectionProductSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   size: { type: String, enum: ['small', 'medium', 'large', 'xl', 'xxl'], required: true },
//   images: [String],
//   price: { type: Number, required: true },
//   description: { type: String },
//   collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }
// });

// module.exports = mongoose.model('CollectionProduct', collectionProductSchema);


const mongoose = require('mongoose');

const collectionProductSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the album or service
  size: { type: String, enum: ['small', 'medium', 'large', 'xl', 'xxl'], required: false }, // Size of the album
  images: [String], // Array of image URLs or paths
  price: { type: Number, required: true }, // Price of the album printing service
  description: { type: String }, // Description of the album or service
  numberOfPages: { type: Number, required: true }, // Number of pages in the album
  albumType: { type: String, required: true }, // Type of album (e.g., 'Wedding', 'Birthday', 'Travel', etc.)
  customizationNotes: { type: String }, // Customization notes for album printing
  collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }, // Reference to a collection if needed
  createdAt: { type: Date, default: Date.now }, // Automatically adds the creation date
});

module.exports = mongoose.model('CollectionProduct', collectionProductSchema);
