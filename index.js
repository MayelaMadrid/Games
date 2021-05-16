const canela = document.getElementById("canela");
const grid = document.getElementById("grid");
const score = document.getElementById("score");
const scoreModal = document.querySelector("#modal-lose>div>#score-modal");
const modal = document.getElementById("modal-lose");
let intervalCanela = 0;
let intervalPatos = 0;
let scorePatos = 0;
let topCanela = 150;
const speedDown = 15;
const speedUp = -25;
let patos = [];
canela.style.top = topCanela;

const goDown = () => {
  canela.classList.remove("animation-up");
  topCanela += speedDown;
  canela.classList.add("animation-down");
  canela.style.top = topCanela + "px";
  checkCrash();
};

function startGame() {
  startAgain();
  score.innerHTML = scorePatos;
  modal.style.display = "none";
  intervalCanela = setInterval(goDown, 300);
  intervalPatos = setInterval(randomPato, 1000);
}
const checkKey = ({ keyCode }) => {
  switch (keyCode) {
    case 32:
      startGame();
      break;
    case 38:
      jump();
      break;
    case 40:
      goDown();
      break;
  }
};

const jump = () => {
  canela.classList.remove("animation-down");
  topCanela += speedUp;
  canela.classList.add("animation-up");
  canela.style.top = topCanela + "px";
  checkCrash();
};

const randomPato = () => {
  const newPato = document.createElement("img");
  newPato.src = "./img/pato.jpg";
  newPato.style.left = "1100px";
  newPato.style.top = getRandomArbitrary(20, 500) + "px";
  newPato.classList.add("animation-pato");
  patos.push(newPato);
  grid.appendChild(newPato);
};
const startAgain = () => {
  clearInterval(intervalCanela);
  clearInterval(intervalPatos);
  topCanela = 150;
  scorePatos = 0;

  patos.forEach((pato) => {
    grid.removeChild(pato);
  });
  patos = [];
};

const checkCrash = () => {
  var aRect = canela.getBoundingClientRect();
  var gridRect = grid.getBoundingClientRect();
  if (gridRect.bottom < aRect.bottom || gridRect.top > aRect.top) {
    modal.style.display = "flex";
    scoreModal.innerHTML = scorePatos;
    startAgain();
  }
  patos.forEach((pato) => {
    const valuePato = pato.getBoundingClientRect();

    if (isCollide(aRect, valuePato)) {
      modal.style.display = "flex";
      scoreModal.innerHTML = scorePatos;
      startAgain();
    }
    if (aRect.left > valuePato.left) {
      grid.removeChild(pato);
      patos = patos.filter((p) => p != pato);
      scorePatos++;
      score.innerHTML = scorePatos;
    }
  });
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function isCollide(aRect, bRect) {
  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

document.addEventListener("keyup", checkKey);
