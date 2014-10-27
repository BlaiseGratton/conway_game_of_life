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

function newCycle(matrix){
  console.log(matrix);
  //rule 1
  //rule 2
  //rule 3
  //rule 4
  var $table = document.querySelector("table");
  matrix.forEach(function(row){
    // var row = matrix[i];
    $tr = document.createElement("tr");
    row.forEach(function(cell){
      // var cell = row[i];
      var $td =  document.createElement("td");

      if (cell === 1) {
        $td.classList.add("alive");
      } else {
        $td.classList.remove("alive");  
      }

      $tr.appendChild($td);

    });
    $table.appendChild($tr);
  });
}

var matrix = matrixCreator(3, 3);

document.addEventListener("DOMContentLoaded", function(){
  newCycle(matrix);
});


