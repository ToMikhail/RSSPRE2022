const joke = document.querySelector(".joke");
const btn = document.querySelector(".btn");
const audio = document.querySelector(".audio");
const img = document.querySelector(".img");
const lng = document.querySelector(".lng");
const sliderBtn = document.querySelector(".slider");

async function getData() {
  if (sliderBtn.classList.contains("active")) {
    const url = "./assets/quotes.json";
    const res = await fetch(url);
    const data = await res.json();
    let num = getRandomNumber();
    joke.textContent = `"${data[num].text}"`;
  } else {
    const url = "https://api.icndb.com/jokes/random";
    const res = await fetch(url);
    const data = await res.json();
    joke.textContent = `"${data.value.joke}"`;
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

function setLng() {
  if (sliderBtn.classList.contains("active")) {
    lng.textContent = "EN";
  } else {
    lng.textContent = "BLR";
  }
}

function startAudio() {
  audio.currentTime = 0;
  setTimeout(() => audio.play(), 500);
}

function shakeImg() {
  img.classList.add("active");
  setTimeout(() => img.classList.remove("active"), 4000);
}

getData();

btn.addEventListener("click", getData);
btn.addEventListener("click", startAudio);
btn.addEventListener("click", shakeImg);
sliderBtn.addEventListener("click", () => {
  sliderBtn.classList.toggle("active");
  setLng();
});
sliderBtn.addEventListener("click", getData);

console.log(`Ваша отметка - 70 балла(ов)
Отзыв по пунктам ТЗ:

Все пункты выполнены полностью!
`);
