function matrixCreator(x, y) {
  var matrix = [];
  for (var i = 0; i < x; i++) {
    matrix[i] = [];
    for (var j = 0; j < y; j++) {
      matrix[i][j] = Math.round(Math.random());
    }
  }
  return matrix;
}

function generateNewCycle(matrix){
  console.log(matrix);
  var $table = document.querySelector("table");
  $table.innerHTML = '';
  matrix.forEach(function(row){
    // var row = matrix[i];
    $tr = document.createElement("tr");
    row.forEach(function(cell){
      // var cell = row[i];
      var $td =  document.createElement("td");

      if (cell === 1) {
        $td.classList.add("alive");
        $td.classList.remove("dead");
      } else if (cell === 0){
        $td.classList.remove("alive");
        $td.classList.add("dead");  
      }
      $td.textContent = cell;
      $tr.appendChild($td);

    });
    $table.appendChild($tr);
  });
}

function livingNeighborCount(x, y){
  console.log(x, y);
  var neighborCounter = [];
  if ( x-1 >= 0 && y-1 >= 0 && matrix[x-1][y-1] === 1){
    neighborCounter.push(1);
  }  
  if ( x-1 >= 0 && matrix[x-1][y] === 1){
    neighborCounter.push(1);
  } 
  if ( x-1 >= 0 && y+1 <= matrix[x].length && matrix[x-1][y+1] === 1){
    neighborCounter.push(1);
  } 
  if ( y+1 <= matrix[x].length && matrix[x][y+1] === 1){
    neighborCounter.push(1);
  } 
  if ( x+1 < matrix.length && y+1 < matrix[x].length && matrix[x+1][y+1] === 1){
    neighborCounter.push(1);
  } 
  if ( x+1 < matrix.length && matrix[x+1][y] === 1){
    neighborCounter.push(1);
  } 
  if ( x+1 < matrix.length && y-1 >= 0 && matrix[x+1][y-1] === 1){
    neighborCounter.push(1);
  } 
  if ( y-1 >= 0 && matrix[x][y-1] === 1){
    neighborCounter.push(1);
  }
  return neighborCounter.length;
}


function calculateNextState(currentState) {
  var nextState = [];
  currentState.forEach(function(currentRow, x) {
    var nextRow = [];
    currentRow.forEach(function(currentCell, y){
      var nextCellState; 
      var neighborCounter = livingNeighborCount(x, y);
      console.log(neighborCounter);
      var currentCell = currentState[x][y];
      if (currentCell === 1 && neighborCounter <= 1){
        nextCellState = 0;
      } 
      if (currentCell === 1 && (neighborCounter === 2 || neighborCounter === 3)){
        nextCellState = 1;
      } 
      if (currentCell === 1 && neighborCounter >= 4){
        nextCellState = 0;
      } 
      if (currentCell === 0 && neighborCounter === 3){
        nextCellState = 1;
      }
      if (currentCell === 0 && (neighborCounter < 3 || neighborCounter > 3)) {
        nextCellState = 0;
      }
      nextRow.push(nextCellState);
    });
    nextState.push(nextRow);
  });
  return nextState;
}

//var matrix =/*beacons*/ [[1, 1, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 1, 1], [0, 0, 1, 1, 0, 1, 1, 0, 0], [0, 0, 1, 1, 0, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 1, 1, 0, 0], [0, 0, 1, 1, 0, 1, 1, 0, 0], [1, 1, 0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 0, 0, 1, 1]];
/*var matrix = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
              [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];*/




var matrix = matrixCreator(25, 48);

document.addEventListener("DOMContentLoaded", function(){
  generateNewCycle(matrix);

  document.querySelector("#tick").addEventListener('click', function(){
    nextCycle();
  });
  function nextCycle(){
    matrix = calculateNextState(matrix);
    generateNewCycle(matrix);
  }


  setInterval(nextCycle, 250);
});


