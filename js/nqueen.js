function Solver(){

}

Solver.prototype.checkBoard  = function(n){

  var qBoard = this.init(n);
  this.show(qBoard);
  var i=0;
  ans = [];
  while(this.genNextBoard(qBoard)){
    i++;
    if(this.check(qBoard)){
      ans.push(this.clone(qBoard));
      break;
    }
  }
  
  for(var i=0;i<ans.length;i++){
    this.show(ans[i]);
  }
  
  return ans;
};

Solver.prototype.checkTilt = function (qBoard){
  for(var x=0;x<qBoard[0].length;x++){
    if(this.getDR(qBoard,0,x) > 1)return false;
    if(this.getDL(qBoard,0,x) > 1)return false;
  }
  for(var y=0;y<qBoard.length;y++){
    if(this.getDR(qBoard,y,0) > 1)return false;
    if(this.getDL(qBoard,y,qBoard[y].length-1) > 1)return false;
  }
  return true;
};

Solver.prototype.getDR = function(qBoard,y,x){
  if (y == qBoard.length || x == qBoard[y].length ){
    return 0;
  } else if(qBoard[y][x] == 1){
    return 1 + this.getDR(qBoard,y+1,x+1);
  } else {
    return this.getDR(qBoard,y+1,x+1);
  }
};

Solver.prototype.getDL = function(qBoard,y,x){
  if (y == qBoard.length || x == -1 ||x == qBoard[y].length ){
    return 0;
  } else if(qBoard[y][x] == 1){
    return 1 + this.getDL(qBoard,y+1,x-1);
  } else {
    return this.getDL(qBoard,y+1,x-1);
  }
};

Solver.prototype.clone = function(qBoard){
  var res = [];
  for(var i=0;i<qBoard.length;i++){
    var ans = [];
    for(var j=0;j<qBoard[i].length;j++){
      ans.push(qBoard[i][j]);
    }
    res.push(ans);
  }
  return res;
};

Solver.prototype.init = function(n){
  var res = [];
  for(var j=0;j<n;j++){
    var array = [];
    for(var i=0;i<n;i++){
     if(i != n-j-1) array.push(0);
     else array.push(1);
    }
    res.push(array);
  }
  return res;
}
Solver.prototype.show = function(qBoard){
  for(var y =0;y<qBoard.length;y++){
    var str = "";
    for(var x=0;x<qBoard[y].length;x++){
      str += qBoard[y][x] + " ";
    }
    for(var i=0;i<y;i++)str+=" ";
    console.log(str);
  }
  console.log("----------------------");
}
Solver.prototype.genNextBoard = function(qBoard){
  return  this.replaceQueen(qBoard,0);
}
Solver.prototype.replaceQueen = function(qBoard,y){
  for(var x=0;x<qBoard[y].length;x++){
    if(qBoard[y][x] == 1){
      qBoard[y][x] = 0;
      if(x != qBoard[y].length-1){
        qBoard[y][x+1] = 1;
        break;
      }else{
        qBoard[y][0] = 1;
        if(y == qBoard.length-1  ){
          return false;
        }else {
          return this.replaceQueen(qBoard,y+1);
          break;
        }
      }

    }
  }
  return true;
};

Solver.prototype.check = function(qBoard){
  for(var y=0;y<qBoard.length;y++){
    if(this.sumX(qBoard,y) >1)return false;
  }
  for(var x=0;x<qBoard[0].length;x++){
    if(this.sumY(qBoard,x) >1)return false;
  }
  if(!this.checkTilt(qBoard))return false;
  return true;
};


Solver.prototype.sumX = function(qBoard,y){
  var sum = 0;
  for(var x=0;x<qBoard[y].length;x++){
    sum+=qBoard[y][x];
  }
  return sum;
};

Solver.prototype.sumY = function(qBoard,x){
  var sum = 0;
  for(var y=0;y<qBoard.length;y++){
    sum += qBoard[y][x];
  }
  return sum;
};
