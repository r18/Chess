function Piece(scene,type,pos,name){

  //--------------------Member
  this.type = type;
  this.scene = scene;
  this.name = name;
  this.isMoved = false;
  this.pos = {};
  this.twoadv = false;
  var d = $.Deferred();
  //----------------------Initializer 
  this.loadMesh(this.typeToURL[type]).done(function () {
    if(pos){ 
      if("m" in pos&& "n" in pos)this.setPos(pos.n,pos.m);
      else this.setPos(pos); 
    }
    d.resolve();

  }.bind(this));
  this.promise = d.promise();
}

//-----------------------Const
Piece.prototype.typeToURL = {
  board : "js/models/chess_board.js",

  w_queen : "js/models/w_queen.js",
  w_pawn  : "js/models/w_pawn.js",
  w_rook  : "js/models/w_rook.js",
  w_bishop: "js/models/w_bishop.js",
  w_king  : "js/models/w_king.js",
  w_knight: "js/models/w_knight.js",

  b_queen : "js/models/b_queen.js",
  b_pawn  : "js/models/b_pawn.js",
  b_rook  : "js/models/b_rook.js",
  b_bishop: "js/models/b_bishop.js",
  b_king  : "js/models/b_king.js",
  b_knight: "js/models/b_knight.js"



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
  if(!this.isMoved&&this.pos.n - n == 2)this.twoadv = true;
  else this.twoadv = false;
  this.pos = {n:n,m:m};
  this.mesh.position = {x:(n-4)*this.unit,y:0,z:(m-3)*this.unit};
});

addMethod(Piece.prototype,"setPos",function(p){
  this.mesh.position = p;
});

addMethod(Piece.prototype,"setPos",function(){
  this.mesh.position = {x:0,y:0,z:0};
});
