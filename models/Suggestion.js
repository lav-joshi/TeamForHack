const mongoose = require("mongoose");

const SuggestionSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  subject: {
    type: String,
    trim: true,
    required: true,
  },
  message:{
    type: String,
    trim:true,
    required:true
  }
});

module.exports = mongoose.model("Suggestion", SuggestionSchema);
