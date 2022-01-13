'use strict';

const userEmail = document.querySelector('#user-email');
const userCountry = document.querySelector('#user-country');
const userZIP = document.querySelector('#user-zip');
const userPwd = document.querySelector('#user-pwd');
const userPwdCnf = document.querySelector('#user-pwd-cnf');

class Control {
  constructor(HTMLElement, validationMsg) {
    this.HTMLElement = HTMLElement;
    this.validationMsg = validationMsg;
  }
  getHTMLElement() {
    return this.HTMLElement;
  }
  getValidationMsg() {
    return this.validationMsg;
  }
}

const email = new Control(userEmail, 'Please enter a valid email address');
const country = new Control(userCountry, 'Please enter a valid country');
const ZIP = new Control(userZIP, 'Please enter a valid ZIP code');
const pwd = new Control(userPwd, 'Please enter a password');
const pwdCnf = new Control(userPwdCnf, 'Password does not match')

const controls = [
  email,
  country,
  ZIP,
  pwd,
  pwdCnf,
]

function addListeners(formControls) {
  formControls.forEach(formControl => {
    let formElement = formControl.getHTMLElement();
    formElement.addEventListener('input', function(event) {
      if (formElement.validity.typeMismatch) {
        let msg = formControl.getValidationMsg();
        formElement.setCustomValidity(msg);
        formElement.reportValidity();
      } else {
        formElement.setCustomValidity('');
      }
    })
  })
}

addListeners(controls);