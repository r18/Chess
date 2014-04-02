function Piece(scene,type,pos){

  //--------------------Member
  this.type = type;
  this.scene = scene;

  var d = $.Deferred();

  //----------------------Initializer 
  this.loadMesh(this.typeToURL[type]).done(function () {
    pos&&this.setPos(pos); 
    d.resolve();

  }.bind(this));
  this.promise = d.promise();
}

//-----------------------Const
Piece.prototype.typeToURL = {
  queen : "js/queen.js",
  pawn: "js/pawn.js",
  board : "js/chess_board.js",
  rook: "js/rook.js",
  bishop: "js/bishop.js",
  king: "js/king.js"
  knight: "js/knight.js"


};

Piece.prototype.unit = 2.5

//-----------------------Methods
Piece.prototype.loadMesh = function(url){
  var d = $.Deferred();
  var loader = new THREE.JSONLoader();
  loader.load(url,function(geo,mats){
    var mat = new THREE.MeshFaceMaterial(mats);
    this.mesh = new THREE.Mesh(geo,mat);
    this.show();
    d.resolve();
  }.bind(this));
  return d.promise();
};
Piece.prototype.hide = function(){
  this.scene.remove(this.mesh);
};

Piece.prototype.show = function(){
  this.scene.add(this.mesh);

};
//---------------------Overload Methods
//--------SetPos
addMethod(Piece.prototype,"setPos",function(x,y,z){
  this.mesh.position = {x:x,y:y,z:z};
});

addMethod(Piece.prototype,"setPos",function(n,m){
  this.pos = {n:n,m:m};
  this.mesh.position = {x:(n-4)*this.unit,y:0,z:(m-3)*this.unit};
});

addMethod(Piece.prototype,"setPos",function(p){
  this.mesh.position = p;
});

addMethod(Piece.prototype,"setPos",function(){
  this.mesh.position = {x:0,y:0,z:0};
});
