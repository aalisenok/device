const dueDate = document.getElementById('dueDate')
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const date = new Date();
date.setDate(date.getDate() + 11);

const dueYear = date.getFullYear()
const dueMonth = months[date.getMonth()]
const dueDay = date.getDate();

dueDate.textContent = `${dueDay} ${dueMonth} ${dueYear}`;

const updateCountdown = () => {
    const now = new Date();
    const updateDate = date - now;

    if (updateDate <= 0) {
        clearInterval(countdownInterval);
        return;
    }

    let updateDays = Math.floor(updateDate / (1000 * 60 * 60 * 24));
    let updateHours = Math.floor((updateDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let updateMin = Math.floor((updateDate % (1000 * 60 * 60) / (1000 * 60)));
    let updateSec = Math.floor((updateDate % (1000 * 60)) / 1000);

    updateSec < 10 ? updateSec = '0' + updateSec : updateSec
    updateMin < 10 ? updateMin = '0' + updateMin : updateMin
    updateHours < 10 ? updateHours = '0' + updateHours : updateHours

    document.getElementById('days').textContent = updateDays;
    document.getElementById('hours').textContent = updateHours;
    document.getElementById('min').textContent = updateMin;
    document.getElementById('sec').textContent = updateSec;
}
let countdownInterval = setInterval(updateCountdown, 1000)
updateCountdown();

const plansSelector = document.getElementById('plansSelector');
const plansMenu = document.getElementById('plansMenu');
const plansItems = document.querySelectorAll('.plans__item');

const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const company = document.getElementById('company');
const phone = document.getElementById('phone');
const formControls = document.querySelectorAll('.form__control');
let hasError;

form.addEventListener('submit', e => {
    e.preventDefault()
    checkInputs()
})

plansSelector.addEventListener('click', () => {
    plansSelector.classList.toggle('isOpen')
    plansMenu.classList.toggle('show-plans')
})

plansItems.forEach(item => item.addEventListener('click', checked));

function checked() {
    plansItems.forEach(item => item.classList.remove('selected'));
    this.classList.add('selected');

    plansMenu.classList.toggle('show-plans');
    plansSelector.classList.toggle('isOpen');

    plansSelector.firstElementChild.textContent = this.firstElementChild.textContent
    plansSelector.firstElementChild.nextElementSibling.textContent = this.firstElementChild.nextElementSibling.textContent
}

function checkInputs() {
    let nameValue = name.value.trim();
    let emailValue = email.value.trim();
    let companyValue = company.value.trim();
    let phoneValue = phone.value.trim();
    hasError = false;

    if (nameValue === '') {
        setErrorFor(name);
        hasError = true;
    }

    if (emailValue === '') {
        setErrorFor(email);
    } else if (!isValid(emailValue)) {
        setErrorFor(email);
        hasError = true;
    }

    if (companyValue === '') {
        setErrorFor(company);
        hasError = true;
    }

    if (phoneValue === '') {
        setErrorFor(phone);
        hasError = true;
    }

    if (!hasError) {
        clearInputs();
    }

}

function setErrorFor(input) {
    const formControl = input.parentElement;
    formControl.classList.toggle('hasError');
}

function clearInputs() {
    name.value = '';
    email.value = '';
    company.value = '';
    phone.value = '';
    formControls.forEach(formControl => formControl.classList.remove('hasError'));
    inputs.forEach(item => item.classList.remove('filled'))
}

function isValid(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
const inputs = document.querySelectorAll('input')
inputs.forEach(item => {
    item.addEventListener('keyup', () => item.value.length > 0 ? item.classList.add('filled') : clearInputs())
})