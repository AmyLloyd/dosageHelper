const { Schema, model } = require('mongoose');

const adminSchema = new Schema(
    {

    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const Admin = model('Admin', adminSchema);

module.exports = Admin;