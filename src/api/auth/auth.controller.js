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
    /**
     *
     * @param ctx
     * @returns {Promise<void>}
     */
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

        let existing = null;

        try {
            existing = await Account.findByEmailOrUsername(ctx.request.body);
        }
        catch (e) {
            ctx.throw(500,e)
        }

        if (existing) {
            ctx.status = 409;
            ctx.body = {
                key : existing.email === ctx.request.body.email ? 'email' : 'username'
            }
        }



        let account = null;
        try {
            account = await Account.signup(ctx.request.body);
        } catch (e) {
            ctx.throw(500, e);
        }

        let token = null;
        try {
            token = await account.generateToken();
        }
        catch(e) {
            ctx.throw(500,e)
        }
        ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
        ctx.body = account.profile;

    },
    /**
     *
     * @param ctx
     * @returns {Promise<void>}
     */
    signIn : async (ctx) => {

        const schema = Joi.object().keys({
            email : Joi.string().email().required(),
            password : Joi.string().required()
        });

        const result = Joi.validate(ctx.request.body, schema);

        if (result.error) {
            ctx.status = 400;
            return
        }

        const {email, password} = ctx.request.body;

        let account = null;

        try {
            account = await Account.findByEmail(email)
        }
        catch(e) {
            ctx.throw(500,e)
        }

        if (!account || !account.validatePassword(password)) {
            ctx.status = 403;
            return
        }

        let token = null;
        try {
            token = await account.generateToken();
        } catch (e) {
            ctx.throw(500, e);
        }

        ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
        ctx.body = account.profile
    },
    /**
     *
     * @param ctx
     * @returns {Promise<void>}
     */
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
    /**
     *
     * @param ctx
     * @returns {Promise<void>}
     */
    signOut : async (ctx) => {
        ctx.cookies.set('access_token', null, {
            maxAge : 0,
            httpOnly : true
        });
        ctx.status = 204;
    },
    check : ctx => {
        const { user } = ctx.request;

        if(!user) {
            ctx.status = 403;
            return
        }
        ctx.body = user.profile;
    }
}

module.exports = registerObj;
