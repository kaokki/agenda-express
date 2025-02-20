import validator from 'validator';

export default class Contato{
    constructor(formClass){
        this.form = document.querySelector(formClass);
    }

    init(){
      this.events();
    }

    events(){
      if(!this.form) return;
      this.form.addEventListener('submit', e=> {
        e.preventDefault();
        this.validate(e);
      });
    }

    validate(e){
      const el = e.target;
      const emailInput = el.querySelector('input[name="email"]');
      const nomeInput = el.querySelector('input[name="nome"]');
      //const sobrenomeInput = el.querySelector('input[name="sobrenome"]');
      const telefoneInput = el.querySelector('input[name="telefone"]');

      let error = false;

      // if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
      // if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
      // if(!this.body.email && !this.body.telefone) {
      //   this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone.');
      // }

      for(let errorText of document.querySelectorAll('.error-text')) {
        errorText.remove();
      }

      if(!nomeInput.value) {
        this.criaErro(nomeInput, 'Nome é um campo obrigatório.');
        error = true;
      }

      if(!emailInput.value && !telefoneInput.value ) {
        this.criaErro(this.form, 'Pelo menos um contato precisa ser enviado: e-mail ou telefone.');
        error = true;
      }

      if(emailInput.value && !validator.isEmail(emailInput.value)) {
        this.criaErro(emailInput, 'E-mail invalido');
        error = true;
      }


      // if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
      //   this.criaErro(passwordInput, 'A senha precisa ter entre 3 e 50 caracteres');
      //   error = true;
      // }

      if(!error) el.submit();

    }

    criaErro(campo, msg) {
      const div = document.createElement('div');
      div.innerHTML = msg;
      div.classList.add('error-text');
      campo.insertAdjacentElement('afterend', div);
    }
}