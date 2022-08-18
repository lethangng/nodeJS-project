import express from "express";
import APIController from '../controller/APIController';

const router = express.Router();

const initAPIRoute = (app) => {
    // Method GET -> READ data
    router.get('/users', APIController.getAllUsers);

    // Method POST -> CREATE data
    router.post('/create-user', APIController.createNewUser);

    // Method PUT -> UPDATE data
    router.put('/update-user', APIController.updateUser);

    // Method DELETE -> DELETE data
    router.delete('/delete-user/:id', APIController.deleteUser);

    return app.use('/api/v1/', router);
}

export default initAPIRoute;