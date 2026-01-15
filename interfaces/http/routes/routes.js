const express = require("express");

const UserController = require('../controllers/UserController')

const routes = express.Router();

routes.post ('/user-activity',UserController.postUserActivity );

routes.get('/user-activity', UserController.getUserActivity);

module.exports = routes