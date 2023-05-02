const MainFunction = () => {
  const randomElements = (array) => {
    if (!array) {
      return;
    }
    return [...array].sort(() => Math.random() - 0.5);
  };
  const button = document.getElementById("main__button");
  const timeCounter = document.getElementById("main__time-counter");
  const pictureField = document.getElementById("main__start-game");
  const modalPage = document.getElementById("modalId");
  const closeModal = document.getElementsByClassName("modal__class-close")[0];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffleNumbers = randomElements(numbers);
  const myRes = [];
  let pictures;
  let timerId;
  let startTime;
  let elTime = 0;

  button.disabled = true;

  const formatTime = (ms) => {
    const sec = Math.floor((ms % 60000) / 1000);
    const msec = ms % 1000;
    return `${sec.toString().padStart(1, "0")}:${msec
      .toString()
      .padStart(3, "0")
      .slice(0, 2)}`;
  };

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

  window.onclick = (event) => {
    if (event.target == modalPage) {
      modalPage.style.display = "none";
      location.reload();
    }
  };

  const buttoEnable = () => {
    button.disabled = false;
    console.log(button.innerText);
    button.innerText = "START";
  };

  const answerCheck = (index) => {
    pictures.addEventListener("click", (event) => {
      if (numbers[myRes.length] === shuffleNumbers[index]) {
        event.target.style.opacity = "0.33";
        myRes.push(shuffleNumbers[index]);
        // console.log(myRes.length);
        // console.log(myRes.length);
        // console.log(shuffleNumbers[index]);
        if (myRes.length === shuffleNumbers.length) {
          stopTimer();
          openModal();
          buttoEnable();
        }
      } else {
        alert("Wrong");
      }
    });
  };

  const createElements = () => {
    for (let i = 0; i < shuffleNumbers.length; i++) {
      pictures = document.createElement("div");
      pictures.classList.add("new-picture");
      pictures.textContent = shuffleNumbers[i];
      pictureField.appendChild(pictures);
      answerCheck(i);
    }
  };
  createElements();
  startTimer();
};
const myClick = (element) => {
  element.innerText = "Game Started";
  // VoldemarFunction()
  MainFunction();
};
