const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  hunger: {
    type: Number,
    required: true,
    default: 50
  },
  happy: {
    type: Number,
    required: true,
    default: 75
  },
  energy: {
    type: Number,
    required: true,
    default: 70
  },
  health: {
    type: Number,
    required: true,
    default: 85
  },
  emotion: {
    type: String,
    required: true,
    default: "😀"
  },
  level: {
    type: Number,
    required: true,
    default: 1
  },
  xp: {
    type: Number,
    required: true,
    default: 0
  },
  decay: {
    type: Number,
    required: true,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("Pet", petSchema);
