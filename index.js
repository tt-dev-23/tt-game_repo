const button = document.getElementById("main__button");
const timeCounter = document.getElementById("main__time-counter");
const picturesField = document.getElementById("main__start-game");
const modalPage = document.getElementById("modalId");
const modalBlock = document.getElementById("modalBlock");
const closeModal = document.getElementsByClassName("modal__class-close")[0];
const modalText = document.createElement("h2");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let myRes = [];
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
  const min = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.floor((ms % 60000) / 1000);
  const msec = Math.floor((ms % 1000) / 10);
  return `${min ? min.toString().padStart(1, "0") + ":" : ""}${sec
    .toString()
    .padStart(2, "0")}:${msec.toString().padStart(2, "0")}`;
};

const resetGame = () => {
  picturesField.innerHTML = "";
  myRes = [];
  elTime = 0;
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

  const createModalText = () => {
    modalText.textContent = "";
    modalBlock.appendChild(modalText);
  };

  const rightAnswers = () => {
    modalPage.style.display = "block";
    createModalText();
    modalText.textContent = "Congratulation, You WIN ...";
  };

  const wrongAnswer = () => {
    modalPage.style.display = "block";
    createModalText();
    modalText.textContent = "Your answer is wrong ...";
  };

  closeModal.onclick = () => {
    modalPage.style.display = "none";
  };

  modalPage.onclick = (event) => {
    if (event.target == modalPage) {
      modalPage.style.display = "none";
    }
  };

  const buttonEnable = () => {
    button.disabled = false;
    button.innerText = "START";
    button.style.backgroundColor = "#b8ab9e";
    button.style.border = "1px solid #b8ab9e";
    button.style.color = "#fff";
    button.style.opacity = "1";
    button.style.cursor = "pointer";
  };

  const answerCheck = (index) => {
    picture.addEventListener("click", (event) => {
      if (numbers[myRes.length] === shuffleNumbers[index]) {
        event.target.style.opacity = "0.33";
        event.target.style.pointerEvents = "none";
        myRes.push(shuffleNumbers[index]);
        if (myRes.length === shuffleNumbers.length) {
          stopTimer();
          rightAnswers();
          buttonEnable();
          resetGame();
        }
      } else {
        wrongAnswer();
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

button.onclick = () => {
  button.innerText = "Game Started";
  button.style.backgroundColor = "#fff";
  button.style.color = "#b8ab9e";
  button.style.opacity = "0.4";
  button.style.cursor = "default";
  main();
};
