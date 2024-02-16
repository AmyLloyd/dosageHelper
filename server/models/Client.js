const { Schema, model } = require('mongoose');

const clientSchema = new Schema(
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
        vetId: {
            type: Schema.Types.ObjectId,
            ref: 'Vet',
            required: true,
        },
        patients: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Patient'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

const Client = model('Client', clientSchema);

module.exports = Client;