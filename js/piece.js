function Piece(type,pos){
  //--------------------Member
  this.pos = pos;  
  this.type = type;
  var d = $.Deferred();
  //----------------------Initializer 
  this.loadMesh(this.typeToURL[type]).done(function () {
    pos&&this.setPos(pos); 
    d.resolve();
  }.bind(this));
  this.promise = d.promise();
}

//-----------------------Methods
Piece.prototype.typeToURL = {
  queen : "js/queen.js",
  board : "js/chess_board.js"
};


Piece.prototype.loadMesh = function(url){
  var d = $.Deferred();
  var loader = new THREE.JSONLoader();
  loader.load(url,function(geo,mats){
    var mat = new THREE.MeshFaceMaterial(mats);
    this.mesh = new THREE.Mesh(geo,mat);
    scene.add(this.mesh);
    d.resolve();
  }.bind(this));
  return d.promise();
}

//---------------------Overload Methods
addMethod(Piece.prototype,"setPos",function(x,y,z){
  this.mesh.position = {x:x,y:y,z:z};
});
addMethod(Piece.prototype,"setPos",function(n,m){
  this.mesh.position = {x:(n-4)*2.5,y:0,z:(m-4)*2.5};
});
addMethod(Piece.prototype,"setPos",function(p){
  this.mesh.position = p;
});
addMethod(Piece.prototype,"setPos",function(){
  this.mesh.position = {x:0,y:0,z:0};
});
