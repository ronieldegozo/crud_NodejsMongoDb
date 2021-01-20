const express = require('express');
const { homeRoute, addUser, updateUser } = require('../services/render');
const route = express.Router();
const controller = require('../controller/controller');

route.get('/', homeRoute );

route.get('/add-user',addUser);

route.get('/update-user',updateUser);


//API
route.post('/api/users', controller.create); 

route.get('/api/users', controller.find);

route.put('/api/users/:id', controller.update);

route.delete('/api/users/:id', controller.delete);

module.exports = route;