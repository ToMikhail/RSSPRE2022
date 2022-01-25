"use strict";
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
const portfolioImages = document.querySelectorAll('.portfolio-img');
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

/* function changes images */
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

/* function changes images */
function changeImage(event) {
  if(event.target.classList.contains('portfolio-btn')) {
    let season = event.target.dataset.season;
    portfolioImages.forEach((img, index) => {
      img.src = `./assets/img/${season}/${index + 1}.jpg`
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



