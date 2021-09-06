const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const  jwt = require('jsonwebtoken');
const Task = require("./task");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password'))
                throw new Error('Password string should not be included in the actual password')
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("Invalid email address")
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value<0)
                throw new Error('Age must be a positibe number')
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
}


userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({ _id: this.id.toString() }, process.env.JWT_SECRET)
    this.tokens = this.tokens.concat({ token });
    this.save();
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user)
        throw new error("Unable to login");
    
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch)
        throw new error('Unable to login');
        
    return user;
}

// Hashing a password
userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8)
    next();
})


userSchema.pre('remove', async function(next){
    await Task.deleteMany({ owner: this._id })
    next();
})

const User = mongoose.model('User', userSchema)
module.exports = User;