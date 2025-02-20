import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';
import Contato from './modules/Contato';


import './assets/css/style.css';


//login 
const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
login.init();
cadastro.init();


//contato
const contatoEdit = new Contato('.contato-edit');
const contatoRegister = new Contato('.contato-register');
contatoEdit.init();
contatoRegister.init();