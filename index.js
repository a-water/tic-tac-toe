const startGame = () =>  {
  console.log('Started game!');
  
  window.grid = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
  ];
  
  window.turn = 'X';
  
  setEventListeners(); 
}

const setEventListeners = () => {  
  let boxes = document.getElementsByClassName('grid-square');
  
  Array.prototype.forEach.call(boxes, (box) => {
    box.addEventListener("click", boxClicked);
  })
}

const boxClicked = (event) => {
  // get coordinates from the id # of the box clicked
  let boxCoordinates = getCoordinates(event.target.id);
  
  // Check if the box clicked is not the default value and return early if it is
  if(window.grid[boxCoordinates.x] [boxCoordinates.y] !== '-') {
    return;
  }
  
  // change color of box
  document.getElementById(event.target.id).classList.add(window.turn);
  
  // set the box in the grid to the X or O
  window.grid[boxCoordinates.x] [boxCoordinates.y] = window.turn;
  
  // check for a winner
  if(checkForWinner(window.grid)) {
    console.log('WINNER WINNER TOFU DINNER');
    document.getElementById('winner-alert-value').innerHTML = window.turn;
    document.getElementsByClassName('winner-alert')[0].classList.toggle('hidden');

    setTimeout(() => {
      location.reload(false);
    }, 2000);
  }
  
  // update turn
  window.turn = window.turn === 'X' ? 'O' : 'X';
  document.getElementById('current-turn-text').innerHTML = window.turn;
}

const getCoordinates = (index) => {
  let xVal = Math.floor(index / 3);
  let yVal = index % 3;
  
  return {x: xVal, y: yVal}
}

const checkForWinner = (grid) => {
  // Check Rows
  for(row = 0; row < 3; row++) {
    count = 0;
    for(col=0; col < 3; col++) {
      count += (grid[row][col] == 'X') ?
        1
      :
        (grid[row][col] == 'O')? -1 : 0;
    }
    if (count == 3 || count == -3) {
      return count / Math.abs(count);
    }
  }
  
  // Check Columns
  for(col = 0; col < 3; col++) {
    count = 0;
    for(row=0; row < 3; row++) {
      count += (grid[row][col] == 'X') ?
        1
      :
        (grid[row][col] == 'O')? -1 : 0;
    }
    if (count == 3 || count == -3) {
      return count / Math.abs(count);
    }
  }
  
  // Check Downward Diagonal:
  count = 0;
  for(col = 0; col < 3; col++) {
    count += (grid[col][col] == 'X') ?  
      1
    :
      (grid[col][col] == 'O')? -1 : 0;
  }
  if (count == 3 || count == -3) {
    return count / Math.abs(count);
  }
  
  // Check Upward Diagonal
  count = 0;
  for(col = 0; col < 3; col++) {
    count += (grid[col][2-col] == 'X') ?
      1
    :
      (grid[col][2-col] == 'O')? -1 : 0;
  }
  if (count == 3 || count == -3) {
    return count / Math.abs(count);
  }
  
}

window.addEventListener("DOMContentLoaded", startGame());