const Account = require('models/account');
const Joi = require('joi');

/**
 *
 * @type {{
 *  signUp: function(*),
 *  signIn: function(*),
 *  exists: function(*),
 *  signOut: function(*)
 * }}
 */
const registerObj = {
    signUp :  async (ctx) => {
        const schema = Joi.object().keys({
            username: Joi.string().alphanum().min(4).max(15).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required().min(6)
        });

        const result = Joi.validate(ctx.request.body, schema);

        if(result.error) {
            ctx.status = 400;
            return;
        }
        let account = null;
        try {
            account = await Account.signup(ctx.request.body);
        } catch (e) {
            ctx.throw(500, e);
        }

        ctx.body = account.profile;

    },
    signIn : async (ctx) => {
        ctx.body = 'signIn'
    },
    exists : async (ctx) => {
        const { key, value } = ctx.params;
        let account = null;

        try {
            account = await (key === 'email' ?  Account.findByEmail(value) : Account.findByUsername(value));
        }
        catch (e) {
            ctx.throw(500,e)
        }
        ctx.body = {
            exists : account !== null
        }
    },
    signOut : async (ctx) => {
        ctx.body = 'signOut'
    }
}

module.exports = registerObj;
