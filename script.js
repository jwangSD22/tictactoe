const newGameButton = document.getElementById('newGame');
const continueButton = document.getElementById('continue');
const hiddenDiv = document.getElementById('hiddenDiv');
const playerChoice = document.getElementById('playerChoice');
const cpuChoice = document.getElementById('cpuChoice');
const superContainer = document.getElementById('superContainer');
const nameInput = document.getElementById('nameInput');
const playerVSCPU = document.getElementById('playerVSCPU');
const cpuVScpu = document.getElementById('cpuVScpu');
const easyCPUchoice = document.getElementById('easyCPUchoice');
const medCPUchoice = document.getElementById('medCPUchoice');
const hardCPUchoice = document.getElementById('hardCPUchoice');
const submitName = document.getElementById('submitName');
const nameInputBox = document.getElementById('nameInputBox');
const form = document.getElementById('playerNameInput');
const msgBox = document.getElementById('msgBox');
const nameInputBoxLabel = document.getElementById('nameInputBoxLabel');
const player1Icon = document.getElementById('player1Icon');
const player2Icon = document.getElementById('player2Icon');
const PlayerImage = document.createElement('img')
const Player2Image = document.createElement('img');
PlayerImage.src = './player.png'
Player2Image.src = './player.png'
const CPUImage = document.createElement('img')
CPUImage.src = './computer.jpg'
const scorebox1 = document.getElementById('scorebox1')
const scorebox2 = document.getElementById('scorebox2')
const player1Name = document.getElementById('player1Name')
const player2Name = document.getElementById('player2Name')
const tttContainer = document.getElementById('tttContainer')

newGameButton.addEventListener('click',newGameStart);
continueButton.addEventListener('click',chooseContinue);
playerChoice.addEventListener('click',choosePlayer);
cpuChoice.addEventListener('click',chooseCPU);
submitName.addEventListener('click',submitNameFxn);


document.getElementById('nameInputBox').onkeydown = function (e){
    let keyCode = e.code || e.key;
    if (keyCode == 'Enter'){
        submitNameFxn();
    };
}

let currentPlayers = [];
const gameBoard = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '']
    ;

let playerName = ''

let cpuEasy = {
    playerName:'Easy CPU',
    marker:'',
    cpu:'cpu',
    score:'0'

}
let cpuMedium = {
    playerName:'Medium CPU',
    marker:'',
    cpu:'cpu',
    score:'0'

}
let cpuHard = {
    playerName:'Hard CPU',
    marker:'',
    cpu:'cpu',
    score:'0'

}

function cpuAIswitch(){
if (currentPlayers[1]===cpuEasy)
{easyCPUAI()};
if (currentPlayers[1]===cpuMedium)
{medCPUAI()};
if (currentPlayers[1]===cpuHard)
{hardCPUAI()};
}

function RNG(){
let randomNum = Math.floor(Math.random()*9);
return randomNum;
}

//EASY CPU AI//
function easyCPUAI(){
let randomVar = RNG();
let xcount = gameBoard.filter(x => x === 'X').length;
allBoxes = document.getElementsByClassName('insideBox')
if (drawCheck() === true){return}
if (currentPlayers[1].marker === 'X' && xcount === 0){
gameBoard[randomVar] = 'X';
allBoxes[randomVar].innerHTML = 'X'
}

else if (gameBoard[randomVar] === 'X' || gameBoard[randomVar] === 'O'){
    easyCPUAI();

}
else {
    if(xcount > 0){
    gameBoard[randomVar] = currentPlayers[1].marker;
    allBoxes[randomVar].innerHTML = currentPlayers[1].marker;
    }
}
}

//MEDIUM CPU AI//

function medCPUAI(){

}

//HARD CPU AI//

function hardCPUAI(){
    let xcount = gameBoard.filter(x => x === 'X').length;
    let ocount = gameBoard.filter(o => o === 'O').length;
    allBoxes = document.getElementsByClassName('insideBox')
//first move as X//
    if (currentPlayers[1].marker === 'X' && xcount === 0){
        gameBoard[0] = 'X';
        allBoxes[0].innerHTML = 'X'
    }
//second move as X
    else if (currentPlayers[1].marker === 'X' && xcount === 1 && ocount === 1
    && gameBoard[4]!='O'){
        if (gameBoard[3] === 'O'|| gameBoard[6]==='O'){
            gameBoard[2] = 'X';allBoxes[2].innerHTML='X'}
        else {
            gameBoard[6] = 'X';allBoxes[6].innerHTML='X'}
    }
//third move as X
else if (currentPlayers[1].marker === 'X' && xcount === 2 && ocount === 2){
        if(gameBoard[2]==='X'){
            if(gameBoard[1]!='O'){
                gameBoard[1]='X';
                allBoxes[1].innerHTML='X';
                checkWin();
            }
            gameBoard[8]='X';
            allBoxes[8].innerHTML='X'
        }
        else if(gameBoard[6]==='X'){
            if(gameBoard[3]!='O'){
                gameBoard[3]='X';
                allBoxes[3].innerHTML='X';
                checkWin();
            }
            gameBoard[8]='X';
            allBoxes[8].innerHTML='X';
        }
    }

//fourth move as X
else if (currentPlayers[1].marker === 'X' && xcount === 3 && ocount === 3){
    if (gameBoard[8]='X'){
        if (gameBoard[4]==='O'){
            gameBoard[7]='X';
            allBoxes[7].innerHTML='X';
            checkWin();
        }
        else if (gameBoard[7]==='O'){
            gameBoard[4]='X';
            allBoxes[4].innerHTML='X';
            checkWin();
        }
    }
    else if (gameBoard[6]='X'){
        if (gameBoard[1]==='O'){
            gameBoard[3]='X';
            allBoxes[3].innerHTML='X';
            checkWin();
        }
        else if (gameBoard[3]==='O'){
            gameBoard[1]='X';
            allBoxes[1].innerHTML='X';
            checkWin();
        }

    }

}



    //hardAI last bracket
}

function render(){
let selector = document.getElementsByClassName(`insideBox`)
for(let i=0; i<selector.length;i++){
    selector[i].innerHTML = `${gameBoard[i]}`;
}
}


function renderScore(){
scorebox1.innerHTML=currentPlayers[0].score;
scorebox2.innerHTML=currentPlayers[1].score;
}



function clearBoard(){
    for (let i=0;i<9;i++){
        gameBoard[i]=''
    }
    render()
}



function createPerson(){
      return{
        playerName: playerName,
        marker: '',
        cpu: '',
        score: 0,
        pusher(){
            console.log(this)
        currentPlayers.push(this)
        }
    }
 }

 
function newGameStart(){
removeListeners();
clearBoard();
currentPlayers = []
playerVSCPU.setAttribute('style','display:flex');
hiddenDiv.setAttribute('style','display:flex;z-index: 99;');
superContainer.setAttribute('style','opacity:20%');
playerVSCPU.setAttribute('style','display:flex');
nameInput.setAttribute('style','display:none');
msgBox.setAttribute('style','animation:none');
tttContainer.setAttribute('style','animation:none');
while(player1Icon.firstChild){
    player1Icon.removeChild(player1Icon.firstChild)
}

while(player2Icon.firstChild){
    player2Icon.removeChild(player2Icon.firstChild)
}

}


function choosePlayer(){
    playerVSCPU.setAttribute('style','display:none');
    nameInput.setAttribute('style','display:flex');
    //opens nameInput menu//
    player1Icon.appendChild(PlayerImage);
    player2Icon.appendChild(Player2Image);
    document.getElementById('nameInputBox').focus();
 }

 function chooseCPU(){
    cpuVScpu.setAttribute('style','display:flex');
    playerVSCPU.setAttribute('style','display:none');
    cpuVScpu.addEventListener('click',CPUpicker)
    player1Icon.appendChild(PlayerImage);
    player2Icon.appendChild(CPUImage);

    function CPUpicker(e) {
    if (e.target.id === "easyCPUchoice"){currentPlayers[1]=cpuEasy};
    if (e.target.id === "medCPUchoice"){currentPlayers[1]=cpuMedium};
    if (e.target.id === 'hardCPUchoice'){currentPlayers[1]=cpuHard};
    setCPU();
 }
}

 function cpuChecker(){
    if (currentPlayers[1] === cpuEasy || currentPlayers[1] === cpuMedium || currentPlayers[1] === cpuHard){
        return true
    };
    return false;
    }

function setCPU(){
    cpuVScpu.setAttribute('style','display:none');
    nameInput.setAttribute('style','display:flex');
    document.getElementById('nameInputBox').focus();
    currentPlayers[1].score = 0

}
    


function submitNameFxn(){
    nameInputBoxLabel.innerHTML = 'Player 1 Name:'
let value = document.getElementById('nameInputBox').value;

if (cpuChecker()){
//cpu function//
if (value.length > 14){
    alert('INVALID SUBMISSION: Player name max length is 14')
}
else{playerName = value
currentPlayers[0] = createPerson();
console.table(currentPlayers);
console.log('ready to play');
hiddenDiv.setAttribute('style','display:none');
superContainer.setAttribute('style','display:flex;z-index:99')
playersLoaded();
document.getElementById('nameInputBox').value = '';
}
}
//end cpu function
else{

if (value.length > 14){
    alert('INVALID SUBMISSION: Player name max length is 14')
}
else{
playerName = value
createPerson().pusher()
playerName = ''
document.getElementById('nameInputBox').value = '';
}
if (currentPlayers.length === 1){
    nameInputBoxLabel.innerHTML = 'Player 2 Name:'
    document.getElementById('nameInputBox').focus();
}
if (currentPlayers.length === 2){
    console.log('ready to play');
    hiddenDiv.setAttribute('style','display:none');
    superContainer.setAttribute('style','display:flex;z-index:99')
    playersLoaded();
}
}
}



function playersLoaded(){
    if (Math.ceil(Math.random()*100)%2 === 1) {
        currentPlayers[0].marker = 'X';
        currentPlayers[1].marker = 'O';
    }
    else {currentPlayers[0].marker = 'O';
    currentPlayers[1].marker = 'X';}
    console.table(currentPlayers)
    player1Name.innerHTML = currentPlayers[0].playerName;
    player2Name.innerHTML = currentPlayers[1].playerName;
    msgBox.innerHTML = "Randomizing..."
    setTimeout(postRandom,1000);
    setTimeout(cpuAIswitch,1000);
    setTimeout(addListeners,1000);
    renderScore();
}

function postRandom () {
    if (currentPlayers[0].marker === 'X'){
        msgBox.innerHTML = `${currentPlayers[0].playerName} is X and plays first`
    }
    else {
        msgBox.innerHTML = `${currentPlayers[1].playerName} is X and plays first`
    }
    }


let selector = document.getElementsByClassName(`insideBox`)

function addListeners () {
    for (let i = 0; i<9; i++){
        selector[i].addEventListener('click',markerFunction)
    }
}

function removeListeners(){
    for (let i = 0; i<9; i++){
        selector[i].removeEventListener('click',markerFunction)
    }
}

function findWhoIsX() {
let playerX = currentPlayers.find(e=>e.marker === 'X');
return playerX
}

function findWhoIsO(){
    let playerO = currentPlayers.find(e=>e.marker === 'O');
return playerO
}

function findWhoIsWinner(x){
    let winner = currentPlayers.find(e=>e.marker === x)
    return winner
}


function markerFunction() {
let xcount = gameBoard.filter(x => x === 'X').length;
let ocount = gameBoard.filter(o => o === 'O').length

if (this.innerHTML === 'X'|| this.innerHTML=== 'O') {
    console.log(this.innerHTML)
    alert('Please choose another location');
}

else if (xcount-ocount === 0){
    this.innerHTML = 'X';
    for(let i = 0;i<9;i++){
        if (selector[i]===this){gameBoard[i] = 'X'} 
    }
    if (cpuChecker()){
    cpuAIswitch();
    }
    checkWin()
}

else if (xcount-ocount === 1){
    this.innerHTML = 'O';
    for(let i = 0;i<9;i++){
        if (selector[i]===this){gameBoard[i] = 'O'} 
    }
    if (cpuChecker()){
        cpuAIswitch();
    }

    checkWin()
}
}

function winnerDecided() {}

function afterWin(x){
    removeListeners();
    msgBox.innerHTML = `${x.playerName} WINS!`
    msgBox.setAttribute('style','animation: blinkWin .02s step-end 25')
    x.score++
    renderScore();
    document.getElementById('continue').setAttribute('style','display:inline')

}


function chooseContinue() {
    switchXO(currentPlayers[0]);
    switchXO(currentPlayers[1]);
    postRandom();
    clearBoard();
    addListeners();
    document.getElementById('continue').setAttribute('style','display:none')
    tttContainer.setAttribute('style','animation:none');
    msgBox.setAttribute('style','animation:none');
    cpuAIswitch();
}

function switchXO(x) {
    if(x.marker ==='X'){
        x.marker = 'O'
    }
    else {x.marker ='X'}

}



function checkWin() {
let winnerFlag = false
let boxChk = function(x,y,z) {   
let XWIN = 'XXX'
let OWIN = 'OOO'

let result = gameBoard[x]+gameBoard[y]+gameBoard[z];
if (result === XWIN || result === OWIN){
return true
}
}

let winnerChecker = function (x) 
{WINNER = findWhoIsWinner(gameBoard[x]);
winnerFlag = true
    return WINNER
};


if (boxChk(0,1,2) === true){console.log(winnerChecker(0));afterWin(WINNER)}
if (boxChk(3,4,5) === true){console.log(winnerChecker(3));afterWin(WINNER)}
if (boxChk(6,7,8) === true){console.log(winnerChecker(6));afterWin(WINNER)}
if (boxChk(0,3,6) === true){console.log(winnerChecker(0));afterWin(WINNER)}
if (boxChk(1,4,7) === true){console.log(winnerChecker(1));afterWin(WINNER)}
if (boxChk(2,5,8) === true){console.log(winnerChecker(2));afterWin(WINNER)}
if (boxChk(0,4,8) === true){console.log(winnerChecker(0));afterWin(WINNER)}
if (boxChk(2,4,6) === true){console.log(winnerChecker(2));afterWin(WINNER)}
else if(drawCheck() && winnerFlag === false){
    console.log('draw')
    document.getElementById('continue').setAttribute('style','display:inline')
    msgBox.innerHTML='DRAW GAME!!'
    tttContainer.setAttribute('style','animation: blinkDraw .02s step-end 18')
    msgBox.setAttribute('style','animation: blinkDraw .02s step-end 18')

}
}



function drawCheck() {
let xcount = gameBoard.filter(x => x === 'X').length;
let ocount = gameBoard.filter(o => o === 'O').length;
if (xcount === 5 && ocount === 4){
    return true
}
}