import { createUser, findAllUsers, findOneUser, updateUser, deleteUser } from './../../controllers/user/user.controller';
import { verifyToken } from './../../controllers/auth/verify-token';

export default function userRoutes(app){

        /** Create a new User */
        app.post('/user',verifyToken, createUser);

        /** Retrieve all Users */
        app.get('/user', verifyToken, findAllUsers);
    
        /** Retrieve a single User with userID */
        app.get('/user/:userId', verifyToken, findOneUser);
    
        /** Update a User with userId */
        app.put('/user/:userId', verifyToken, updateUser);
    
        /** Delete a User with userId */
        app.delete('/user/:userId', verifyToken, deleteUser);

}