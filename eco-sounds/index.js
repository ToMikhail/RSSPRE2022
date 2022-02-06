import lang from "./translate.js";
const playBtn = document.querySelector(".btn-play");
const audio = document.querySelector(".audio");
const birdBtns = document.querySelector(".nav-items");
const birdNamesBtn = document.querySelectorAll("[data-name]");
const langBtn = document.querySelector('.lang')

let isPlay = false;
let image = document.querySelector(".main-container");
// (birdNamesBtn[0].childNodes[1].textContent = 'asdasd')

// console.log(lang['en']);



/* change lang */

langBtn.addEventListener('click', () => {
  langBtn.classList.toggle('russian');
  changeLang();

  if(langBtn.classList.contains('russian')) {
    langBtn.textContent = 'EN';
  }
  else {
    langBtn.textContent = 'RU';
  }
})

/* func change lang content */
function changeLang() {
  let currentLang = langBtn.textContent
  birdNamesBtn.forEach(element => {
    let name = element.dataset.name;
    element.textContent = lang[currentLang][name]
  });
}

/* Music */
function playMusic() {
  audio.currentTime = 0;
  audio.play();
  isPlay = true;
}

function pauseMusic() {
  audio.pause();
  isPlay = false;
}

/* change PLAY/PAUSE */
playBtn.addEventListener("click", () => {
  playBtn.classList.toggle("pause");
  if (!isPlay) {
    playMusic();
  } else {
    pauseMusic();
  }
});

/* change picture */

birdBtns.addEventListener("click", (event) => {
  birdNamesBtn.forEach((element) => {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    }
  });
  event.target.closest("li").classList.add("active");
  let birdImg = event.target.closest("li").dataset.name;
  image.style.backgroundImage = `url(./assets/img/${birdImg}.jpg)`;
  audio.src = `./assets/audio/${birdImg}.mp3`;
  if (playBtn.classList.contains("pause")) audio.play();
});

console.log(`Ваша отметка - 70 балла(ов)
Отзыв по пунктам ТЗ:
Все пункты выполнены полностью!
`);
