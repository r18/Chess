function main(){
  camera ="";
  Pieces = [];
  lookAt = new THREE.Vector3(0,3,0);
  scene = "";
  theta = 6.7;
  init();
  animate();
  window.onkeydown = function(e){
    console.log(e.keyCode); 
    switch(e.keyCode){
      case 38:
        camera.position.y += 0.5;
        render();
        break;
      case 37:
        camera.position.x -= 0.5;
        render();
        break;
      case 40:
        camera.position.y -= 0.5;
        render();
        break;
      case 39:
        camera.position.x += 0.5;
        render();
        break;
      default:
        break;
    }
  }
}

function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75,300 / 300,0.1,1000);

  camera.position.z = 17;
  camera.position.y = 8;
  scene.add(camera);

  light = new THREE.DirectionalLight(0xffffff,10);
  light.position.set(0, 1, 0).normalize();
  scene.add(light);

  cvs = document.getElementById("cvs");
  renderer = new THREE.WebGLRenderer( {antialias: true} );
  renderer.setSize(600,600);

  var unit = 2.5;
  for(var i=-4;i<4;i++)Pieces.push(new Piece("queen"));
  board = new Piece("board",{x:-1.6,y:-1.9,z:1});//XXX
  for(i in Pieces)Pieces[i].promise.done(function(){
    Pieces[i].setPos(i,0);
  });  
  

  cvs.appendChild(renderer.domElement);
}

function animate(){
  requestAnimationFrame( animate );
  render();
}

function render() {
  var r = 15;
  camera.position.x = Math.sin(theta)*r; 
  camera.position.z = Math.cos(theta)*r ;
  camera.position.y = Math.cos(theta/3)*4+6;
  theta += 0.005;

  camera.lookAt(lookAt);
    draw();
}

function draw(){
  renderer.render(scene,camera);
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
