const { Schema, model } = require('mongoose');

//import schema from Vet.js
const vetSchema = require('./Vet');

const prescriptionSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
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
    },
    instructions: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
    },
    course_length: {
      type: Number,
      required: true,
    },
    prescriber: {
      type: Schema.Types.ObjectId,
      ref: 'Vet'
    },
    number_of_dosages: {
      type: Number,
      required: true,
    },
    time_of_dosages: {
        type: String,
        required: true,
    },
    dosage_checked: {
        type: Date,
        default: null,
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