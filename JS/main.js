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
const wrapGrid = document.querySelector('.wrap-grid');

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

    let bombChoise = parseInt(prompt("quante bombe vuoi all'interno della griglia? (da 1 a 16 MAX)"));
    while(bombChoise < 1 || bombChoise > 16 || isNaN(bombChoise)){
      bombChoise = parseInt(prompt("INSERIMENTO NON VALIDO. inserisci un nuovo numero (da 1 a 16 MAX)"));
    }
    const bombList = genBombs(cellsNumber, bombChoise);
    console.log(bombList);

    //lista tentativi
    const attemps = [];
    const maxAttemps = cellsNumber - bombList.length;

    console.log('max tentativi:', maxAttemps);

    // creazione griglia padre
    const grid = document.createElement('div');
    grid.classList.add('grid', 'd-flex', 'flex-wrap');
    wrapGrid.append(grid);

    // gen square
    for(let i = 1; i <= cellsNumber; i++){
      const num = i;
      const square = gridSquare(num, cellsPerSide);

      square.addEventListener('click', () => handleSquareClick(square, bombList, attemps, maxAttemps));

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

   // aggiunta del numero a square
    node.append(num);

    return node;
}


// gestore click
function handleSquareClick(square, bombList, attemps, maxAttemps){
  // ottieni numero square
  const number = parseInt(square.innerHTML);
  console.log(number);
  // colpito bomba
  let message = ``;
  const h2 = document.createElement('h2')
  h2.classList.add('mt-5')
  
  const squares = document.querySelectorAll('.square');
             // sconfitta
  if(bombList.includes(number)){
    square.classList.add('bomb');
    wrapGrid.classList.add('end-game');
    
    message = `Hai perso! Hai fatto ${attemps.length} tentativi`;
    h2.append(message);
    wrapGrid.append(h2);

    for(let i = 0; i < squares.length; i++){
      if(bombList.includes(parseInt(squares[i].innerHTML))){
        squares[i].classList.add('bomb');
      }
    }
    
  } 
  // vittoria
  else if(!bombList.includes(number)){
    square.classList.add('active');

    attemps.push(number);
    console.log(attemps);
  
    if(attemps.length === maxAttemps){
      console.log('hai vinto');
      wrapGrid.classList.add('end-game')

      message = `Hai vinto! Hai fatto ${attemps.length} tentativi`;
      h2.append(message);
      wrapGrid.append(h2);
     
      for(let i = 0; i < squares.length; i++){
        if(bombList.includes(parseInt(squares[i].innerHTML))){
          squares[i].classList.add('bomb');
        }
      }
    }
  } 
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

