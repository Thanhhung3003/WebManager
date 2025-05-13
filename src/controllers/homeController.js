const { registerByEmail, loadUserByEmail, loadUsers, deleteUserByEmail, updateUserByEmail, getUserById, verifyIdToken,
    getDataById,
} = require('../controllers/firebaseAdminController.js');
const showPopup = require('./popupController.js');

const loginPage = async (req, res) => {
    res.render('index.ejs', { title: 'Home' });
};

const registerPage = async (req, res) => {
    res.render('register.ejs', { title: 'Register' });
}

const checkRole = async (req, res) => {
    try {
        var userId = req.query.uid;
        var userData = await getDataById(userId);
        var token = req.query.token;
        var role = userData.role;
        if (role === "admin") {
            res.redirect('/home?token=' + token);
            return;
        } else {
            showPopup.showPopup(req, res, 'User is not allowed to access this page', '/');
            return;
        }
    } catch (error) {
        console.error('Error checking role:', error);
        showPopup.showPopup(req, res, 'Error checking role', '/');
        return;
    }
}

const getHomePage = async (req, res) => {
    var users = await loadUsers();
    var token = req.query.token;
    if (!token) {
        showPopup.showPopup(req, res, 'Token is missing', '/');
        return;
    }

    const decodedToken = await verifyIdToken(token);
    if (!decodedToken) {
        showPopup.showPopup(req, res, 'Invalid token', '/');
        return;
    }
    
    res.render('home.ejs', { title: 'Admin', users: users });
    return;
}

const callDeleteUserByEmail = async (req, res) => {
    const email = req.params.uid;
    console.log('Email to delete:', email);
    var deleteUserResult = false
    try {
        deleteUserResult = await deleteUserByEmail(email);
    } catch (error) {
        console.error('Error deleting user:', error);
    }
    if (deleteUserResult) {
        // return success response
        res.status(200).json({ message: 'User deleted successfully' });
    } else {
        // return error response
        res.status(500).json({ message: 'Error deleting user' });
    }
}

module.exports = {
    loginPage, registerPage, checkRole, getHomePage, callDeleteUserByEmail, 
}
