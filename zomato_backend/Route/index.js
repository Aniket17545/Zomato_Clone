const express = require("express");

const locationController = require("../Controller/location");
const restaurantController = require("../Controller/restaurant");
const mealtypeController = require("../Controller/mealtype");
const userController = require("../Controller/user");
const menuController = require("../Controller/menu");

const route = express.Router();

route.get('/location', locationController.getLocation);
route.get('/restaurant/:locId', restaurantController.getRestaurantBylocationId);
route.get('/mealtype', mealtypeController.getMealType);
route.post('/signup', userController.postSignup);
route.post('/login', userController.postLogin);
route.post('/filter', restaurantController.filterRestaurant);
route.get('/restaurants/:id', restaurantController.getRestaurantById);
route.get('/menu/:restId', menuController.getMenuByResId);

module.exports = route;