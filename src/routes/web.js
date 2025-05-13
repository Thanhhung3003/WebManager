const express = require('express');
const {loginPage, registerPage, checkRole, getHomePage, callDeleteUserByEmail} = require('../controllers/homeController.js');
const {registerByEmail, loginByEmail} = require('../controllers/firebaseAdminController.js');
const router = express.Router();

// Basic route
router.get('/', loginPage);
router.get('/loginPage', loginPage);

// register route
router.get('/registerPage', registerPage);
router.post('/register', registerByEmail);

// check role
router.get('/check-role', checkRole);

// login route
router.get('/home', getHomePage);

// delete user
router.delete('/users/:uid', callDeleteUserByEmail);

module.exports = router;