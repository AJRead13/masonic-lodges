const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+@.+\..+/, 'Must be a valid email address!']
    },
    password: {
        type: String,
        required: true,
        trim: true
    },

});

// Hash password before storing in DB
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds =  15;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }

    next()
})

const User = model('User', userSchema);

module.exports = User;