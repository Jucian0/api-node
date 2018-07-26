import { createUser, findAllUsers, findOneUser, updateUser, deleteUser } from './../../controllers/user/user.controller';

export default function userRoutes(app){

        /** Create a new User */
        app.post('/user', createUser);

        /** Retrieve all Users */
        app.get('/user', findAllUsers);
    
        /** Retrieve a single User with userID */
        app.get('/user/:userId', findOneUser);
    
        /** Update a User with userId */
        app.put('/user/:userId', updateUser);
    
        /** Delete a User with userId */
        app.delete('/user/:userId', deleteUser);

}