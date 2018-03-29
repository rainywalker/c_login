const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const {generateToken} = require('lib/token');

/**
 *
 * @param pw
 * @returns {*}
 * @pbkdf2(비밀번호, salt, 반복 횟수, 비밀번호 길이, 해시 알고리즘)
 *
 */
const salt = (pw) => {
    crypto.randomBytes(64, (err, buf) => {
        return crypto.pbkdf2(pw,buf.toString('base64'), 100000, 64,'sha512', (err, key) => key.toString('base64'));
    })
}

/**
 *
 * @type {*|Mongoose.Schema}
 * @key : profile, email, social(facebook, google, twitter, naver), password
 */
const Account = new Schema({
    profile : {
        username : String,
        thumbnail : String
    },
    email : String,
    social : {
        facebook : {
            id : String,
            accessToken : String
        },
        google : {
            id : String,
            accessToken : String
        },
        twiiter : {
            id : String,
            accessToken : String
        },
        naver : {
            id : String,
            accessToken : String
        }
    },
    password : String,
    createdAt : {
        type : Date,
        default : Date.now
    }
});


/**
 *
 * @param username
 * @returns {Promise}
 */
Account.statics.findByUsername = function (username) {
    return this.findOne({'profile.username' : username}).exec();
};

/**
 *
 * @param email
 * @returns {Promise}
 */
Account.statics.findByEmail = function (email) {
    return this.findOne({email}).exec()
};


/**
 *
 * @param username
 * @param email
 * @returns {Promise}
 */
Account.statics.findByEmailOrUsername = function({username, email}) {
    return this.findOne({
        $or : [
            {'profile.username' : username},
            {email}
        ]
    }).exec()
};


/**
 *
 * @param username
 * @param email
 * @param password
 */
Account.statics.signup = function({username, email, password}){
    const account = new this({
        profile: {
            username
        },
        email,
        password : salt(password)
    })
    return account.save();
};


Account.methods.validatePassword = function(password) {

    const salted = salt(password);
    return this.password === salted;
};

/**
 *
 * @param password
 * @returns {boolean}
 */
Account.methods.generateToken = function () {
    const payload = {
        _id :  this._id,
        profile : this.profile
    };
    return generateToken(payload, 'account')

};

module.exports = mongoose.model('Account', Account);
