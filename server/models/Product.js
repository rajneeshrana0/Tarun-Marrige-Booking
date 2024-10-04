// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   size: { type: String, enum: ['small', 'medium', 'large', 'xl', 'xxl'], required: true },
//   images: [String],
//   price: { type: Number, required: true },
//   description: { type: String },
//   category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
// });

// module.exports = mongoose.model('Product', productSchema);


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the video service or package
  size: { type: String, enum: ['small', 'medium', 'large', 'xl', 'xxl'], required: false }, // Package size, if applicable
  images: [String], // Sample images or thumbnails for the video service
  price: { type: Number, required: true }, // Price for the video service
  description: { type: String }, // Description of the video booking service
  eventType: { type: String, required: true }, // Event type (e.g., 'Wedding', 'Corporate', 'Birthday')
  duration: { type: Number, required: true }, // Duration of the video service in hours
  additionalServices: { type: [String] }, // List of additional services (e.g., Drone, Multi-camera setup)
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Category reference
  createdAt: { type: Date, default: Date.now } // Timestamp for when the service was created
});

module.exports = mongoose.model('Product', productSchema);
