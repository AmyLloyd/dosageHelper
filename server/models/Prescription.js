const { Schema, model } = require('mongoose');

//import schema from VetUser.js
const vetUserSchema = require('./VetUser');

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
    dosage: {
      type: String,
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
      ref: 'VetUser'
    }
    
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Class = model('Prescription', prescriptionSchema);

module.exports = Prescription;