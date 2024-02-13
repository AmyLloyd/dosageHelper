const { Schema, model } = require('mongoose');

const patientSchema = new Schema(
    {
        name: {
            type: String,
            required: false,
        },
        animal_type: {
            type: String,
        },
        condition_description: {
            type: String,
        },
        prescriptions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Prescription'
            }
        ]
    }
);

const PetPatient = model('Patient', patientSchema);

module.exports = Patient;