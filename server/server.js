let express = require('express');
let fs = require('fs');
let body_parser = require('body-parser');
let cors = require ('cors');
let uid = require ('uid');
let nodemailer = require("nodemailer");
let multer = require('multer');
let FormData = require('form-data');

let app = express();

let upload = multer();

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.use('/static',express.static('photo'));

app.listen(3001, function () {
	console.log('API app started');
});

let smtpTransport = nodemailer.createTransport({
			host: "smtp.mail.ru",
    	port: 465,
    	secure: true,
      auth: {
        user: "test.test3434.test@mail.ru",
        pass: "Tomato99t"
      }
});

let rand, mailOptions, host, link;

app.post('/new_user', function New_user(req, res) {
	let data_users = fs.readFileSync('user.json');
	let users = JSON.parse(data_users);
	let data_user_settings = fs.readFileSync('user_settings.json');
	let user_settings = JSON.parse(data_user_settings);
	let data_user_orders = fs.readFileSync('user_orders.json');
	let user_orders = JSON.parse(data_user_orders);
	let data_user_balance = fs.readFileSync('user_balance.json');
	let user_balance = JSON.parse(data_user_balance);
	rand = Math.floor((Math.random() * 100) + 54);
	let new_user = {
		id: uid(16),
		email: req.body.email,
		password: req.body.password,
		email_confirm: false,
		balance: "0",
		hash: rand
	};
	let new_user_settings = {
		user_id: new_user.id,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		url_photo: 'photo.png'
	};
	let new_user_orders ={
		user_id: new_user.id,
		orders: []
	}
	let new_user_balance = {
		user_id: new_user.id,
		balance_change: []
	}
	const index = users.findIndex(n => n.email === new_user.email);
	if (index === -1) {
			users.push(new_user);
			fs.writeFileSync('user.json', JSON.stringify(users));
			user_settings.push(new_user_settings);
			fs.writeFileSync('user_settings.json', JSON.stringify(user_settings));
			user_orders.push(new_user_orders);
			fs.writeFileSync('user_orders.json', JSON.stringify(user_orders));
			user_balance.push(new_user_balance);
			fs.writeFileSync('user_balance.json', JSON.stringify(user_balance));
			let good_answer = {
				good_answer: 'Для окончания регестрации подтвердите e-mail'
			};
			res.send(good_answer);
			host = req.get('host');
  		link = "http://" + req.get('host') + "/verify?hash=" + rand;
     	mailOptions = {
				from: "test.test3434.test@mail.ru",
        to : req.body.email,
        subject : "Подтвердите свою почту",
        html : "Привет,<br> Кликни по этой ссылке чтобы подтвердить свою почту.<br><a href=" + link + ">Кликни!</a>"
     };
     smtpTransport.sendMail(mailOptions);
	} else {
		let answer = {
			answer: 'E-mail уже используется'
		}
		res.send(JSON.stringify(answer));
	}
});

app.get('/verify',function(req,res){
	let data_users = fs.readFileSync('user.json');
	let users = JSON.parse(data_users);
	if((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
		const index = users.findIndex(n => n.hash == req.query.hash);
    	if(req.query.hash == users[index].hash) {
				users[index].email_confirm = true ;
				delete users[index].hash;
				fs.writeFileSync('user.json', JSON.stringify(users));
      	res.send("<h1>Почта " + mailOptions.to + " проверена.");
    	} else {
      	res.send("<h1>Неверный запрос</h1>");
    	}
		} else {
    res.send("<h1>Запрос из неизвестного источника");
	}
});

app.post('/auth_user', function Auth_user(req, res) {
	let data_users = fs.readFileSync('user.json');
	let users = JSON.parse(data_users);
	let auth_user = {
		email: req.body.email,
		password: req.body.password,

	}
	const index = users.findIndex(n => n.email === auth_user.email);
	if (index != -1) {
		fs.writeFileSync('user.json', JSON.stringify(users));
		if (users[index].email === auth_user.email && users[index].password === auth_user.password) {
			let answer = {
				auth_user_id: users[index].id
			}
			res.send(JSON.stringify(answer));
		} else {
			let answer = {
				answer: 'Неверный пароль'
			}
			res.send(JSON.stringify(answer));
		}
	} else {
		let answer = {
			answer: 'Пользователь не найден'
		}
		res.send(JSON.stringify(answer));
	}
});

app.post('/pass_change',function(req,res){
	let data_users = fs.readFileSync('user.json');
	let users = JSON.parse(data_users);
	const index = users.findIndex(n => n.id === req.body.auth_user_id);
		if (index !== -1) {
			if (req.body.password !== users[index].password) {
				let answer = {
					answer: 'Старый пароль введен неверно'
				}
				res.send(JSON.stringify(answer));
			} else {
				users[index].password = req.body.new_password;
				fs.writeFileSync('user.json', JSON.stringify(users));
				let answer = {
					good_answer: 'Пароль успешно изменен'
				}
				res.send(JSON.stringify(answer));
			}
		} else {
			let answer = {
				answer: 'Пользовватель не найден'
			}
			res.send(JSON.stringify(answer));
		}
	});

app.post('/change_settings', upload.fields([{ name: 'photo', maxCount: 1 },{name: 'user_id'},{name: 'first_name'},{name: 'last_name'}]),function(req,res){
	let data_user_settings = fs.readFileSync('user_settings.json');
	let user_settings = JSON.parse(data_user_settings);
	let data_users = fs.readFileSync('user.json');
	let users = JSON.parse(data_users);
	const index = user_settings.findIndex(n => n.user_id === req.body.user_id);
	const index_email = users.findIndex(n => n.id === req.body.user_id);
		if (index !== -1) {
			user_settings[index].first_name = req.body.first_name;
			user_settings[index].last_name = req.body.last_name;
			let file_name = req.body.user_id + '.png';
			user_settings[index].url_photo = file_name;
			fs.createWriteStream('./photo/' + file_name).write(req.files.photo[0].buffer);
			fs.writeFileSync('user_settings.json', JSON.stringify(user_settings));
			let answer = {
				good_answer: 'Настройки изменины!'
			}
			res.send(JSON.stringify(answer));
		} else {
			let answer = {
				answer: 'Пользовватель не найден'
			}
			res.send(JSON.stringify(answer));
		}
});

app.post('/refrash_data',function(req,res){
	let data_user_settings = fs.readFileSync('user_settings.json');
	let user_settings = JSON.parse(data_user_settings);
	let data_users = fs.readFileSync('user.json');
	let users = JSON.parse(data_users);
	const index = user_settings.findIndex(n => n.user_id === req.body.user_id);
	const index_email = users.findIndex(n => n.id === req.body.user_id);
		if (index !== -1) {
			let answer = {
				email: users[index_email].email,
				first_name: user_settings[index].first_name,
				last_name: user_settings[index].last_name,
				photo: 'http://localhost:3001/static/' + user_settings[index].url_photo,
				balance: users[index_email].balance
			}
			res.send(JSON.stringify(answer));
		} else {
			let answer = {
				answer: 'Пользовватель не активен'
			}
			res.send(JSON.stringify(answer));
		}
});

app.post('/orders',function(req,res){
	let data_user_orders = fs.readFileSync('user_orders.json');
	let user_orders = JSON.parse(data_user_orders);
	const index = user_orders.findIndex(n => n.user_id === req.body.user_id);
		if (index !== -1) {
			const data = [];
			user_orders[index].orders.forEach((e,i) => {
				if (i >= parseInt(req.body.page - 1 + '0') && i <= parseInt(req.body.page - 1 + '9')) {
					data.push(e);
				}
			})
			res.send(JSON.stringify(data));
		} else {
			let answer = {
				answer: 'Пользовватель не активен'
			}
			res.send(JSON.stringify(answer));
		}
});

app.post('/length_orders',function(req,res){
	let data_user_orders = fs.readFileSync('user_orders.json');
	let user_orders = JSON.parse(data_user_orders);
	const index = user_orders.findIndex(n => n.user_id === req.body.user_id);
		if (index !== -1) {
			let data = [];
			for (let i = 0; i < Math.ceil(user_orders[index].orders.length / 10); i++) {
				data.push(i + 1);
			}
		res.send(JSON.stringify(data));
		} else {
			let answer = {
				answer: 'Пользовватель не активен'
			}
			res.send(JSON.stringify(answer));
		}
});

app.post('/length_balance',function(req,res){
	let data_user_balance = fs.readFileSync('user_balance.json');
	let user_balance = JSON.parse(data_user_balance);
	const index = user_balance.findIndex(n => n.user_id === req.body.user_id);
		if (index !== -1) {
			let data = [];
			for (let i = 0; i < Math.ceil(user_balance[index].balance_change.length / 10); i++) {
				data.push(i + 1);
			};
		res.send(JSON.stringify(data));
		} else {
			let answer = {
				answer: 'Пользовватель не активен'
			}
			res.send(JSON.stringify(answer));
		}
});

app.post('/balance',function(req,res){
	let data_user_balance = fs.readFileSync('user_balance.json');
	let user_balance = JSON.parse(data_user_balance);
	const index = user_balance.findIndex(n => n.user_id === req.body.user_id);
	if (index !== -1) {
		const data = [];
		user_balance[index].balance_change.forEach((e,i) => {
		if (i >= parseInt(req.body.page - 1 + '0') && i <= parseInt(req.body.page - 1 + '9')) {
			data.push(e);
			}
		})
		res.send(JSON.stringify(data));
	} else {
		let answer = {
			answer: 'Пользовватель не активен'
		}
		res.send(JSON.stringify(answer));
	}
});
