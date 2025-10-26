document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("buttonstart");
  const scoreDiv = document.getElementById("scorediv");
  const body = document.getElementById("body");
  scoreDiv.classList.add("hidden");
  const choices = document.querySelectorAll(".bix");
  const refreshButton = document.getElementById("refreshhbutton");
  let compChoices = [];
  let compChoiceIndex = 0;

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

            console.log(compChoiceIndex);
            setTimeout(() => {
              nextRound();
            }, 1000);
          }
        } else {
          showLose();
        }
      });
    });
  };
  const showLose = () => {
    scoreDiv.classList.remove("hidden");
    body.classList.add("brightness-50")
     
    
    scoreDiv.innerHTML = `
    <pre class="bg-gray-900 text-white brightness-200 h-30 w-auto">Your Score : ${compChoiceIndex} </pre>

    <p class="bg-amber-600 items-center flex justify-center "><button id = "refreshhbutton">Refresh</button></p>`;
    console.log("YOu LOSE");
  };

  const showCompChoices = () => {
    compChoices.forEach((id, index) => {
      setTimeout(() => {
        const button = document.getElementById(id);
        if (!button) return;

        button.style.filter = "brightness(150%)";

        setTimeout(() => {
          button.style.filter = "";
        }, 300);
      }, index * 600);
    });
  };

  startButton.addEventListener("click", () => {
    startButton.classList.add("hidden");
    compChoices = [];
    nextRound();
    choiceChecker();
  });
  scoreDiv.addEventListener("click", (e) => {
    if (e.target.id === "refreshhbutton") location.reload();
  });
});
