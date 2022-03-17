

const selectionButtons = document.querySelectorAll('[data-selection]')
const computerScoreSpan = document.querySelector('[data-computer-score]' )
const yourScoreSpan = document.querySelector('[data-your-score]')
const currentRound = document.querySelector('[data-round]')
const info = 'the player is winning'            //This line was used to test in the console if my code was working by logging if the player had more points than the pc
let gameOver = document.querySelector('#end-screen'); //to stop the game i had to add a screen that would pop up in case of a win/loss
let roundCount = 0
let playerCount = 0
let pcCount = 0 //there are scorecounters in the page itself, but these are only in JS to trigger events when they reach a certain number or when one is greater than the other
const SELECTIONS = [
{
    name: 'flame',
    beats: 'ice'
},
{
    name: 'ice',
    beats: 'stone'
},
{
    name: 'stone',
    beats: 'flame'
}
] //these array items represent the attack options, they also tell which would win against the other

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener( 'click', e => {
        const selectionName = selectionButton.dataset.selection
      const selection =  SELECTIONS.find(selection => selection.name === selectionName)
makeSelection(selection) //this will listen for a click on one of the buttons that has a data selector on them
    }) //it will also activate the makeSelection function
})
function makeSelection(selection) {
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)
    roundCount++;
    checkScore()
    youWin()
    console.log(computerSelection)
    incrementScore(currentRound)
  //this function activates and updates alot of different parts of the JS, it checks the score, it logs the computer's selection, adds to the round count etc.
 
    if (yourWinner) incrementScore(yourScoreSpan), youWinText(), playerCount++;
    else document.getElementById("status").innerHTML = "this round was a tie!";
    if (computerWinner) incrementScore(computerScoreSpan), opponentWinText(), pcCount++;
   //this if else is to see who wins, gets a point, and which text will be displayed, it also adds a point to the counter inside the JS file
      
}
function youWin() {
    if (playerCount >= pcCount)  console.log(info),
    document.getElementById("lossText").innerHTML = "you won, would you like to date this person?", 
    document.getElementById("again").innerHTML = "let's do it!",
    document.getElementById("again").href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"; 
    else 
    document.getElementById("lossText").innerHTML = "you freaked it!",
    document.getElementById("again").innerHTML = "I'll try again",
    document.getElementById("again").href="duelpage.html"; 
} //althought this function technically updates itself often, its on an html element that is hidden until the roundcount reaches 5
function checkScore() {
    if (roundCount >= 5 ) {
    gameOver.id = "limit";
}
 else { gameOver.id = "end-screen" //this function will add a css element that covers the screen
}} // the checkScore function was to make sure the game ends after 5 turns, i chose 5 because i had the least ammount of ties
function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
    
} //the incrementscore will add 1 point to the score counter on either your score or the opponent's
function youWinText() {
    document.getElementById("status").innerHTML = "You won this round!";
    
} 
function opponentWinText() {
    document.getElementById("status").innerHTML = "The enemy countered your attack!";
    
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}//this will see if the selection you made beats the computers choice 
function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}//this will make the computer pick a random item out of the SELECTIONS array, by adding math.floor it will pick between all 3 options

