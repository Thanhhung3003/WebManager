const path = require('path');

const showPopup = (req, res, message, route) => {
    res.render('noticePopup', { message, route });
};

module.exports = {
    showPopup
};