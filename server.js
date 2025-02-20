require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
	.then(() => {
		app.emit('pronto');
	})
	.catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');

//const helmet = require('helmet');
const csrf = require('csurf');
const { checkCsrfError, csrfMiddleware, middlewareGlobal } = require('./src/middlewares/middlewares');

app.use(express.urlencoded({extended: true})); //pode postar formulario pra dentro da app
app.use(express.json()); //parse de json pra dentro da app 
app.use(express.static(path.resolve(__dirname, 'public'))); // arquivos estatico que podem ser acessados diretamente
//app.use(helmet());

const sessionOptions = session({
	secret: 'asiodjsaoidjasiojdsa',
	store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7,
		httpOnly: true
	}
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
//middlewares
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(middlewareGlobal);

app.use(routes);

app.on('pronto', () => {
	app.listen(3000, () => {
		console.log('rodando em: http://localhost:3000');
	});
});