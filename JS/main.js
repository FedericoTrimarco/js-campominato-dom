/* 
   L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range (vedi immagine allegata):
   con difficoltà 1 => tra 1 e 100
   con difficoltà 2 => tra 1 e 81
   con difficoltà 3 => tra 1 e 49
   Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.
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

    // aggiunta dello span a quare
    node.append(span);

    return node;
}