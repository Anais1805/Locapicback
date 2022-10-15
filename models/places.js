const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
  nickname: String,
  name: String,
  latitude: String, 
  longitude: String,
});

const Place = mongoose.model('places', placeSchema);

module.exports = Place;
