const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const BlogSchema = new Schema({
  title: {
    type: String,
    required: true 
  },
  description: {
    type: String,
    required: true
  }
});
// create collection and add schema
mongoose.model('blogs', BlogSchema);
