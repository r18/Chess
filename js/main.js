function main(){
  mesh="";
  camera ="";
  scene = "";
  theta = 0;
  init();
  animate();
  window.onkeydown = function(e){
    console.log(e.keyCode); 
    switch(e.keyCode){
      case 38:
        camera.position.y += 0.5;
        camera.lookAt(mesh.position);
        draw();
        break;
      case 37:
        camera.position.x -= 0.5;
        camera.lookAt(mesh.position);
        draw();
        break;
      case 40:
        camera.position.y -= 0.5;
        camera.lookAt(mesh.position);
        draw();
        break;
      case 39:
        camera.position.x += 0.5;
        camera.lookAt(mesh.position);
        draw();
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


  cvs.appendChild(renderer.domElement);
}

function genPiece( geometry,mater,als ) {
  console.log(materials);
  var material = new THREE.MeshFaceMaterial(materials);
  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  var p = new Piece(mesh);
  pieces.addPiece(p);
}

function animate(){
  requestAnimationFrame( animate );
  render();
}

function render() {
  camera.position.x = Math.sin(theta)*7; 
  camera.position.z = Math.cos(theta)*7 ;
  camera.position.y = Math.cos(theta/3)*7+4;
  theta += 0.05;

  camera.lookAt(mesh.position);
    draw();
}
function draw(){
  renderer.render(scene,camera);
}


