const { Schema, model } = require('mongoose');

const petPatientSchema = require('./PetPatient');

const clientUserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match:  [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        pets: [petPatientSchema],
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

const ClientUser = model('ClientUser', clientUserSchema);

module.exports = ClientUser;