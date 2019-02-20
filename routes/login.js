var express = require("express")
var router = express.Router()
var jwt = require("jsonwebtoken")
var mysql      = require('mysql')

const username = "Onejohi"
const password = "123456"

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'geral',
  password : 'milky199',
  database : 'test'
});

router.get('/', (req, res, next) => {
	let p_username = req.body.username
	let p_password = req.body.password
	const secret = "CBF242F73D691DD4800D7FB304A99C611AE65B3C32DEDFA5554148DE32D8D3A0";

	var seconds = new Date().getTime() / 1000;

	var payload = {
		name: "Geraldy",
		email: "gvlova@gmail.com",
		iat: seconds,
		external_id: "chat-333"
		
	};
	// var token = jwt.sign(payload,
	// 	'secretkey',
	// 	(err, token) => {
	// 		res.send({
	// 			jwt: token
	// 		})
	// 	})

	var token = jwt.sign(payload, secret);
  	res.json({ jwt: token });
})

router.get('/query', (req, res, next) => {
	let q = null

	connection.query('select * from demo_cpq', function (error, results, fields) {
		if (error) throw error;
		console.log('The solution is: ', results);
		q = results
		connection.end();
		res.json({ results: q });
	});
})

module.exports = router;