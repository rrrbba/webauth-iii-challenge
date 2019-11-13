const router = require('express').Router();

const Users = require('./users-model');

const restricted = require('../auth/restricted-middleware');

router.get('/', restricted, checkRole('admin'), (req, res) => {
    
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err))
});

module.exports = router;

function checkRole(role) {
    
    return function(req, res, next) {

        if(role === req.decodedJwt.role) {
            next();
        } else {
            res.status(403).json({ message: 'SORRY, YOU ARE NOT ALLOWED!!'})
        }
    }
};