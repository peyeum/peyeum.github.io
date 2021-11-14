// element selector function using query selector
const el = function selectElementAndReturnAsElementOrNodeList(target) {
  // check whether the target is a nodelist
  return document.querySelectorAll(target).length !== undefined &&
    document.querySelectorAll(target).length > 1
    ? document.querySelectorAll(target)
    : document.querySelector(target);
};

// hamburger button rule
const overham = function makeOverlayAppearAndSomeAnimation() {
  const hamburger = el(".hamburger");
  const overlay = el(".overlay");

  if (overlay.classList.contains("active")) {
    setTimeout(() => overlay.classList.toggle("active"), 250);
  } else overlay.classList.toggle("active");

  hamburger.firstElementChild.classList.toggle("ham0");
  hamburger.firstElementChild.nextElementSibling.classList.toggle("ham1");
  hamburger.lastElementChild.classList.toggle("ham2");
  hamburger.previousElementSibling.classList.toggle("mobile");
  el("nav").classList.toggle("nav-menu");
};

// custom scroll function
const meScroll = function scrollToTargettedElement(target) {
  const { height: navH } = el("nav").getBoundingClientRect();
  const yLoc = el(target).offsetTop - navH + 35;

  return scrollTo(0, yLoc);
};

// idk just random
const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// detect viewport
const getViewport = function getViewportOfScreen() {
  let viewportWidth;
  let viewportHeight;

  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  if (typeof window.innerWidth != "undefined") {
    (viewportWidth = window.innerWidth), (viewportHeight = window.innerHeight);
  }

  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  else if (
    typeof document.documentElement != "undefined" &&
    typeof document.documentElement.clientWidth != "undefined" &&
    document.documentElement.clientWidth != 0
  ) {
    (viewportWidth = document.documentElement.clientWidth),
      (viewportHeight = document.documentElement.clientHeight);
  }
  return [viewportWidth, viewportHeight];
};

// typewritter effect
// window.addEventListener("load", () => scrollTo(0, 0));
(() => {
  const texts = [
    "Hello World!🌏",
    "I'm Muhammad Farhan.",
    "Student | Mechanic",
  ];
  let count = 0;
  let index = 0;
  let currentText = "";
  let letter = "";

  (function typewritter() {
    if (count === texts.length) return console.log("welcome!");

    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    el(".greetings>*").forEach((e, i) => {
      if (i === count) {
        e.textContent = letter;
        e.classList.add("blink-cursor");
      }
    });

    if (letter.length === currentText.length) {
      count++;
      index = 0;
      el(".greetings>*").forEach((e, i) => {
        if (e.classList.contains("blink-cursor"))
          if (i !== 2) e.classList.remove("blink-cursor");
      });
    }

    setTimeout(typewritter, randomInteger(60, 150));
  })();
})();

// theme button
el(".theme").addEventListener("click", function () {
  const html = el("html");
  html.dataset.colorMode !== "dark"
    ? (html.dataset.colorMode = "dark")
    : html.dataset.colorMode === "dark"
    ? (html.dataset.colorMode = "light")
    : false;

  let theme;
  html.dataset.colorMode === "dark" ? (theme = "Dark") : (theme = "Light");
  //el(".info").ariaLabel = theme;
});

//  click logo to scroll to top
el(".logo > *").onclick = () => scrollTo(0, 0);

// transparent navbar on scroll
document.addEventListener("scroll", function () {
  const navbar = el("nav");

  if (this.body.scrollTop > 1 || this.documentElement.scrollTop > 1) {
    navbar.classList.add("nav-scrolled");
  } else {
    navbar.classList.remove("nav-scrolled");
  }
});

// hamburger button
el(".hamburger").addEventListener("click", overham);

el(".overlay").addEventListener("click", function ({ target }) {
  if (target === this) overham();
});

// hide sub navbar when about projects contact and logo clicked
document.addEventListener("click", ({ target }) => {
  const elements = [el(".logo > *"), ...el(".sub-nav li"), ...el("li a")];

  elements.includes(target) ? overham() : false;
});

// pesan dari contact us
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwdhopsKCvYlcyFz17fK8_ffci8Mfsyy9Az0HSnFHBotx08lfC4jQ2cevPH4klCITi-/exec";
const form = document.forms["submit-to-google-sheet"];
const submit = el(".submit");
const alert = {
  element: el(".alert"),
  alertMsg: ["Message sent, Thankyou!", "Sorry, Can't send message..."],
  success() {
    ["d-none", "success"].forEach((e) => this.element.classList.toggle(e));
    this.element.children[0].textContent = this.alertMsg[0];
  },
  error() {
    ["d-none", "error"].forEach((e) => this.element.classList.toggle(e));
    this.element.children[0].textContent = this.alertMsg[1];
  },
  loading() {
    this.element.parentNode.lastElementChild.classList.toggle("loading");
  },
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // ketika disubmit tombol kirim hilang tombol loading muncul
  alert.loading();
  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
  })
    .then((response) => {
      console.log("Success!", response);
      alert.loading();
      alert.success();
      form.reset();
    })
    .catch((error) => {
      console.error("Error!", error.message);
      alert.loading();
      alert.error();
    });
});

// close alert button
el(".dismiss").addEventListener("click", function () {
  this.parentElement.classList.replace(
    this.parentElement.classList.item(1),
    "d-none"
  );
});

// email validation
el("input[type=email]").addEventListener("change", function () {
  !this.checkValidity() ? (this.value = "") : false;
});
