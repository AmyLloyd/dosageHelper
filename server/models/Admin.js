const { Schema, model } = require('mongoose');

const adminSchema = new Schema(
    {
        number_of_admin: {
            type: Number,
            required: true,
        },
        time_of_admin: {
            type: String,
            required: true,
        },
        checked: {
            type: Boolean,
            default: false,
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const Admin = model('Admin', adminSchema);

module.exports = Admin;