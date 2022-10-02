const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/createUser', userController.createUser);
router.get('/getUser', userController.getUser);
router.put('/updateUser', userController.updateUser);
router.delete('/deleteUser', userController.deleteUser);

export { router };