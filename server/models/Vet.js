const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const vetSchema = new Schema(
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
            ref: 'Client'
          }],
    },
    {
        toJSON: {
            virtuals: true,

        },
    }
);

//set up pre-save middleware to create password
vetSchema.pre('save', async function (next) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

//compare the incoming password with the hashed password
vetSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const Vet = model('Vet', vetSchema);

module.exports = Vet;