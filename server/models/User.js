const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
    },
    password:{
        type: String,
        minlength: 5,
    },
    lastname:{
        type:String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function (next) {
    var user = this;
    console.log(user, "here");
    if(user.isModified('password')){
        // ecrypt password
        bcrypt.genSalt(saltRounds, (err, salt) =>{
            if(err) return next(err)
            console.log(salt);

            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }
    else {
        next()
    }
    

})

// compare password
userSchema.methods.comparePassword = function(plainPassword, cb){
    console.log(plainPassword, "&&", this.password);
    bcrypt.compare(plainPassword, this.password, function(err, isMatched){
        if(err) return cb(err)
        console.log(isMatched);
        cb(null, isMatched);
    })
}

// jwt
userSchema.methods.generateToken = function(cb){
    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'screctToken');
    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    // decode token
    jwt.verify(token, 'screctToken', function(err, decode){
        user.findOne({"_id": decode, "token": token}, function(err, user){
            if(err) return cb(err)
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User };