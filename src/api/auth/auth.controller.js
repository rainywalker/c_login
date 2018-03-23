const Account = require('models/account');

const registerObj = {
    signUp :  async (ctx) => {
        ctx.body = 'signUp'
    },
    signIn : async (ctx) => {
        ctx.body = 'signIn'
    },
    exists : async (ctx) => {
        ctx.body = 'exists'
    },
    signOut : async (ctx) => {
        ctx.body = 'signOut'
    }
}

module.exports = registerObj;
