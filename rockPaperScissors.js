

// imported the dependencies, i am using AMD(async module definition) instead of commonJS
import inquirer from 'inquirer'
import chalk from 'chalk'
import chalkAnimation from 'chalk-animation';

// holds the value of the players move
let playerMove
// holds the value of the players name
let playerName

// count how many rounds you have played
let rounds = 0

// count the score you have
let score = 0

// computer score

let computerScore = 0

// declaring a variable so the special message doesnt get triggered twice
let specialMessagePlayed = false;

//  Prompt to ask for your name 
inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: chalk.bgMagenta('Enter your name:'),
    }
  ])
  .then(answers => {
   playerName = answers.name;
    startGame(playerName)
  })
  


// function to ask if player wants to play again
function playAnotherRound(){
 inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'playAgain',
      message: chalk.bgMagenta('Would you like to play again?'),
      default: true,
    }
  ])
  .then(answers => {
    const playAgain = answers.playAgain;
    if (playAgain) {
      startGame(playerName); // Restart the game
    } else {
      // goodbye message but also added fancy animation to the text lol
      let  goodBye = `Thank you for playing! Goodbye! Your final score was ${score} and the computers final score was ${computerScore} after ${rounds} rounds`
      
      let rainbowGoodBye = chalkAnimation.rainbow(goodBye)

      rainbowGoodBye.start();
    setTimeout(() => {
      rainbowGoodBye.stop();
      
    }, 3000);
      
    }
  });
}

// function to start the rock paper scissors game
function startGame(playerName) {
  console.log(chalk.bgBlue(`Welcome, ${playerName}! Let's play Rock Paper Scissors.`));
  
  
  if(playerName.toLowerCase() === "ray"  && !specialMessagePlayed){
    console.log("Hi Ray! Youre a special player and triggered this animation! Hope you like my game!")
    let  loveYou = "I love you soooo much!!"
      
    let rainbowLoveYou = chalkAnimation.rainbow(loveYou)

      rainbowLoveYou.start();
    setTimeout(() => {
      rainbowLoveYou.stop();
      
    }, 5000);

    specialMessagePlayed = true;
  }



  if(playerName.toLowerCase() === "aaron"  && !specialMessagePlayed){
    console.log('COMPUTER:"The computer never loses Aaron!"')
    let  aaronLose = 'COMPUTER:"The teacher becomes the student!"'
      
    let rainbowLose = chalkAnimation.rainbow(aaronLose)

      rainbowLose.start();
    setTimeout(() => {
      rainbowLose.stop();
      
    }, 3000);

    specialMessagePlayed = true;
  }

   if(playerName.toLowerCase() === playerName.toLowerCase()  && !specialMessagePlayed){
    console.log(`COMPUTER:"Prepare to be terminated ${playerName}"`)
    let  playerLose = 'COMPUTER:"BEEP!! TTHIS IS THE END!! BEEP BOOP!"'
      
    let rainbowPlayerLose = chalkAnimation.rainbow(playerLose)

      rainbowPlayerLose.start();
    setTimeout(() => {
      rainbowPlayerLose.stop();
      
    }, 3000);

    specialMessagePlayed = true;
  }

//   prompt for players move
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'move',
      message: chalk.bgGray('What is your move?:'),
    }
  ])
  .then(moves => {
    playerMove = moves.move.toLowerCase();
    // console.log your move and console.log the computer is picking
    console.log(chalk.bgGreen(`You chose ${playerMove}`)); 
    console.log(chalk.bgYellowBright("The computer is picking their move."))
   
    // start the comparison function and timeout to give a pretend feeling that its calculating 
    setTimeout(() => {
    compare()
    }, 2000)
  
  })  
 
}

function compare(){
// Made an array of choices for the computer to pick from 
const computerChoices = ['rock','paper','scissors']
//  used math.random to grab and index, you need math.floor so it can round it down to a whole number
const randomIndex = Math.floor(Math.random() * computerChoices.length)
// grab a random value of the computers choices and return it
const computerMove = computerChoices[randomIndex]


 if (playerMove === computerMove) {
    console.log(chalk.bgBlueBright(`Computer chose: ${computerMove}, It's a tie!`))
    rounds += 1
    score += 0
    computerScore += 0

    console.log(`Round:${rounds} Your Score:${score} Computers Score:${computerScore}`)
    playAnotherRound()
  } else if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    console.log(chalk.bgBlueBright(`Computer chose: ${computerMove}, You win ${playerName}, AI will never take over your web dev job!!`));
    rounds += 1
    score += 1
    computerScore += 0

    console.log(`Round:${rounds} Score:${score} Computers Score:${computerScore}`)
    playAnotherRound()
  } else {
     // Different taunts for the computer if they win
   const computerTaunt = [
      `Computer chose: ${computerMove}, You lost! COMPUTER: "Nice try ${playerName}, but you're a loser!"`,
      `Computer chose: ${computerMove}, You loseeeee! COMPUTER: "Once a loser ${playerName}, always a loser!"`,
      `Computer chose: ${computerMove}, COMPUTER: "Better luck next time, human. I reign supreme!"`,
    ]

    // same logic as random choice but instead grabbing a random taunt
  const randomTaunt = Math.floor(Math.random() * computerTaunt.length)
    // grabbing the value from computerTaunt
  const taunt = computerTaunt[randomTaunt]

  console.log(chalk.bgRedBright(taunt))

  rounds += 1
  score += 0
  computerScore += 1

  console.log(`Round:${rounds} Score:${score} Computers Score:${computerScore}`)
  playAnotherRound()

  }
}


