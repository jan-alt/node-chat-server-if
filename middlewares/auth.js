const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Unauthorized!'
            })
        }

        const token = authHeader.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SIGNATURE)
        if(!decodedToken) {
            return res.status(401).json({
                message: 'Invalid token!'
            })
        }

        // const { userId } = decodedToken;
        const payload = jwt.decode(token)

        // req.userId = userId
        req.userId = payload.userId

        next()

    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        })
    }
}