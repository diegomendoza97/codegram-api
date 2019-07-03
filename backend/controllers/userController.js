const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt 	= require('jsonwebtoken');

exports.signUp = async (req, res) => {
	try {
		const hashPassword =  await bcrypt.hash(req.body.password, 8);
		const user = new User({
			email: req.body.email,
			password: hashPassword,
			username: req.body.username
		});

		const result = await  user.save();
		return res.json({result, errorCode: 0, message: 'Success'})
	} catch (err) {
		console.log(err);
		return res.json({ errorCode: 1, message: 'Failed'});
	}
}


exports.login = async (req,res) => {
	try{
		const user = await User.findOne({$or:[{email: req.body.user}, {username: req.body.user}]});
		if (!user) {
			throw new Error('email does not exist');
		} 
		const isEqual = await bcrypt.compare(req.body.password, user.password);
		if (!isEqual) {
			throw new Error('email or password doesn\'t match');
		} 
		const token = jwt.sign({
			email: user.email,
			userId: user._id
		}, process.env.JWT_SECRET, {expiresIn: '3h'})
		return res.json({ errorCode: 0, message: 'Success', token: token});
	}	 catch (err) {
		console.log(err);
		return res.json({ errorCode: 1, message: err.message});
	}
}