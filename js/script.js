const playerTiles = document.querySelectorAll(".player-tile");
const compTiles = document.querySelectorAll(".comp-tile")
playerTiles.forEach((tile) => tile.addEventListener("click", playerHides));
compTiles.forEach((tile) => tile.addEventListener("click", playerClick));

//Variables
let pLives = 0;  //score taly
let cLives = 0;  //score taly
const hiding = "HIDE";  //simply holding the string that will be displayed
const seeking = "SEEK";  //simply holding the string that will be displayed
const computerHiding = [];  //computer's hiding spots
const playerHiding = [];  //player's hiding spots
const computerGuesses = [];  //To keep track of the computer's guesses so it wont pick the same index twice
const playerGuesses = []; //not sure this array will be necessary yet
const playerBoard = [];
const computerBoard = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];  //.fill for array(look up)
let turn = ""

//Taly boaard elements
const playerLives = document.getElementById("player-lives");
const cpuLives = document.getElementById("cpu-lives");
const display = document.getElementById("display-span"); 

//still need to build the intro screen, game over screens and restart button.
//also add sounds and music eventually
// const music = new Audio("")
// const clickSound = new Audio("")
// const foundSound = new Audio("")

function playerHides(event){
    display.style.fontSize= "35px";  //consider making a separate class
    display.innerText = "Player is hiding";
    pLives++; //consider having a new function to break things up a bit more (separate display stuff into it's own fuctions)
    playerLives.innerText= pLives;
    const tile = event.target;
    const tileNumber = tile.dataset.index;  //look into query for this attribute as opposed to event.target
    tile.innerText= hiding;                 
    playerHiding.push(tileNumber) 
     console.log(playerHiding); //pushing to the playerHiding array to be accesed by the CPU
    if (pLives === 4){
        playerTiles.forEach((tile)=>tile.removeEventListener("click", playerHides))  //consider resetPlayer function to reset clicks
        computerHides()
    }else if (tile.innerText !== ""){
        tile.removeEventListener("click", playerHides);  
    }   
}
//computer choices it's hiding spots 
function computerHides(){
    display.classList.add('fade');
    display.innerText = "Computer is hiding";
    computerBoard.sort((a,b) => 0.5 - Math.random());      

    const compTimer = setInterval(() => {
        let spacePos = computerBoard.pop();
        computerHiding.push(spacePos);
        cLives++;
        cpuLives.innerText = cLives;
        if (cLives === 4){
            clearInterval(compTimer);
            playerTurnDisplay();
        }
    }, 1000);
    console.log(computerHiding)
}
//player trys to find the computers hiding spots - 1 guess at a time
function playerTurnDisplay(){ 
    display.classList.remove('fade');
    display.innerText = "Player's turn";
    turn = "Player";
    console.log(computerHiding);
}

function playerClick(event){ //this function is managing the players clicks on the computer's baord
    const tile = event.target;
    const tileNumber = parseInt(tile.dataset.index);
    if (turn !== "Player") return;  //if it is the computers turn I wont be able to run the rest of the function
    if (computerHiding.indexOf(tileNumber) === -1){
        tile.innerText=seeking;
        computerTurnDisplay()
        computerSearch()
    }else{ 
        cLives--;
        cpuLives.innerText = cLives;
        tile.classList.add('found')
        tile.innerText = "FOUND"
        computerTurnDisplay()
        computerSearch()
    }
     //index of is type sensative, had to parseInt tileNumber
}

function computerTurnDisplay(){
    turn = "Computer";
    display.classList.add('fade');
    display.innerText = "Computer's turn";
    console.log(turn)
}

function computerSearch(){
    const randomNumber = Math.floor(Math.random()*16)
    console.log(randomNumber)
    computerGuesses.push(randomNumber)
    if (computerGuesses.some(randomNumber) === randomNumber){
        console.log("true")
    }
    console.log(computerGuesses)

}






    // playerTurn()
    // if (playerBoard.indexOf)



//     }
//     function hit(){
//         console.log("working?")
//     }
    // compTiles[hidding1].classList.add('hide')

    // /add event listeners for those hiding indexes
    
   
    
    // function playerTurn()

    //playerTurn
    
   
    
    
    // let computerChoices= Array.from({length:4}, () => Math.floor(Math.random()*16))
    //     console.log(computerChoices)
        //Need to figure out how to eliminate any dupicates with this array
        //Shuffle computerBoard Array, pop off four numbers***
    
    // computerBoard[computerChoices[0]] = hidding
    // console.log(computerBoard)

    


//and fill those tiles in with "HIDE".  They will need to be transparent so the player can't seem them. 
//Once this is done we can move on to the "playerTurn" function.. My brain hurts. 

//consider making the player boards buttons - diasble after click - can all have ids

// OOP
//player class - score, name, array of choices, array of guesses
//back and 