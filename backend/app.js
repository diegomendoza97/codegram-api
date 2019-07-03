const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const feedRoutes = require('./routes/feedRoutes');

dotenv.config();

const app = express();
const port = process.argv[2] !== undefined ? process.argv[2] : 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-mdznj.mongodb.net/codegram`, {useNewUrlParser: true})
	.then(() =>{
		console.log('Connected to Database');
	})
	.catch((err) => {
		console.log('Cannot connect to dabase');
		// console.log(err);
	})

app.get('', (req, res, next) => {
	res.send('Hello World');
});

app.use('/api/users', userRoutes);
app.use('/api/feed', feedRoutes);

const server = http.createServer(app);

server.listen(port, () => {
	console.log(`Listening on Port: ${port}`);
});