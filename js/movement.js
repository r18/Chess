function Movement(pieces) {
  this.pieces = pieces;
  this.board = new Uint8Array(64);
}

Movement.prototype.getMovement= function (piece) {
  this.updateBoard();
  var res
    switch(piece.type){
      case "w_pawn":
        res = this.getWPawnMovement(piece.pos,true);
        break;

      case "b_pawn":
        res = this.getBPawnMovement(piece.pos,false);
        break;

      case "w_knight":
        res = this.getKnightMovement(piece.pos,true);
        break;
      case "b_knight":
        res = this.getKnightMovement(piece.pos,false);
        break;

      case "b_king":
        res = this.getKingMovement(piece.pos,false);
        break;
      case "w_king":
        res = this.getKingMovement(piece.pos,true);
        break;

      case "b_rook":
        res = this.getRookMovement(piece.pos,false);
        break;
      case "w_rook":
        res = this.getRookMovement(piece.pos,true);
        break;

      case "b_bishop":
        res = this.getBishopMovement(piece.pos,false);
        break;
      case "w_bishop":
        res = this.getBishopMovement(piece.pos,true);
        break;

      case "b_queen":
        res = this.getQueenMovement(piece.pos,false);
        break;
      case "w_queen":
        res = this.getQueenMovement(piece.pos,true);
        break;

      default:
        console.log("there is no rule");
        break;
    }
  return res;
}

Movement.prototype.updateBoard = function () {
  for(i in this.pieces){
    var p = this.pieces[i];
    this.board[p.pos.n*8+p.pos.m] = this.typeToCode[p.type];
  }
};

Movement.prototype.getPieceCharWithIndex = function(index){
  return String.fromCharCode(this.board[index]);
};

Movement.prototype.getPieceWithIndex = function(index){
  return this.board[index];
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

Movement.prototype.checkLine = function (pos,res,dn,dm,isWhite) {
  var res = res || [] ;
  var resPos = {m:pos.m+dm, n:pos.n+dn};
  if(resPos.m > 7 || resPos.m < 0 || resPos.n > 7 || resPos.n < 0)return res;
  var piece = this.getPieceWithIndex(this.getIndex(resPos)); 
  if(piece== 0){
    res.push(resPos);
    this.checkLine(resPos,res,dn,dm,isWhite);
  } else if((piece > 97 && !isWhite) || (piece < 97 && isWhite)){
    res.push(resPos); 
  }
  return res;
}

Movement.prototype.isExistFriend = function (array,isWhite) {
  var res = [];
  for(i in array){
    var resPos = array[i];
    if(resPos.m > 7 || resPos.m < 0 || resPos.n > 7 || resPos.n < 0){
     continue;
    }
    var piece = this.getPieceWithIndex(this.getIndex(resPos)); 
    console.log(this.getIndex(resPos));
    if((piece > 97 && !isWhite) || (piece < 97 && isWhite)){
      res.push(resPos);
    } else if(piece == 0) {
      res.push(resPos);
    }
  }
  return res;
}

Movement.prototype.getWPawnMovement = function (pos,isWhite) {
  return this.isExistFriend([
      {m:pos.m, n:pos.n+1},
      {m:pos.m,n:pos.n+2}
      ],isWhite);
}

Movement.prototype.getBPawnMovement = function (pos,isWhite) {
  return this.isExistFriend([
      {m:pos.m, n:pos.n-1},
      {m:pos.m,n:pos.n-2}
      ],isWhite);
}
Movement.prototype.getKnightMovement = function (pos,isWhite) {
  return this.isExistFriend([
      {m:pos.m+1, n:pos.n+2},
      {m:pos.m-1, n:pos.n+2},
      {m:pos.m+1, n:pos.n-2},
      {m:pos.m-1, n:pos.n-2},
      {m:pos.m+2, n:pos.n+1},
      {m:pos.m+2, n:pos.n-1},
      {m:pos.m-2, n:pos.n+1},
      {m:pos.m-2, n:pos.n-1}
      ],isWhite);
}

Movement.prototype.getKingMovement = function (pos) {
  return this.isExistFriend([
  {m:pos.m+1, n:pos.n+1},
  {m:pos.m, n:pos.n+1},
  {m:pos.m-1, n:pos.n+1},

  {m:pos.m+1, n:pos.n},
  {m:pos.m-1, n:pos.n},

  {m:pos.m+1, n:pos.n-1},
  {m:pos.m,   n:pos.n-1},
  {m:pos.m-1, n:pos.n-1}

  ],isWhite);
}

Movement.prototype.getRookMovement = function (pos,isWhite) {
  return concatArray([
      this.checkLine(pos,[],0,1,isWhite),
      this.checkLine(pos,[],0,-1,isWhite),
      this.checkLine(pos,[],1,0,isWhite),
      this.checkLine(pos,[],-1,0,isWhite)
      ]);
}

Movement.prototype.getBishopMovement= function (pos,isWhite) {
  return concatArray([
      this.checkLine(pos,[],1,1,isWhite),
      this.checkLine(pos,[],1,-1,isWhite),
      this.checkLine(pos,[],-1,1,isWhite),
      this.checkLine(pos,[],-1,-1,isWhite)
      ]);
}

Movement.prototype.getQueenMovement = function (pos,isWhite) {
  return concatArray([
      this.checkLine(pos,[],1,1,isWhite),
      this.checkLine(pos,[],1,-1,isWhite),
      this.checkLine(pos,[],-1,1,isWhite),
      this.checkLine(pos,[],-1,-1,isWhite),

      this.checkLine(pos,[],0,1,isWhite),
      this.checkLine(pos,[],0,-1,isWhite),
      this.checkLine(pos,[],1,0,isWhite),
      this.checkLine(pos,[],-1,0,isWhite)
      ]);
}

