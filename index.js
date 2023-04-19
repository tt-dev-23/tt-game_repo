const button = document.getElementById("main__button");
const pictureField = document.getElementById("main__start-game");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let pictures;
const shufle = [];
const myRes = [];


const myClick = (element) => {
  element.innerText = "Game Started";
  button.disabled = true;
  randomElements();
  createElements();
};

const randomElements = () => {
  shufle.push(numbers.sort(() => Math.random() - 0.5));
  console.log(shufle);
};

const createElements = () => {
  for (let i = 0; i < numbers.length; i++) {
    pictures = document.createElement("div");
    pictures.id = numbers[i];
    pictures.classList.add("new-picture");
    pictures.textContent = numbers[i];
    pictureField.appendChild(pictures);
    answerCheck();
  }
};

const answerCheck = () => {
  pictures.addEventListener("click", (event) => {
    let targetId = event.target.id;
    if (targetId == pictures.id) {
      event.target.style.backgroundColor = "salmon";
      myRes.push(targetId);
    } else {
      event.target.style.backgroundColor = "silver";
    }

    console.log(targetId);
    console.log(pictures.id);
  });
};

console.log(myRes);
console.log(shufle);
