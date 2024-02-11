const { Schema, model } = required('mongoose');
const bcrypt = require('bcrypt');

const clientUserSchema = require('./ClientUser');

const vetUserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
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
            minLength: 5,
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

//set up pre-save middleware to create password
vetUserSchema.pre('save', async function (next) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

//compare the incoming password with the hashed password
vetUserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const VetUser = model('VetUser', vetUserSchema);

module.exports = VetUser;