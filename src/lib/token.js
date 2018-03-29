const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const generateToken = payload => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, jwtSecret, {
            expiresIn : '7d'
        }, (error, token) => {
            if (error) reject(error);
            resolve(token)
        })
    })
}

const  decodeToken = async token => {
    return new Promise(
        (resolve, reject) => {
            jwt.verify(token, jwtSecret, (error, decoded) => {
                if (error) reject(error);
                resolve(decoded)
            })
        }
    )
};

exports.jwtMiddleware = async(ctx, next) => {
    const token = ctx.cookies.get('access_token');
    if(!token) return next();

    try {
        const decoded = await decodeToken(token);
        if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
            const {_id, profile} = decoded;
            const refreshToken = await generateToken({_id, profile}, 'account');
            ctx.cookies.set('access_token', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
                httpOnly: true
            });

        }
        ctx.request.user = decoded
    }
    catch(e) {
        ctx.request.user = null
    }
    return next();
}
exports.generateToken = generateToken;

