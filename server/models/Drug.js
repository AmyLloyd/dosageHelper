const { Schema, model } = require('mongoose');

const drugSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    strength: {
      type: String,
    },
    type: {
      type: String,
    }
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Drug = model('Drug', drugSchema);

module.exports = Drug;