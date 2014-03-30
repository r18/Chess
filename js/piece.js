function Piece(type,pos){
 //--------------------Member
  this.pos = pos;  
  this.type = type;

//---------------------Overload Methods
  addMethod(this,"setPos",function(x,y,z){
    this.mesh.position = {x:x,y:y,z:z};
  });
  addMethod(this,"setPos",function(n,m){
    this.mesh.position = {x:n,y:0,z:m};
  });
  addMethod(this,"setPos",function(p){
    this.mesh.position = p;
  });
  addMethod(this,"setPos",function(){
    this.mesh.position = {x:0,y:0,z:0};
  });
//----------------------Initializer 
  console.log(this.typeToURL);
  this.loadMesh(this.typeToURL[type]).done(function () {
    this.setPos(pos); 
  }.bind(this));
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


