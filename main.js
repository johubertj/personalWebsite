// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCGrlNjkU0S6-QJCMCSmnqBqZ1B3naSuLA",
    authDomain: "personal-website-conta.firebaseapp.com",
    projectId: "personal-website-conta",
    storageBucket: "personal-website-conta.appspot.com",
    messagingSenderId: "478586540825",
    appId: "1:478586540825:web:e41c4a961fc3f94e0fab88"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var messageRef = firebase.database().ref('contact-info');

function submitForm(e) {
    //the default behavior is to submit to the html page, so this is how we prevent it
    e.preventDefault();

    var name = getInputValues('Name');
    var subject = getInputValues('Subject');
    var email = getInputValues('Email');
    var message = getInputValues('Message');

    //save the message to firebase
    saveMessage(name, subject, email, message);


    //purpose: show the alert after we send the message 
    document.querySelector('.alert').style.display = 'block';

    //hide alert after 5 seconds
    setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
    }, 4000)

    //clears the form after submitting
    document.getElementById('contact-form').reset();
}

//purpose: function to get form values in the text boxes
function getInputValues(id) {
    return document.getElementById(id).value;
}

document.getElementById('contact-form').addEventListener('submit', submitForm);

function saveMessage(name, subject, email, message) {
    var newMessageRef = messageRef.push();
    newMessageRef.set({
        name: name,
        subject: subject,
        email: email,
        message: message
    });
}

// purpose: type writer function
const TypeWriter = function (txtElement, words, wait) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

//Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

// Type Method
TypeWriter.prototype.type = function () {
    // Current index of word
    const current = this.wordIndex % this.words.length;

    console.log(this.wordIndex);
    console.log(this.words.length);
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 130;

    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}

//setting themes here
let theme = localStorage.getItem('theme')

if (theme == null) {
    setTheme('light')
} else {
    setTheme(theme)
}

let themeDots = document.getElementsByClassName('theme-dot')


for (var i = 0; themeDots.length > i; i++) {
    themeDots[i].addEventListener('click', function () {
        let mode = this.dataset.mode
        console.log('Option clicked:', mode)
        setTheme(mode)
    })
}

function setTheme(mode) {
    if (mode == 'light') {
        document.getElementById('theme-style').href = 'default.css'
    }

    if (mode == 'blue') {
        document.getElementById('theme-style').href = 'blue.css'
    }

    if (mode == 'green') {
        document.getElementById('theme-style').href = 'green.css'
    }

    if (mode == 'purple') {
        document.getElementById('theme-style').href = 'purple.css'
    }

    localStorage.setItem('theme', mode)
}

// purpose: grabs the inner part of the card and when click it will toggle is flipped option in css, which will rotate the card
const card = document.querySelector(".card__inner");
const card2 = document.querySelector(".card__inner2");
const card3 = document.querySelector(".card__inner3");


card.addEventListener("click", function (e) {
    card.classList.toggle('is-flipped');
});

card2.addEventListener("click", function (e) {
    card2.classList.toggle('is-flipped2');
});

card3.addEventListener("click", function (e) {
    card3.classList.toggle('is-flipped3');
});

