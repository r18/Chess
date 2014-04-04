function Movement(pieces) {
 this.pieces = pieces;
 this.board = new Uint8Array(64);
}

Movement.prototype.getMovement= function (piece) {
  this.updateBoard();
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
};

Movement.prototype.updateBoard = function () {
  for(i in this.pieces){
    var p = this.pieces[i];
    this.board[p.pos.n*8+p.pos.m] = this.typeToCode[p.type];
  }
};

Movement.prototype.getPieceWithIndex = function(index){
  return String.fromCharCode(this.board[index]);
};

Movement.prototype.getPosition= function (index) {
  return {m:index%8,n:Math.floor(index/8)};  
};

Movement.prototype.getIndex= function (pos) {
  return pos.n*8+pos.m;
};

Movement.prototype.typeToCode = {
    w_pawn:  112,
    w_rook:   114,
    w_bishop: 98,
    w_knight: 110,
    w_king:   107,
    w_queen:  113,
    b_pawn:   80,
    b_knight: 78,
    b_king:   75,
    b_queen:  81,
    b_bishop: 66,
    b_rook:   82
};

Movement.prototype.checkLine = function (pos,direction) {
  var m = pos.m;
  var n = pos.n;
  var r = this.getPieceWithIndex(this.getIndex({m:m,n:n}));

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

