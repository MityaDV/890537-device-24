var buttons = document.querySelectorAll(".slider-button-list .slider-button");
var slides = document.querySelectorAll(".slider-list .slider-item");
var servicesButton = document.querySelectorAll(".services-item .btn-services");
var servicesContent = document.querySelectorAll(".services-content .services-column");
var contacts = document.querySelector(".btn-contacts");
var letter = document.querySelector(".modal-letter");
var closeLetter = letter.querySelector(".modal-close");
var form = letter.querySelector(".letter-form");
var map = document.querySelector(".modal-map");
var close = map.querySelector(".modal-close");
var info = document.getElementById("js-actions-map");
var login = letter.querySelector("[name=login-user]");
var email = letter.querySelector("[name=email-user]");
var text = letter.querySelector("[name=letter-user]");
var isStorageSupport = true;
var storageEmail = "";
var storage = "";
var servicesActive;
var slideActive;

var toggleSlides = function(currentSlide) {

  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove("slider-item-active");
  }

  currentSlide.classList.add("slider-item-active");
};

var onSliderButtonClick = function() {
  slideActive = document.getElementById(this.dataset.slide);

  toggleSlides(slideActive);

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("slider-button-active");
  }

  this.classList.add("slider-button-active");
};

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", onSliderButtonClick);
};

var toggleContent = function(currentServices) {
  for (var i = 0; i < servicesContent.length; i++) {
    servicesContent[i].classList.remove("services-active");
  }

  currentServices.classList.add("services-active");
};

var onServicesBtnClick = function() {
  servicesActive = document.getElementById(this.dataset.services);

  toggleContent(servicesActive);

  for (var i = 0; i < servicesButton.length; i++) {
    servicesButton[i].classList.remove("btn-services-active");
  }

  this.classList.add("btn-services-active");
};

for (var i = 0; i < servicesButton.length; i++) {
  servicesButton[i].addEventListener("click", onServicesBtnClick);
}

try {
  storage = localStorage.getItem("login");
  storageEmail = localStorage.getItem("email");
} catch (err) {
    isStorageSupport = false;
  }

contacts.addEventListener("click", function(evt) {
  evt.preventDefault();

  letter.classList.add("modal-open");

  if (storage) {
    login.value = storage;
    email.value = storageEmail;
    text.focus();
  } else {
      login.focus();
    }
});

closeLetter.addEventListener("click", function(evt) {
  evt.preventDefault();

  letter.classList.remove("modal-open");
  letter.classList.remove("modal-error");
});

form.addEventListener("submit", function(evt) {
  if (!login.value || !email.value || !text.value) {
    evt.preventDefault();

    letter.classList.add("modal-error");
  } else {
      if (isStorageSupport) {
        localStorage.setItem("login", login.value.trim());
        localStorage.setItem("email", email.value.trim());
      }
    }
});

document.addEventListener("keyup", function(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    if (letter.classList.contains("modal-open")) {
      letter.classList.remove("modal-open");
      letter.classList.remove("modal-error");
    }
  }
});

var toggleMap = function() {
  if (map.classList.contains("modal-open")) {
    map.classList.remove("modal-open");
  } else {
      map.classList.add("modal-open");
    }
}

info.addEventListener("click", function(evt) {
  evt.preventDefault();
  toggleMap();
});
  
close.addEventListener("click", function(evt) {
  evt.preventDefault();
  toggleMap();
});

document.addEventListener("keyup", function(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    toggleMap();
  }
});