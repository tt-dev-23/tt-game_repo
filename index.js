const button = document.getElementById("main__button");
const timeCounter = document.getElementById("main__time-counter");
const picturesField = document.getElementById("main__start-game");
const modalPage = document.getElementById("modalId");
const closeModal = document.getElementsByClassName("modal__class-close")[0];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const myRes = [];
let picture;
let timerId;
let startTime;
let elTime = 0;

const randomElements = (array) => {
  if (!array) {
    return;
  }
  return [...array].sort(() => Math.random() - 0.5);
};

const formatTime = (ms) => {
  const sec = Math.floor((ms % 60000) / 1000);
  const msec = ms % 1000;
  return `${sec.toString().padStart(1, "0")}:${msec
    .toString()
    .padStart(3, "0")
    .slice(0, 2)}`;
};

const main = () => {
  const shuffleNumbers = randomElements(numbers);

  button.disabled = true;

  const startTimer = () => {
    startTime = Date.now() - elTime;
    timerId = setInterval(() => {
      elTime = Date.now() - startTime;
      timeCounter.textContent = formatTime(elTime);
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(timerId);
  };

  const openModal = () => {
    modalPage.style.display = "block";
  };

  closeModal.onclick = () => {
    modalPage.style.display = "none";
    location.reload();
  };

  modalPage.onclick = (event) => {
    if (event.target == modalPage) {
      modalPage.style.display = "none";
      location.reload();
    }
  };

  const buttonEnable = () => {
    button.disabled = false;
    button.innerText = "START";
  };

  const answerCheck = (index) => {
    picture.addEventListener("click", (event) => {
      if (numbers[myRes.length] === shuffleNumbers[index]) {
        event.target.style.opacity = "0.33";
        myRes.push(shuffleNumbers[index]);
        if (myRes.length === shuffleNumbers.length) {
          stopTimer();
          openModal();
          buttonEnable();
        }
      } else {
        alert("Wrong");
      }
    });
  };

  const createElements = () => {
    for (let i = 0; i < shuffleNumbers.length; i++) {
      picture = document.createElement("div");
      picture.classList.add("new-picture");
      picture.textContent = shuffleNumbers[i];
      picturesField.appendChild(picture);
      answerCheck(i);
    }
  };
  createElements();
  startTimer();
};

button.onclick = (element) => {
  element.innerText = "Game Started";
  main();
};
