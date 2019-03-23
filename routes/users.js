module.exports = function(req, res) {
    USERS.find(function(err, docs) {
        res.render('users', {'docs': docs});
    });
};
