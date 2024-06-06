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
    drug: {
      type: Schema.Types.ObjectId,
      ref: 'Drug'
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
      required: false,
      min: [1, 'Value must be greater than 0'],
    },
    course_length: {
      type: Number,
      required: false,
      min: [1, 'Value must be greater than 0'],
    },
    prescriber: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'Vet'
    },
    number_of_dosages: {
      type: Number,
      required: false,
      min: [1, 'Value must be greater than 0'],
    },
    time_of_dosages: [{
        type: String,
        required: false,
    }],
    dosage_checked_at: {
        type: Date,
        get: (timestamp) => dateFormat(timestamp),
        default: Date.now
    },
    dosage_notes: [{
      type: String,
      default: null,
      required: true,
    }],
  
    active: {
      type: Boolean,
      default: true,
      required: true,
    }
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