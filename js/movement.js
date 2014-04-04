function Movement(pieces) {
 this.pieces = pieces;
}

Movement.prototype.getMovement= function (piece) {
  var res
  switch(piece.type){
    case "w_pawn":
      res = this.getWPawnMovement(piece.pos);
      break;

    case "b_pawn":
      res = this.getBPawnMovement(piece.pos);
      break;

    case "w_knight":
    case "b_knight":
      res = this.getKnightMovement(piece.pos);
      break;

    case "b_king":
    case "w_king":
      res = this.getKingMovement(piece.pos);
      break;

    case "b_rook":
    case "w_rook":
      res = this.getRookMovement(piece.pos);
      break;

    case "b_bishop":
    case "w_bishop":
      res = this.getBishopMovement(piece.pos);
      break;

    case "b_queen":
    case "w_queen":
      res = this.getQueenMovement(piece.pos);
      break;

    default:
      console.log("there is no rule");
      break;
  }
  return this.boundaryCheck(res); 
}

Movement.prototype.boundaryCheck = function (move){
 var pos;
 var res = [];
 for(i in move){
    pos = move[i];
    if(pos.m > -1 && pos.m < 8 && pos.n > -1 && pos.n < 8)res.push(move[i]);
 }
 return res;
}

Movement.prototype.getWPawnMovement = function (pos) {
  return [{m:pos.m, n:pos.n+1},
         {m:pos.m,n:pos.n+2}];
}

Movement.prototype.getBPawnMovement = function (pos) {
  return [{m:pos.m, n:pos.n-1},
         {m:pos.m,n:pos.n-2}];
}
Movement.prototype.getKnightMovement = function (pos) {
  return [
  {m:pos.m+1, n:pos.n+2},
  {m:pos.m-1, n:pos.n+2},
  {m:pos.m+1, n:pos.n-2},
  {m:pos.m-1, n:pos.n-2},
  {m:pos.m+2, n:pos.n+1},
  {m:pos.m+2, n:pos.n-1},
  {m:pos.m-2, n:pos.n+1},
  {m:pos.m-2, n:pos.n-1}
  ];
}

Movement.prototype.getKingMovement = function (pos) {
  return [
  {m:pos.m+1, n:pos.n+1},
  {m:pos.m, n:pos.n+1},
  {m:pos.m-1, n:pos.n+1},

  {m:pos.m+1, n:pos.n},
  {m:pos.m-1, n:pos.n},

  {m:pos.m+1, n:pos.n-1},
  {m:pos.m,   n:pos.n-1},
  {m:pos.m-1, n:pos.n-1}

  ];
}

Movement.prototype.getRookMovement = function (pos) {
  return [
  {m:pos.m, n:pos.n+1},
  {m:pos.m, n:pos.n+2},
  {m:pos.m, n:pos.n+3},
  {m:pos.m, n:pos.n+4},
  {m:pos.m, n:pos.n+5},
  {m:pos.m, n:pos.n+6},
  {m:pos.m, n:pos.n+7},

  {m:pos.m, n:pos.n-1},
  {m:pos.m, n:pos.n-2},
  {m:pos.m, n:pos.n-3},
  {m:pos.m, n:pos.n-4},
  {m:pos.m, n:pos.n-5},
  {m:pos.m, n:pos.n-6},
  {m:pos.m, n:pos.n-7},

  {n:pos.n, m:pos.m+1},
  {n:pos.n, m:pos.m+2},
  {n:pos.n, m:pos.m+3},
  {n:pos.n, m:pos.m+4},
  {n:pos.n, m:pos.m+5},
  {n:pos.n, m:pos.m+6},
  {n:pos.n, m:pos.m+7},

  {n:pos.n, m:pos.m-1},
  {n:pos.n, m:pos.m-2},
  {n:pos.n, m:pos.m-3},
  {n:pos.n, m:pos.m-4},
  {n:pos.n, m:pos.m-5},
  {n:pos.n, m:pos.m-6},
  {n:pos.n, m:pos.m-7},
  ];
}

Movement.prototype.getBishopMovement= function (pos) {
  return [
  {m:pos.m+1, n:pos.n+1},
  {m:pos.m+2, n:pos.n+2},
  {m:pos.m+3, n:pos.n+3},
  {m:pos.m+4, n:pos.n+4},
  {m:pos.m+5, n:pos.n+5},
  {m:pos.m+6, n:pos.n+6},
  {m:pos.m+7, n:pos.n+7},

  {m:pos.m+1, n:pos.n-1},
  {m:pos.m+2, n:pos.n-2},
  {m:pos.m+3, n:pos.n-3},
  {m:pos.m+4, n:pos.n-4},
  {m:pos.m+5, n:pos.n-5},
  {m:pos.m+6, n:pos.n-6},
  {m:pos.m+7, n:pos.n-7},

  {m:pos.m-1, n:pos.n+1},
  {m:pos.m-2, n:pos.n+2},
  {m:pos.m-3, n:pos.n+3},
  {m:pos.m-4, n:pos.n+4},
  {m:pos.m-5, n:pos.n+5},
  {m:pos.m-6, n:pos.n+6},
  {m:pos.m-7, n:pos.n+7},


  {m:pos.m-1, n:pos.n-1},
  {m:pos.m-2, n:pos.n-2},
  {m:pos.m-3, n:pos.n-3},
  {m:pos.m-4, n:pos.n-4},
  {m:pos.m-5, n:pos.n-5},
  {m:pos.m-6, n:pos.n-6},
  {m:pos.m-7, n:pos.n-7},

  ];
}


Movement.prototype.getQueenMovement = function (pos) {
  return [

  {m:pos.m+1, n:pos.n+1},
  {m:pos.m+2, n:pos.n+2},
  {m:pos.m+3, n:pos.n+3},
  {m:pos.m+4, n:pos.n+4},
  {m:pos.m+5, n:pos.n+5},
  {m:pos.m+6, n:pos.n+6},
  {m:pos.m+7, n:pos.n+7},

  {m:pos.m+1, n:pos.n-1},
  {m:pos.m+2, n:pos.n-2},
  {m:pos.m+3, n:pos.n-3},
  {m:pos.m+4, n:pos.n-4},
  {m:pos.m+5, n:pos.n-5},
  {m:pos.m+6, n:pos.n-6},
  {m:pos.m+7, n:pos.n-7},

  {m:pos.m-1, n:pos.n+1},
  {m:pos.m-2, n:pos.n+2},
  {m:pos.m-3, n:pos.n+3},
  {m:pos.m-4, n:pos.n+4},
  {m:pos.m-5, n:pos.n+5},
  {m:pos.m-6, n:pos.n+6},
  {m:pos.m-7, n:pos.n+7},


  {m:pos.m-1, n:pos.n-1},
  {m:pos.m-2, n:pos.n-2},
  {m:pos.m-3, n:pos.n-3},
  {m:pos.m-4, n:pos.n-4},
  {m:pos.m-5, n:pos.n-5},
  {m:pos.m-6, n:pos.n-6},
  {m:pos.m-7, n:pos.n-7},

  {m:pos.m, n:pos.n+1},
  {m:pos.m, n:pos.n+2},
  {m:pos.m, n:pos.n+3},
  {m:pos.m, n:pos.n+4},
  {m:pos.m, n:pos.n+5},
  {m:pos.m, n:pos.n+6},
  {m:pos.m, n:pos.n+7},

  {m:pos.m, n:pos.n-1},
  {m:pos.m, n:pos.n-2},
  {m:pos.m, n:pos.n-3},
  {m:pos.m, n:pos.n-4},
  {m:pos.m, n:pos.n-5},
  {m:pos.m, n:pos.n-6},
  {m:pos.m, n:pos.n-7},

  {n:pos.n, m:pos.m+1},
  {n:pos.n, m:pos.m+2},
  {n:pos.n, m:pos.m+3},
  {n:pos.n, m:pos.m+4},
  {n:pos.n, m:pos.m+5},
  {n:pos.n, m:pos.m+6},
  {n:pos.n, m:pos.m+7},

  {n:pos.n, m:pos.m-1},
  {n:pos.n, m:pos.m-2},
  {n:pos.n, m:pos.m-3},
  {n:pos.n, m:pos.m-4},
  {n:pos.n, m:pos.m-5},
  {n:pos.n, m:pos.m-6},
  {n:pos.n, m:pos.m-7},
  ];
}

