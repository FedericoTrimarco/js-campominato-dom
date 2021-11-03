/* 
   Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazine di git).
   L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
   con difficoltà 1 => tra 1 e 100
   con difficoltà 2 => tra 1 e 81
   con difficoltà 3 => tra 1 e 49

   Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
   I numeri nella lista delle bombe non possono essere duplicati.

   In seguito l’utente clicca su ogni cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.

   La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.

   Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
 */

const btn = document.getElementById('set-difficulty');
const difficultiesLevel = document.getElementById('difficulties');
const wrapGrid= document.querySelector('.wrap-grid');

btn.addEventListener('click', () => {
    // reset content
    wrapGrid.innerHTML = '';
    // set grid dimension
    const GridDimension = difficultiesLevel.value;
    console.log('livello:',GridDimension);

    let cellsNumber;
    let cellsPerSide;
    
    switch (GridDimension) {
        case 'Easy': 
            cellsNumber = 100;
            cellsPerSide = 10;
            break;
    
        case 'Normal':
            cellsNumber = 81;
            cellsPerSide = 9;
            break;
        
        case 'Hard':
            cellsNumber = 49;
            cellsPerSide = 7;
    }
    console.log('cellsNumber:', cellsNumber);
    console.log('cellsPerSide:', cellsPerSide);

    // generazione bombe
    const bombGen = genBombs(cellsNumber, 6);
    console.log(bombGen);

    // creazione griglia padre
    const grid = document.createElement('div');
    grid.classList.add('grid', 'd-flex', 'flex-wrap');
    wrapGrid.append(grid);

    for(let i = 1; i <= cellsNumber; i++){
      const num = i;
    // gen square
      const square = gridSquare(num, cellsPerSide);

      square.addEventListener('click', () => square.classList.toggle('active'));

      grid.append(square);
    }
});

/***********
 FUNZIONI
***********/

function gridSquare(num, cells){
    const node = document.createElement('div');
    node.classList.add('square', 'd-flex', 'justify-content-center', 'align-items-center', 'fw-bold');
    node.style.width = `calc(100% / ${cells})`;
    node.style.height = `calc(100% / ${cells})`;

    // nodo span num
    const span = document.createElement('span');
    span.append(num);

    // aggiunta dello span a square
    node.append(span);

    return node;
}
// bombe
function genBombs(cells, totBombs){
  const bombs = [];

  while(bombs.length < totBombs){
    const bomb = randomNum(1, cells)
    
    // controllo numero univoco
    if(!bombs.includes(bomb)){
       bombs.push(bomb)
    }
  
  }
  return bombs;

}

// numero random
function randomNum(min, max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}