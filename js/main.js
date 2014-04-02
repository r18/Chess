function main(){
  width = 1280;
  height = 640;
  lookAt = new THREE.Vector3(0,3,0);
  board = "";
  scene = "";
  animation = true;
  theta = 6.7;
  init();
  window.onkeydown = function(e){
    console.log(e.keyCode); 
    switch(e.keyCode){
      case 38:
        board.camera.position.y += 0.5;
        board.draw();
        break;
      case 37:
        board.camera.position.x -= 0.5;
        board.draw();
        break;
      case 40:
        board.camera.position.y -= 0.5;
        board.draw();
        break;
      case 39:
        board.camera.position.x += 0.5;
        board.draw();
        break;
      case 13:
        animation = !animation;
        animate();
        break;
      default:
        break;
    }
  }
}

function init(){
  pieceList = new List(document.getElementById("pieceList"));
  answerList = new List(document.getElementById("answerList"));
  answerList.setColumn(["index"]);
//  show8Queen();
  initGame();

}

function initGame() {
  board = new Board(pieceList);
  var d;
  for(i in defaultPosition){
    d = defaultPosition[i];
    board.addPiece(d.name,d.type,{m:d.m,n:d.n});
  }
  setTimeout(function() { 
  board.render();
  }, 310);
  animate(); 
}


function show8Queen() {
  board = new Board(pieceList);
  for(var i=0;i<8;i++)board.addPiece("q"+i,"queen");
  board.board = new Piece(board.scene,"board",{x:-1.6,y:-3.4,z:1});
  board.linesUp().done(function(){
    board.render();
    solver = new Solver();
    answer = [];
    var answerLength = 0;
    var oldLength = 0;
    solver.checkBoard(8,answer).progress(function (res) {
      answerLength = res.answerLength;
      if(answerLength != oldLength){
        if(answerLength == 1)board.readBoard(answer[0]);
        oldLength = answerLength;
      }
      answerList.appendRow({index:answerLength,
        onclick:function(e,ctx){
          board.readBoard(answer[ctx.data.index]);
        }
      });
    }).done(function () {
    });
  });
  animate();
}

function animate(){
  if(animation)requestAnimationFrame( animate );
  board.render();
}


function addMethod(obj,name,fn){
  var old = obj[name];
  obj[name] = function (){
    if(fn.length == arguments.length){
      return fn.apply(this, arguments);
    }else if(typeof old == 'function') {
      return old.apply(this, arguments);
    }
  }
}

function expandObject(obj){

  if(typeof obj == "object"){
    var s = "";
    for(i in obj){
      s += expandObject(obj[i]) + " , ";
    }
    return s;
  } else {
    return obj.toString();
  }
}

var defaultPosition = [
{name:"k_1",type:"king",m:3,n:0},
{name:"k_2",type:"king",m:3,n:7},

{name:"q_1",type:"queen",m:4,n:0},
{name:"q_2",type:"queen",m:4,n:7},

{name:"b_1_r",type:"bishop",m:2,n:0},
{name:"b_1_l",type:"bishop",m:5,n:0},
{name:"b_2_r",type:"bishop",m:2,n:7},
{name:"b_2_l",type:"bishop",m:5,n:7},

{name:"n_1_r",type:"knight",m:1,n:0},
{name:"n_1_l",type:"knight",m:6,n:0},
{name:"n_2_r",type:"knight",m:1,n:7},
{name:"n_2_l",type:"knight",m:6,n:7},

{name:"r_1_r",type:"rook",m:0,n:0},
{name:"r_1_l",type:"rook",m:7,n:0},
{name:"r_2_r",type:"rook",m:0,n:7},
{name:"r_2_l",type:"rook",m:7,n:7},


{name:"p_1_1",type:"pawn",m:0,n:1},
{name:"p_1_2",type:"pawn",m:1,n:1},
{name:"p_1_3",type:"pawn",m:2,n:1},
{name:"p_1_4",type:"pawn",m:3,n:1},
{name:"p_1_5",type:"pawn",m:4,n:1},
{name:"p_1_6",type:"pawn",m:5,n:1},
{name:"p_1_7",type:"pawn",m:6,n:1},
{name:"p_1_8",type:"pawn",m:7,n:1},

{name:"p_2_1",type:"pawn",m:0,n:6},
{name:"p_2_2",type:"pawn",m:1,n:6},
{name:"p_2_3",type:"pawn",m:2,n:6},
{name:"p_2_4",type:"pawn",m:3,n:6},
{name:"p_2_5",type:"pawn",m:4,n:6},
{name:"p_2_6",type:"pawn",m:5,n:6},
{name:"p_2_7",type:"pawn",m:6,n:6},
{name:"p_2_8",type:"pawn",m:7,n:6}

];
