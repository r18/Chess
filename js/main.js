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
  board = new Board();
  board.linesUp();
  solver = new Solver();
  solver.checkBoard(4);
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
