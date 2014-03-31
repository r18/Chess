function Board() {
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(75,width/ height,0.1,1000);

  this.camera.position.z = 17;
  this.camera.position.y = 8;
  this.scene.add(this.camera);

  this.pieces = [];

  light = new THREE.DirectionalLight(0xffffff,10);
  light.position.set(0, 1, 0).normalize();
  this.scene.add(light);

  cvs = document.getElementById("cvs");
  renderer = new THREE.WebGLRenderer( {antialias: true} );
  renderer.setSize(width,height);

  for(var i=0;i<32;i++)this.pieces.push(new Piece(this.scene,"queen"));
  this.board = new Piece(this.scene,"board",{x:-1.6,y:-3.4,z:1});//XXX
  var workQueue = [];

  for(i in this.pieces){
    var d = $.Deferred();
    (function(i,d){
      this.pieces[i].promise.done(setTimeout(function(){
        this.pieces[i].setPos(i%8,Math.floor(i/8));
        d.resolve(); 
      }.bind(this),100));  
    }.bind(this)(i,d))
    workQueue.push(d.promise());
  }

  $.when.apply(this,workQueue).done(function () {

  });


  cvs.appendChild(renderer.domElement);
}



Board.prototype.render = function() {
  var r = 15;
  this.camera.position.x = Math.sin(theta)*r; 
  this.camera.position.z = Math.cos(theta)*r ;
  this.camera.position.y = Math.cos(theta/3)*4+10;
  theta += 0.005;
  this.camera.lookAt(lookAt);
  this.draw();
}

Board.prototype.draw = function (){
  renderer.render(this.scene,this.camera);
}
