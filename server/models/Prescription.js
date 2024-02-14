const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//import schema from Vet.js
const vetSchema = require('./Vet');

const prescriptionSchema = new Schema(
  {
    created_at: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
      required: true,
    },
    drug_name: {
      type: String,
      required: true,
    },
    drug_strength: {
      type: String,
    },
    drug_type: {
      type: String,
    },
    dose_frequency: {
      type: Number,
      required: true,
      min: [1, 'Value must be greater than 0'],
    },
    instructions: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Value must be greater than 0'],
    },
    course_length: {
      type: Number,
      required: true,
      min: [1, 'Value must be greater than 0'],
    },
    prescriber: {
      type: Schema.Types.ObjectId,
      ref: 'Vet'
    },
    number_of_dosages: {
      type: Number,
      required: false,
      min: [1, 'Value must be greater than 0'],
    },
    time_of_dosages: [{
        type: String,
        required: true,
    }],
    dosage_checked_at: {
        type: Date,
        get: (timestamp) => dateFormat(timestamp),
        default: Date.now
    },
    dosage_notes: [{
      type: String,
      default: null,
    }]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Prescription = model('Prescription', prescriptionSchema);

module.exports = Prescription;