import { jwt, bcrypt } from '../../const';
import { config } from '../../config';
import UserMOdel from '../../models/user/user.model';

export function register() {
    if (!req.body.content) {
        return res.status(400).send({
            message: 'Note content can not be empty'
        });
    };

    /** make a hash password */
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = new UserMOdel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    user.save()
        .then((user) => {
            /** create a token */
            const token = jwt.sign({
                id: user.userId
            }, config.secret);

            res.status(200).send({
                auth: true, token: token
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || 'Some error ocured while register the User.'
            })
        });

};

export function me(){
    const token = req.headers['x-access-token'];
    if(!token) {
        return res.status(401).send({
            auth: false,
            message: 'No token provided'
        });
    };

    jwt.verify(token, config.secret)
        .then((decoded)=>{
            res.status(200).send(decoded);
        })
        .catch((error)=>{
            res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            })
        })
}