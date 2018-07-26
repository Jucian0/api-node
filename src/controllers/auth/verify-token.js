import { jwt } from '../../const';
import { config } from '../../config';

export function verifyToken(req, res, next) {

    /** Check header or url parameters or post parameters for token */
    var token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({
            auth: false,
            message: 'No token provided.'
        });
    }

    /** Verifies secret and checks exp */
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });
        }

        /** Verifies secret and checks exp */
        req.userId = decoded.id;
        next();
    });
}