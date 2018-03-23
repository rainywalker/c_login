const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');

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


Account.statics.signup = function({username, email, password}){
    const account = new this({
        profile: {
            username
        },
        email,
        password : salt(password)
    })
    return account.save();
}

module.exports = mongoose.model('Account', Account);
