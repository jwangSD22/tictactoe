const currentPlayers = [];
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
    playerName:'Easy Computer',
    marker:'',

}

function render(){
let selector = document.getElementsByClassName(`insideBox`)
for(let i=0; i<selector.length;i++){
    selector[i].innerHTML = `${gameBoard[i]}`;
}
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
        pusher(){
            console.log(this)
        currentPlayers.push(this)
        }

    }
 }
 
 