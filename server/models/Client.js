const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const clientSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: false,
            unique: true,
            match:  [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: false,
            minLength: 5,
        },
        // temp_password: {
        //     type:String,
        //     required: false,
        //     minLength:5,
        // },
        is_client: {
            type: Boolean,
            required: true,
            default: true
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

//set up pre-save middleware to create password
clientSchema.pre('save', async function (next) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

//compare the incoming password with the hashed password
clientSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// //set up pre-save middleware to create password
// clientSchema.pre('save', async function (next) {
//     if(this.isNew || this.isModified('temp_password')) {
//         const saltRounds = 10;
//         this.temp_password = await bcrypt.hash(this.temp_password, saltRounds);
//     }

//     next();
// });

// //compare the incoming password with the hashed password
// clientSchema.methods.isCorrectPassword = async function (temp_password) {
//     return bcrypt.compare(temp_password, this.temp_password);
// };

const Client = model('Client', clientSchema);

module.exports = Client;