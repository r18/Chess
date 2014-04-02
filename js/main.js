function main(){
  width = 1280;
  height = 640;
  lookAt = new THREE.Vector3(0,3,0);
  board = "";
  scene = "";
  theta = 6.7;
  init();
  animate();
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
      default:
        break;
    }
  }
}

function init(){
  pieceList = new List(document.getElementById("pieceList"));
  answerList = new List(document.getElementById("answerList"));
  answerList.setColumn(["index"]);

  board = new Board(pieceList);
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
         console.log(ctx);
         board.readBoard(answer[ctx.data.index]);
        }});
    }).done(function () {
    });
  });
}


function animate(){
  requestAnimationFrame( animate );
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
