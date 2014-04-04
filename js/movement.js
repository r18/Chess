function Movement(pieces) {
  this.pieces = pieces;
  this.board = new Uint8Array(64);
  this.history = [];
}

Movement.prototype.getMovement= function (piece) {
  this.updateBoard();
  var res
    switch(piece.type){
      case "w_pawn":
        res = this.getPawnMovement(piece,true);
        break;

      case "b_pawn":
        res = this.getPawnMovement(piece,false);
        break;

      case "w_knight":
        res = this.getKnightMovement(piece,true);
        break;
      case "b_knight":
        res = this.getKnightMovement(piece,false);
        break;

      case "b_king":
        res = this.getKingMovement(piece,false);
        break;
      case "w_king":
        res = this.getKingMovement(piece,true);
        break;

      case "b_rook":
        res = this.getRookMovement(piece,false);
        break;
      case "w_rook":
        res = this.getRookMovement(piece,true);
        break;

      case "b_bishop":
        res = this.getBishopMovement(piece,false);
        break;
      case "w_bishop":
        res = this.getBishopMovement(piece,true);
        break;

      case "b_queen":
        res = this.getQueenMovement(piece,false);
        break;
      case "w_queen":
        res = this.getQueenMovement(piece,true);
        break;

      default:
        console.log("there is no rule");
        break;
    }
  return res;
};

Movement.prototype.updateBoard = function () {
  this.history.push(this.cloneBoard(this.board));
  this.board = new Uint8Array(64);
  for(i in this.pieces){
    var p = this.pieces[i];
    this.board[p.pos.n*8+p.pos.m] = this.typeToCode[p.type];
  }
};

Movement.prototype.cloneBoard = function (board) {
  var res = [];
  for(i in board){
    res.push(board[i]); 
  }
  return res;
}

Movement.prototype.clearPiece = function (piece) {
  this.board[piece.pos.n*8+piece.pos.m] = 0;
};

Movement.prototype.setPiece = function (piece) {
  this.board[piece.pos.n*8+piece.pos.m] = 0;
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
};

Movement.prototype.isExistFriend = function (array,isWhite) {
  var res = [];
  for(i in array){
    var resPos = array[i];
    if(resPos.m > 7 || resPos.m < 0 || resPos.n > 7 || resPos.n < 0){
      continue;
    }
    var piece = this.getPieceWithIndex(this.getIndex(resPos)); 
    if((piece > 97 && !isWhite) || (piece < 97 && isWhite)){
      res.push(resPos);
    } else if(piece == 0) {
      res.push(resPos);
    }
  }
  return res;
};

Movement.prototype.getPieceWithPos = function (pos) {
  if(pos.m > 7 || pos.m < 0 || pos.n > 7 || pos.n < 0)return -1;
  return this.getPieceWithIndex(this.getIndex(pos)); 
}

Movement.prototype.getPawnMovement = function (piece,isWhite) {
  var res = [];
  var p = piece.pos;
  var ff = isWhite ? {m:p.m,n:p.n+1} : {m:p.m,n:p.n-1}; 
  var rf = isWhite ? {m:p.m+1,n:p.n+1} : {m:p.m+1,n:p.n-1}; 
  var lf = isWhite ? {m:p.m-1,n:p.n+1} : {m:p.m-1,n:p.n-1}; 
  var rp = this.getPieceWithPos(rf);
  var lp = this.getPieceWithPos(lf);
  var fp = this.getPieceWithPos(ff);
  if((rp != 0) && (rp != -1) && ((rp> 97 && !isWhite) || (rp < 97 && isWhite)))res.push(rf);
  if((lp != 0) && (lp != -1) && ((lp> 97 && !isWhite) || (lp < 97 && isWhite)))res.push(lf);
  if(fp != -1 && fp == 0){
    res.push(ff);
    var fff = isWhite ? {m:p.m,n:p.n+2} : {m:p.m,n:p.n-2}; 
    var ffp = this.getPieceWithPos(fff);
    if((fp != -1 ) && !piece.isMoved ){
      res.push(fff); 
    }
  } 
  return res;
};

Movement.prototype.getBPawnMovement = function (piece,isWhite) {
  if(piece.isMoved)
    return this.isExistFriend([
        {m:piece.pos.m, n:piece.pos.n-1}
        ],isWhite);
  else return this.isExistFriend([
      {m:piece.pos.m, n:piece.pos.n-1},
      {m:piece.pos.m,n:piece.pos.n-2}
      ],isWhite);
};

Movement.prototype.getKnightMovement = function (piece,isWhite) {
  return this.isExistFriend([
      {m:piece.pos.m+1, n:piece.pos.n+2},
      {m:piece.pos.m-1, n:piece.pos.n+2},
      {m:piece.pos.m+1, n:piece.pos.n-2},
      {m:piece.pos.m-1, n:piece.pos.n-2},
      {m:piece.pos.m+2, n:piece.pos.n+1},
      {m:piece.pos.m+2, n:piece.pos.n-1},
      {m:piece.pos.m-2, n:piece.pos.n+1},
      {m:piece.pos.m-2, n:piece.pos.n-1}
      ],isWhite);
};

Movement.prototype.getKingMovement = function (piece,isWhite) {
  return this.isExistFriend([
      {m:piece.pos.m+1, n:piece.pos.n+1},
      {m:piece.pos.m, n:piece.pos.n+1},
      {m:piece.pos.m-1, n:piece.pos.n+1},

      {m:piece.pos.m+1, n:piece.pos.n},
      {m:piece.pos.m-1, n:piece.pos.n},

      {m:piece.pos.m+1, n:piece.pos.n-1},
      {m:piece.pos.m,   n:piece.pos.n-1},
      {m:piece.pos.m-1, n:piece.pos.n-1}

      ],isWhite);
};

Movement.prototype.getRookMovement = function (piece,isWhite) {
  return concatArray([
      this.checkLine(piece.pos,[],0,1,isWhite),
      this.checkLine(piece.pos,[],0,-1,isWhite),
      this.checkLine(piece.pos,[],1,0,isWhite),
      this.checkLine(piece.pos,[],-1,0,isWhite)
      ]);
};

Movement.prototype.getBishopMovement= function (piece,isWhite) {
  return concatArray([
      this.checkLine(piece.pos,[],1,1,isWhite),
      this.checkLine(piece.pos,[],1,-1,isWhite),
      this.checkLine(piece.pos,[],-1,1,isWhite),
      this.checkLine(piece.pos,[],-1,-1,isWhite)
      ]);
};

Movement.prototype.getQueenMovement = function (piece,isWhite) {
  return concatArray([
      this.checkLine(piece.pos,[],1,1,isWhite),
      this.checkLine(piece.pos,[],1,-1,isWhite),
      this.checkLine(piece.pos,[],-1,1,isWhite),
      this.checkLine(piece.pos,[],-1,-1,isWhite),

      this.checkLine(piece.pos,[],0,1,isWhite),
      this.checkLine(piece.pos,[],0,-1,isWhite),
      this.checkLine(piece.pos,[],1,0,isWhite),
      this.checkLine(piece.pos,[],-1,0,isWhite)
      ]);
};

