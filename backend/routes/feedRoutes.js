const router = require('express').Router();
// const controller = require('../controllers/userController');
const tokenVerify = require('../middleware/tokenVerify');


router.get('/getFeed', tokenVerify, (req,res) => {
  return res.json({message: 'OK'});
})
module.exports = router;
