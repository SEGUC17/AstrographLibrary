const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//El schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
<<<<<<< HEAD
    usertype: {
        type: Boolean,
        required: true
    }
=======
    city: {
        type: String,
        required: true
    },
    usertype: {
        type: Boolean,
        required: true
    },
    companyId:{
        type: Number,
        required: false
    }

>>>>>>> loginreg
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username };
    User.findOne(query, callback);
}

<<<<<<< HEAD
module.exports.getRandomBusinesses = function (callback) {
    User.aggregate([{ $sample: { size: 4 } }], function(err, res) { 
       if(err) throw err;
      // console.log(res);
       callback(err,res);
     }); 
=======
module.exports.updateUser = function (id, user, options, callback) {
    var query = { _id: id };
    var update = {
        name: user.name,
        type: user.type,
        provider: user.provider,
        price: user.price

    }
    Event.findOneAndUpdate(query, update, options, callback);
}


module.exports.getRandomBusinesses = function (callback) {


    User.aggregate([{ $match: { 'usertype': true } }, { $sample: { size: 2 } }], function (err, res) {
        if (err) throw err;
        callback(err, res);
    });
>>>>>>> loginreg
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function (candidatePassword, hashedPassword, callback) {
    bcrypt.compare(candidatePassword, hashedPassword, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}