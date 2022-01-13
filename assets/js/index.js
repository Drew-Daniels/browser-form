'use strict';

// const unhide = function(element, visibleClass) {
//   element.classList.add(visibleClass);
// }
// const hide = function(element, visibleClass) {
//   element.classList.remove(visibleClass);
// }
// const getClasses = function(element) {
//   const classList = element.className.split(' ');
//   return classList;
// }
const classify = function(element, ...classesToAdd) {
  element = element.classList.add(...classesToAdd);
  return element;
}
const declassify = function(element, ...classesToRemove) {
  const currClasses = [...element.classList];
  classesToRemove.forEach(function(classToRemove) {
    if (currClasses.includes(classToRemove)) {
      element.classList.remove(classToRemove);
    }
  })
}

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
      let errIcon = formElement.nextElementSibling;
      let sucIcon = errIcon.nextElementSibling;
      if (formElement.validity.typeMismatch) {
        let msg = formControl.getValidationMsg();
        formElement.setCustomValidity(msg);
        declassify(sucIcon, 'visible');
        classify(errIcon, 'visible');
        // formElement.reportValidity();
      } else {
        formElement.setCustomValidity('');
        declassify(errIcon, 'visible');
        classify(sucIcon, 'visible');
      }
    })
  })
}

addListeners(controls);