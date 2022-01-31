"use strict";
import i18Obj from "./translate.js";

console.log(`your score is - 110 points.
Отзывы по пунктам ТЗ:
Все пункты выполнены полностью!`);

/* function for checking semantic */
/* const elemsCount = (selector) => document.querySelectorAll(selector).length;
const predicate = (configItem) => {
    const count = elemsCount(configItem[0]);
    return count >= configItem[1] && count <= configItem[2];
};
const evaluate = (isFullfilled) => (isFullfilled ? 2 : 0);
const isArray = (item) => Array.isArray(item[0]);
const config = [
    [
        ['header', 1, 1],
        ['main', 1, 1],
        ['footer', 1, 1],
    ],
    ['section', 6, Infinity],
    ['h1', 1, 1],
    ['h2', 5, Infinity],
    ['nav', 1, Infinity],
    ['ul', 2, Infinity],
    ['button', 10, Infinity],
    [
        ['input[type="email"]', 1, Infinity],
        ['input[type="tel"]', 1, Infinity],
    ],
    ['textarea', 1, Infinity],
    ['input, textarea[placeholder]', 3, Infinity],
];
config.reduce((sum, configItem) => sum + (isArray(configItem)
    ? evaluate(configItem.every(predicate))
    : evaluate(predicate(configItem))), 0); */

const burger = document.querySelector(".burger");
const burgerNav = document.querySelector(".nav-header");

const portfolioBtn = document.querySelectorAll(".portfolio-btn");
const portfolioBtns = document.querySelector(".portfolio-buttons");
const portfolioImages = document.querySelectorAll(".portfolio-img");
const seasons = ["winter", "spring", "summer", "autumn"];

function closeMenu(event) {
  if (event.target.classList.contains("nav-link")) {
    burger.classList.remove("is-active");
    burgerNav.classList.remove("is-active");
  }
}

burger.addEventListener("click", function () {
  burger.classList.toggle("is-active");
  burgerNav.classList.toggle("is-active");
});

burgerNav.addEventListener("click", closeMenu);

/* PORTFOLIO section*/

/* function changes images --- 1 - variant*/
// function changeImage(event) {
//   if(event.target.classList.contains('portfolio-btn')) {
//     if(event.target.dataset.season === 'winter') {
//       portfolioImages.forEach((img, index) => {
//         img.src = `./assets/img/winter/${index + 1}.jpg`
//       });
//     }
//     if(event.target.dataset.season === 'spring') {
//       portfolioImages.forEach((img, index) => {
//         img.src = `./assets/img/spring/${index + 1}.jpg`
//       });
//     }
//     if(event.target.dataset.season === 'summer') {
//       portfolioImages.forEach((img, index) => {
//         img.src = `./assets/img/summer/${index + 1}.jpg`
//       });
//     }
//     if(event.target.dataset.season === 'autumn') {
//       portfolioImages.forEach((img, index) => {
//         img.src = `./assets/img/autumn/${index + 1}.jpg`
//       });
//     }
//   }
// }

/* function changes images --- 2 - variant*/
function changeImage(event) {
  if (event.target.classList.contains("portfolio-btn")) {
    let season = event.target.dataset.season;
    portfolioImages.forEach((img, index) => {
      img.src = `./assets/img/${season}/${index + 1}.jpg`;
    });
  }
}

/* function add active */
portfolioBtns.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("btn-transparent") &&
    !event.target.classList.contains("portfolio-btn__active")
  ) {
    portfolioBtn.forEach((i) => {
      i.classList.remove("portfolio-btn__active");
      i.classList.add("btn-transparent");
    });
    event.target.classList.add("portfolio-btn__active");
    event.target.classList.remove("btn-transparent");
    changeImage(event);
  }
});

/* function toggle language */

const langContent = document.querySelectorAll("[data-i18]");
const langBtn = document.querySelector(".toogle-lng");
const langBtns = document.querySelectorAll(".lang");

function getTranslate(lang) {
  langContent.forEach((element) => {
    element.textContent = i18Obj[lang][element.dataset.i18];
  });
}

langBtn.addEventListener("click", (event) => {
  langBtns.forEach((element) => {
    element.classList.remove("active");
  });
  event.target.classList.add("active");

  if (event.target.textContent === "ru") {
    getTranslate("ru");
  } else {
    getTranslate("en");
  }
});

/* function cashing img */

function preloadImages() {
  seasons.forEach((season) => {
    for (let i = 0; i < season.length; i++) {
      const img = new Image();
      img.src = `./assets/img/${season}/${i + 1}.jpg`;
    }
  });
}

preloadImages();

/* func change theme */

const themeBtn = document.querySelector(".theme");
const elementsLightTheme = [
  "nav-header",
  "burger",
  "main-container",
  "skills-container",
  "portfolio-container",
  "title-wrapper",
  "section-title",
];

themeBtn.addEventListener("click", (event) => {
  const x = event.target;
  event.target.classList.toggle("active");
  elementsLightTheme.forEach((element) => {
    document.querySelector(`.${element}`).classList.toggle("light-theme");
  });
  if (event.target.classList.contains("active")) {
    document.documentElement.style.setProperty("--body-color", "#FFF");
    document.documentElement.style.setProperty("--main-color", "#000");
  } else {
    document.documentElement.style.setProperty("--body-color", "#000");
    document.documentElement.style.setProperty("--main-color", "#bdae82");
  }
});

/* add data to local Storage */
let lang;
let theme;

function setLangLocalStorage() {
  langBtns.forEach((element) => {
    if (element.classList.contains("active")) {
      lang = element.textContent;
      localStorage.setItem("lang", lang);
    }
  });
}

function setThemeLocalStorage(event) {
  if (event.target.classList.contains("active")) {
    theme = "light";
    localStorage.setItem("theme", theme);
  } else {
    theme = "dark";
    localStorage.setItem("theme", theme);
  }
}

langBtn.addEventListener("click", setLangLocalStorage);
themeBtn.addEventListener("click", setThemeLocalStorage);

window.addEventListener("beforeunload", setLangLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("lang")) {
    const lang = localStorage.getItem("lang");
    langBtns.forEach((element) => {
      if (element.textContent === lang) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
    getTranslate(lang);
  }

  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
    if (!themeBtn.classList.contains('active') && theme === 'light') {
      themeBtn.classList.toggle('active')
      elementsLightTheme.forEach((element) => {
        document.querySelector(`.${element}`).classList.toggle("light-theme");
      });
      document.documentElement.style.setProperty("--body-color", "#FFF");
      document.documentElement.style.setProperty("--main-color", "#000");
    }
    else {
      document.documentElement.style.setProperty("--body-color", "#000");
      document.documentElement.style.setProperty("--main-color", "#bdae82");
    }
  }
}

window.addEventListener("load", getLocalStorage);
