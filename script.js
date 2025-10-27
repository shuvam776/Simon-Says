document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("buttonstart");
  const scoreDiv = document.getElementById("scorediv");
  const body = document.getElementById("body");
  const choicesDiv = document.getElementById("choicelist")
  const choices = document.querySelectorAll(".bix");
  const levelUp = document.getElementById('buttonlevelup');
  levelUp.classList.add("hidden");

  let compChoices = [];
  let compChoiceIndex = 0;
  let score = compChoiceIndex
  
  const nextRound = () => {
    let indx = Math.floor(Math.random() * 4);
    let value2 = choices[indx].getAttribute("id");
    compChoices.push(value2);
    console.log(compChoices);
    compChoiceIndex = 0;
    showCompChoices();
  };
  const choiceChecker = () => {
    let myChoice;
    document.querySelectorAll(".bix").forEach((box) => {
      box.addEventListener("click", () => {
        myChoice = box.id;
        console.log(myChoice);

        if (myChoice === compChoices[compChoiceIndex]) {
          compChoiceIndex++;
          
          if (compChoiceIndex === compChoices.length) {
            console.log("win");
            score++;  

            console.log(compChoiceIndex);
            setTimeout(() => {
              nextRound();
            }, 800);
          }
        } else {
          console.log(score);
          showLose();
        }
      });
    });
  };
  const showLose = () => {
    scoreDiv.classList.remove("hidden");
    body.classList.add("brightness-60");
    scoreDiv.classList.add("brightness-200");
    
    scoreDiv.innerHTML = `
    <pre class="bg-gray-900 text-white brightness-200 h-30 w-auto">Your Score : ${score} </pre>

    <p class="bg-amber-600 items-center flex justify-center "><button id = "refreshhbutton">Refresh</button></p>`;
    console.log("You LOSE");
  };

  const showCompChoices = () => {
    compChoices.forEach((id, index) => {
      setTimeout(() => {
        const button = document.getElementById(id);
        if (!button) return;

        button.style.filter = "brightness(200%)";

        setTimeout(() => {
          button.style.filter = "";
        }, 700);
      }, index * 800);
    });
  };

  startButton.addEventListener("click", () => {
    startButton.classList.add("hidden");
    levelUp.classList.remove("hidden");
    

    compChoices = [];
    nextRound();
    choiceChecker();
  });
    levelUp.addEventListener("click", () => {
    levelUp.classList.add("hidden");
    choicesDiv.classList.add("animate-spin")
    

    
    compChoices = [];
    nextRound();
    choiceChecker();
  });
  



  scoreDiv.addEventListener("click", (e) => {
    if (e.target.id === "refreshhbutton") location.reload();
  });
});
