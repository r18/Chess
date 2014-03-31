function Board() {
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(75,width/ height,0.1,1000);
  this.game = {};

  this.camera.position.z = 17;
  this.camera.position.y = 8;
  this.scene.add(this.camera);

  this.pieces = {};

  light = new THREE.DirectionalLight(0xffffff,10);
  light.position.set(0, 1, 0).normalize();
  this.scene.add(light);

  cvs = document.getElementById("cvs");
  renderer = new THREE.WebGLRenderer( {antialias: true} );
  renderer.setSize(width,height);

  for(var i=0;i<8;i++)this.addPiece("q"+i,"queen");
  this.board = new Piece(this.scene,"board",{x:-1.6,y:-3.4,z:1});//XXX

  //  this.linesUp();

  cvs.appendChild(renderer.domElement);
}

Board.prototype.linesUp = function(){
  var workQueue = [];
  var i=0;
  for(p in this.pieces){
    var d = $.Deferred();
    (function(i,d,p){
      this.pieces[p].promise.done(function(){
        this.pieces[p].setPos(i%8,Math.floor(i/8));
        d.resolve(); 
      }.bind(this));  
    }.bind(this)(i,d,p))
    workQueue.push(d.promise());
    i++;
  }
  return $.when.apply(this,workQueue);
};

Board.prototype.render = function() {
  var r = 15;
  this.camera.position.x = Math.sin(theta)*r; 
  this.camera.position.z = Math.cos(theta)*r ;
  this.camera.position.y = Math.cos(theta/3)*4+10;
  theta += 0.005;
  this.camera.lookAt(lookAt);
  this.draw();
};

Board.prototype.draw = function (){
  renderer.render(this.scene,this.camera);
};

Board.prototype.move = function(name,m,n){
  this.pieces[name].setPos(m,n);    
}

Board.prototype.readBoard = function(b){
  for(i in b){
    this.move(b[i].name,b[i].m,b[i].n);
  }
}

//------------------------------Overload Methods
addMethod(Board.prototype,"addPiece",function(name,type,pos){
  this.pieces[name] = new Piece(this.scene,type,pos); 
});

addMethod(Board.prototype,"addPiece",function(name,type){
  this.pieces[name] = new Piece(this.scene,type); 
});


