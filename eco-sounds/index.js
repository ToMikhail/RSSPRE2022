const playBtn = document.querySelector(".btn-play");
const audio = document.querySelector(".audio");
const birdBtns = document.querySelector('.nav-items')
const birdNamesBtn = document.querySelectorAll('[data-name]') 

let isPlay = false;
let image = document.getElementsByClassName('пшет main-container')

console.log(image);

/* change PLAY/PAUSE */
playBtn.addEventListener("click", () => {
  playBtn.classList.toggle("pause");
  if(!isPlay){
    playMusic();
  }
  else {
    pauseMusic();
  }
});

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

/* change picture */

birdBtns.addEventListener('click', (event) => {
  birdNamesBtn.forEach(element => {
    if(element.classList.contains('active')) {
      element.classList.remove('active')
    }
  });
  event.target.closest('li').classList.add('active');
  let birdImg = event.target.closest('li').dataset.name;
  image.style.background = "assets/img/drozd.jpg";
  console.log('image: ', image.style);
})


