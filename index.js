'use strict';

const gameSwitch = document.querySelector('.gameSwitch');
const resetSwitch = document.querySelector('.resetSwitch');
const submitGuess = document.querySelector('.inputButton');
const chances_left = document.querySelector('.chancesLeft');
const currentTurn = document.querySelector('.currentTurn');
let playersTurn;

const playerList= ['Player1', 'Player2']; //for random start

let player1Chances= 2;
let player2Chances= 2;
    
let player1Guesses= [];
let player2Guesses= [];

let guessHistory = [];

let secretNumber = Math.trunc(Math.random() * 30) + 1;


//find closest number from array with target
function findClosest(arr, target){

    const closest = arr.reduce((a, b) => {
        return Math.abs(b - target) < Math.abs(a - target) ? b : a;
    });

    return closest;    

}

//prevent duplicate values being used
function checkGuesses(currentGuess, history){

    if (history.includes(currentGuess)){
        
        return true;
    }
    else{
      
        return false;
    }
    
}

//function to log player guesses
function logGuess(currentPlayer, playerGuess){
    
    
    if (currentPlayer ==='Player1'){

        player1Guesses.push(playerGuess);
        player1Chances--;
        alert(`Player1 guessed ${playerGuess} incorrectly.`);
        //switch turns
        playersTurn = 'Player2';
        chances_left.textContent = player2Chances;
        currentTurn.textContent = playersTurn;
    }

    else{

        player2Guesses.push(playerGuess);
        player2Chances--;
        alert(`Player2 guessed ${playerGuess} incorrectly.`);
    
        playersTurn = 'Player1';
        chances_left.textContent = player1Chances;
        currentTurn.textContent = playersTurn;

    }

}


//start the game
gameSwitch.addEventListener('click',
function(){
    
        playersTurn = playerList[Math.floor(Math.random() * playerList.length)];
        currentTurn.textContent = playersTurn;
        chances_left.textContent = 2;
        
});


//reset the game
resetSwitch.addEventListener('click', function(){
    
    player1Chances = 2;
    player2Chances = 2;

    player1Guesses = [];
    player2Guesses = [];

    guessHistory = [];
    chances_left.textContent = 0;
    secretNumber = Math.trunc(Math.random() * 30) + 1;
    currentTurn.textContent = 'Click start to play';
 

});

//submit guesses
submitGuess.addEventListener('click',

function(){

    let userGuess = parseInt(document.querySelector('.userGuess').value);

   

    if (checkGuesses(userGuess, guessHistory) === true){

        alert('Try again. This value was already used.');
        return 0;
    }

    else if(isNaN(userGuess) || userGuess < 1 || userGuess > 30){

        alert('Pleae enter a numerical value between 1-30.');
        return 0;
    }

            //if both player chances reach 0
            else if ((player1Chances && player2Chances) === 0){

                logGuess(playersTurn, userGuess);

                let player1Closest = findClosest(player1Guesses, secretNumber);
                let player2Closest = findClosest(player2Guesses, secretNumber);
        
                let player1Diff = Math.abs(player1Closest - secretNumber);
                let player2Diff = Math.abs(player2Closest - secretNumber);
                
                console.log(player1Diff, player2Diff);


                if (player1Diff < player2Diff)
                chances_left.textContent= `Secret #${secretNumber}
                                            Player1 Wins!
                                            Closest Guess: ${player1Closest}
                                            
                                            `;

                else if (player1Diff > player2Diff)
                    chances_left.textContent= `Secret #${secretNumber} Player2 Wins! | Closest Guess: ${player2Closest}`;
                else{
                    chances_left.textContent = `Secret # ${secretNumber} | Tie!`;
               
                }

                
                console.log(player1Guesses, player2Guesses);

        
        
            }


    else if (!(userGuess ===secretNumber) && (player1Chances || player2Chances) > 0){
      
        logGuess(playersTurn, userGuess);
        
        guessHistory.push(userGuess);
        
    }



    else if (userGuess ===secretNumber){

        chances_left.textContent = "Hooray! You won!";
    }

});





  

