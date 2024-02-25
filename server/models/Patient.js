const { Schema, model } = require('mongoose');

const patientSchema = new Schema(
    {
        name: {
            type: String,
            required: false,
        },
        animal_type: {
            type: String,
            required: true,
        },
        condition_description: {
            type: String,
        },
        prescriptions: [
            {
                type: Schema.Types.ObjectId,
                required: false,
                ref: 'Prescription'
            }
        ]
    }
);

const Patient = model('Patient', patientSchema);

module.exports = Patient;