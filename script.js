// "-", "*"
let operators = ["+"];  
const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const controls = document.querySelector(".controls-container");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-msg");
const score = document.getElementById("Score_Number");
let Score_Var = 0;
var p1Display = document.querySelector("#Score_Number");
let arra =[2,5,10]
let answerValue;

//Random Value Generator
const randomValue = (min, max) => Math.floor(Math.random() * (min + max)) + min;

const questionGenerator = () => {
  //For getting random operator
  let [num1, num2] = [(arra[(Math.floor(Math.random() * arra.length))]), (arra[(Math.floor(Math.random() * arra.length))])];
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];


  if (randomOperator == "-" && num2 > num1) {
    [num1, num2] = [num2, num1];
  }

  //Solve equation
  let solution = eval(`${num1}${randomOperator}${num2}`);


  //For placing the input at random position
  //(1 for num1, 2 for num2, 3 for operator, anything else(4) for solution)
  let randomVar = randomValue(1, 5);

  if (randomVar == 1) {
    answerValue = num1;
    question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
  } else if (randomVar == 2) {
    answerValue = num2;
    question.innerHTML = `${num1} ${randomOperator}<input type="number" id="inputValue" placeholder="?"\> = ${solution}`;
  } else {
    answerValue = solution;
    question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`;
  }



  //User Input Check
  submitBtn.addEventListener("click", () => {
    errorMessage.classList.add("hide");
    let userInput = document.getElementById("inputValue").value;
    //If user input is not empty
    if (userInput) {

      //If the user guessed correct answer
      if (userInput == answerValue) {
        Score_Var +=1;
        p1Display.textContent = Score_Var;
        stopGame(`Yippie!! <span>Correct</span> Answer and your score is ${Score_Var}`);

      }
      //If user inputs operator other than +,-,*
      else if (operatorQuestion && !operators.includes(userInput)) {
        errorMessage.classList.remove("hide");
        errorMessage.innerHTML = "Please enter a valid operator";
      }
      //If user guessed wrong answer
      else {
        stopGame(`Opps!! <span>Wrong</span> Answer The right answers is: ${answerValue} and your score is ${Score_Var}` );
      }
    }
    //If user input is empty
    else {
      errorMessage.classList.remove("hide");
      errorMessage.innerHTML = "Input Cannot Be Empty";
    }
  });

};

//Start Game
startBtn.addEventListener("click", () => {
  operatorQuestion = false;
  answerValue = "";
  errorMessage.innerHTML = "";
  errorMessage.classList.add("hide");
  //Controls and buttons visibility
  controls.classList.add("hide");
  startBtn.classList.add("hide");
  questionGenerator();
});

//Stop Game
const stopGame = (resultText) => {
  result.innerHTML = resultText;
  startBtn.innerText = "Next Quest";
  controls.classList.remove("hide");
  startBtn.classList.remove("hide");
};
