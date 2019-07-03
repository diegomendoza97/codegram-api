const router = require('express').Router();
const controller = require('../controllers/userController');

router.post('/signup', (req,res) => {
    controller.signUp(req,res);
});

router.post('/login', (req,res) => {
    controller.login(req,res);
})

module.exports = router;
