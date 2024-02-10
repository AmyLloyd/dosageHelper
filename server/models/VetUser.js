const { Schema, model } = required('mongoose');

const clientUserSchema = require('./ClientUser');

const vetUserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        //Change to ref double check
        clients: [{
            type: Schema.Types.ObjectId,
            ref: 'ClientUser'
          }],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const VetUser = model('VetUser', vetUserSchema);

module.exports = VetUser;