import UserModel from '../../models/user/user.model';

/** create a new user */
export function createUser(req, res) {
    if (!req.body.content) {
        return res.status(400).send({
            message: 'Note content can not be empty'
        });
    };

    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.save()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || 'Some error ocured while creating the user.'
            })
        })
}

/** return all the users in the database */
export function findAllUsers(req, res) {
    UserModel.find()
        .then((users) => {
            res.status(200).send(users);
        })
        .catch((res) => {
            res.status(500).send({
                message: error.message || 'Some error ocurred while retrieving users.'
            });
        });
};

/** find a single note with a userId */
export function findOneUser(req, res) {
    UserModel.findById(req.params.userId)
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: `User not found with id ${req.params.userId}`
                });
            }
            res.status(200).send(user);
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
};

/** Update a user identified by the userId in the request */
export function updateUser(req, res) {
    if (!req.body.content) {
        return res.status(400).send({
            message: 'User content can not be empty'
        });
    };

    UserModel.findByIdAndUpdate(req.params.userId, {

        name: req.body.name,
        email: req.body.email,
        password: req.body.password

    }, { new: true })
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: `User not found with id ${req.params.userId}`
                });
            }
            res.status(200).send(note);
        })
        .catch((error) => {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `User not found with id ${req.params.userId}`
                });
            }

            return res.status(500).send({
                message: `User not found with id ${req.params.userId}`
            });
        });
};

/** Delete a user with the specified userId in the request */
export function deleteUser (req, res) {
    NoteModel.findByIdAndRemove(req.params.userId)
        .then((note) => {
            if (!note) {
                return res.status(404).send({
                    message: `User not found with id ${req.params.userId}`
                });
            }
            res.status(200).send({
                message: 'User deleted successfully.'
            });
        })
        .catch((error) => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                return res.status(404).send({
                    message: `User not found with id ${req.params.userId}`
                });
            }
            return res.status(500).send({
                message: `Could not delete user with id ${req.params.userId}`
            })
        })
};