const VoldemarFunction = () => {
  const button = document.getElementById("main__button");
  const pictureField = document.getElementById("main__start-game");
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let pictures;
  const shufle = [];
  const myRes = [];

  button.disabled = true;

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

  const randomElements = () => {
    shufle.push(numbers.sort(() => Math.random() - 0.5));
    console.log(shufle);
  };
  randomElements();

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
  createElements();
  console.log(myRes);
  console.log(shufle);
}

const AlexFunction = () => {
  const randomElements = (array) => {
    if (!array) { return }
    return [...array].sort(() => Math.random() - 0.5);
  };
  const button = document.getElementById("main__button");
  const pictureField = document.getElementById("main__start-game");
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffleNumbers = randomElements(numbers);
  let pictures;
  const myRes = [];

  button.disabled = true;

  const answerCheck = (i) => {

    pictures.addEventListener("click", (event) => {
     console.log(i)
      if (!myRes.length && shuffleNumbers[i] === numbers[0]) {
       
        event.target.style.opacity = "0.33";
        myRes.push(shuffleNumbers[i])
      } else {
        if (numbers[myRes.length] === shuffleNumbers[i]) {
          event.target.style.opacity = "0.33";
          myRes.push(shuffleNumbers[i])
          if (myRes.length === shuffleNumbers.length) {
            alert('Stop!')
          }
        } else { alert('Wrong') }}        
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
  
}
const myClick = (element) => {
  element.innerText = "Game Started";
  // VoldemarFunction()
  AlexFunction()
};
