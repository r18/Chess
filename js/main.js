function main(){
  width = 1280;
  height = 640;
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
  camera = new THREE.PerspectiveCamera(75,width/ height,0.1,1000);

  camera.position.z = 17;
  camera.position.y = 8;
  scene.add(camera);

  light = new THREE.DirectionalLight(0xffffff,10);
  light.position.set(0, 1, 0).normalize();
  scene.add(light);

  cvs = document.getElementById("cvs");
  renderer = new THREE.WebGLRenderer( {antialias: true} );
  renderer.setSize(width,height);

  for(var i=0;i<64;i++)Pieces.push(new Piece("queen"));
  board = new Piece("board",{x:-1.6,y:-3.4,z:1});//XXX
  var workQueue = [];

  for(i in Pieces){
    var d = $.Deferred();
    (function(i,d){
      Pieces[i].promise.done(setTimeout(function(){
        Pieces[i].setPos(i%8,Math.floor(i/8));
        console.log(i);
        d.resolve(); 
      },100));  
    }(i,d))
    workQueue.push(d.promise());
  }

  $.when.apply(this,workQueue).done(function () {
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
  camera.position.y = Math.cos(theta/3)*4+10;
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
