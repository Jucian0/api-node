import { jwt, bcrypt } from '../../const';
import { config } from '../../config';
import UserModel from '../../models/user/user.model';

/** Register a new user */
export function register(req, res) {
    if (!req.body) {
        return res.status(400).send({
            message: 'Note content can not be empty'
        });
    };

    /** make a hash password */
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = new UserModel({
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

/** Get info about me */
export function me(req, res) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({
            auth: false,
            message: 'No token provided'
        });
    };

    jwt.verify(token, config.secret, (error, decoded) => {
        if (error) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        };

        console.log(decoded)

        res.status(200).send(decoded);
    })
}

/** Login */
export function login(req, res) {
    console.log(req.body)
    UserModel.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: `User not found with email ${req.body.email}`
                });
            };
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, token: null });
            }

            const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 //expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token });
        })
        .catch((error) => {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `User not found with id ${req.params.userId}`
                })
            }

            return res.status(500).send({
                message: `Error retrieving note with id ${req.params.userId}`
            });
        });
}