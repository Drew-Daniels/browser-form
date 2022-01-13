'use strict';

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

class BaseControl {
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

class TypeControl extends BaseControl {
  constructor(HTMLElement, validationMsg) {
    super(HTMLElement, validationMsg);
  }
  fails() {
    return this.HTMLElement.validity.typeMismatch;
  }
}

class PatternControl extends BaseControl {
  constructor(HTMLElement, validationMsg) {
    super(HTMLElement, validationMsg);
  }
  fails() {
    return (
      this.HTMLElement.validity.patternMismatch ||
      this.HTMLElement.validity.tooShort ||
      this.HTMLElement.validity.tooLong
    )
      ;
  }
}

class PwdCnfControl extends BaseControl {
  constructor(HTMLElement, validationMsg, siblingControl) {
    super(HTMLElement, validationMsg);
    this.siblingControl = siblingControl;
  }
  fails() {
    if (this.siblingControl.HTMLElement.value !== this.HTMLElement.value) {
      return true;
    }
    else return false;
  }
}

const emailControl = new TypeControl(userEmail, 'Please enter a valid email address');
const countryControl = new TypeControl(userCountry, 'Please enter a valid country');

const ZIPControl = new PatternControl(userZIP, 'Please enter a valid 5-digit ZIP code');
const pwdControl = new PatternControl(userPwd, 'Please enter a password with a minimum of 8 characters, at least 1 letter, 1 number, and 1 special character');
const pwdCnfControl = new PwdCnfControl(userPwdCnf, 'Password does not match', pwdControl);

const controls = [
  emailControl,
  countryControl,
  ZIPControl,
  pwdControl,
  pwdCnfControl,
]

function addListeners(formControls) {
  formControls.forEach(formControl => {
    let formElement = formControl.getHTMLElement();
    formElement.addEventListener('input', function() {
      let errIcon = formElement.nextElementSibling;
      let sucIcon = errIcon.nextElementSibling;
      if (formControl.fails()) {
        let msg = formControl.getValidationMsg();
        formElement.setCustomValidity(msg);
        declassify(sucIcon, 'visible');
        classify(errIcon, 'visible');
        formElement.reportValidity();
      } else {
        formElement.setCustomValidity('');
        declassify(errIcon, 'visible');
        classify(sucIcon, 'visible');
      }
    });
  })
}

addListeners(controls);