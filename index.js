const button = document.getElementById("main__button");
const pictureField = document.getElementById("main__start-game");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const myClick = (element) => {
  element.innerText = "Game Started";
  button.disabled = true;
  createElements();
};

const createElements = () => {
  for (let i = 0; i < numbers.length; i++) {
    const newPicture = document.createElement("div");
    newPicture.classList.add("new-picture");
    newPicture.textContent = numbers[i];
    pictureField.appendChild(newPicture);
    newPicture.addEventListener("click", () => {
      window.alert(`Clicked blok #${numbers[i]}`);
    });
  }

  console.log(pictureField);
};