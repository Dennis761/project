import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token){
        try {
            const decoded = jwt.verify(token, 'user-secret-code')
            req.userId = decoded._id
            next()
        } catch (error) {
            res.status(400).json({
                message: 'Your access failed'
            })
        }
    } else {
        res.status(400).json({
            message: `You don't have access`
        })
    }
}
