const AlexFunction = () => {
  const randomElements = (array) => {
    if (!array) {
      return;
    }
    return [...array].sort(() => Math.random() - 0.5);
  };
  const button = document.getElementById("main__button");
  const pictureField = document.getElementById("main__start-game");
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffleNumbers = randomElements(numbers);
  let pictures;
  const myRes = [];

  button.disabled = true;

  const answerCheck = (index) => {
    pictures.addEventListener("click", (event) => {
        if (numbers[myRes.length] === shuffleNumbers[index]) {
          event.target.style.opacity = "0.33";
          myRes.push(shuffleNumbers[index]);
          if (myRes.length === shuffleNumbers.length) {
            alert("Stop!");
          }
        } else {
          alert("Wrong");
        }
    });
  };

  const createElements = () => {
    for (let i = 0; i < shuffleNumbers.length; i++) {
      pictures = document.createElement("div");
      pictures.id = shuffleNumbers[i];
      pictures.classList.add("new-picture");
      pictures.textContent = shuffleNumbers[i];
      pictureField.appendChild(pictures);
      answerCheck(i);
    }
  };
  createElements();
};
const myClick = (element) => {
  element.innerText = "Game Started";
  // VoldemarFunction()
  AlexFunction();
};
