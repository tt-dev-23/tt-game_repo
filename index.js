const button = document.getElementById("main__button");
const timeCounter = document.getElementById("main__time-counter");
const storyName = document.getElementById("main__story-name");
const picturesField = document.getElementById("main__start-game");
const modalPage = document.getElementById("modalId");
const modalBlock = document.createElement("div");
const modalText = document.createElement("h2");
const modalTime = document.createElement("h3");
const links = [];
let currentStory = [];
let photoWidth;
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

const getPlayerTime = () => {
  let playerTime = new Date(elTime);
  let min = playerTime.getMinutes();
  let sec = playerTime.getSeconds();
  let msec = Math.round(playerTime.getMilliseconds() / 10);
  let formatedPlayerTime = `${min ? min + ":" : ""}${sec}:${msec}`;
  modalTime.textContent = `Your time is: ${formatedPlayerTime}`;
};

const resetGame = () => {
  picturesField.innerHTML = "";
  modalPage.innerHTML = "";
  modalPage.style.backgroundColor = "";
  myRes = [];
  elTime = 0;

};

fetch("https://git.door43.org/ru_gl/rsl_obs/raw/branch/master/10.md")
  .then((response) => response.text())
  .then((text) => {
    let currentText = text.match(/^(.*)$/m)[0];
    storyName.textContent = currentText;
    const lines = text.split("\n");
    const regex = /https:\/\/[a-zA-Z0-9\/\-._]+\.jpg/g;
    for (let i = 0; i < lines.length; i++) {
      const parts = lines[i].split("\t");
      parts.forEach((item) => {
        const matches = item.match(regex);
        if (matches) {
          links.push(...matches);
        }
      });
    }
  })
  .catch((error) => console.error(error));

const main = () => {
  const shuffleNumbers = randomElements(links);

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

  const createModalBlock = () => {
    modalBlock.classList.add("modal__class-content");
    modalText.textContent = "Congratulation, You WIN ...";
    modalTime.textContent = "";
    modalPage.appendChild(modalBlock);
    modalBlock.appendChild(modalText);
    modalBlock.appendChild(modalTime);
    getPlayerTime();
  };

  const rightAnswers = () => {
    modalPage.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    modalPage.style.display = "block";
    createModalBlock();
  };

  const wrongAnswer = () => {
    modalPage.style.display = "block";
    setTimeout(() => {
      modalPage.style.display = "none";
    }, 1000);
  };

  modalPage.onclick = (event) => {
    if (event.target == modalPage) {
      modalPage.style.display = "none";
    }
  };

  const buttonEnable = () => {
    button.disabled = false;
    button.innerText = "START NEW GAME";
    button.style.backgroundColor = "#b8ab9e";
    button.style.border = "1px solid #b8ab9e";
    button.style.color = "#fff";
    button.style.opacity = "1";
    button.style.cursor = "pointer";
  };

  const answerCheck = (index) => {
    picture.addEventListener("click", (event) => {
      if (links[myRes.length] === shuffleNumbers[index]) {
        event.target.style.opacity = "0.33";
        event.target.style.pointerEvents = "none";
        myRes.push(shuffleNumbers[index]);
        if (myRes.length === shuffleNumbers.length) {
          stopTimer();
          rightAnswers();
          buttonEnable();
        }
      } else {
        wrongAnswer();
      }
    });
  };

  const createElements = () => {
    for (let i = 0; i < shuffleNumbers.length; i++) {
      picture = document.createElement("img");
      picture.classList.add("new-picture");
      picture.src = shuffleNumbers[i];
      picturesField.appendChild(picture);
      answerCheck(i);
    }
  };

  resetGame();
  createElements();
  startTimer();
  // document.getElementById("modalId").innerHTML = "";
};

button.onclick = () => {
  button.innerText = "Game Started";
  button.style.backgroundColor = "#fff";
  button.style.color = "#b8ab9e";
  button.style.opacity = "0.4";
  button.style.cursor = "default";
  main();
};
