const { Schema, model } = require('mongoose');

const petPatientSchema = new Schema(
    {
        name: {
            type: String,
            required: false,
        },
        pet_type: {
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

const PetPatient = model('PetPatient', petPatientSchema);

module.exports = PetPatient;