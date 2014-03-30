function Piece(type){
  this.loadMesh("js/queen.js");

}

Piece.prototype.loadMesh = function(url){
  var loader = new THREE.JSONLoader();
  loader.load(url,function(geo,mats){
    var mat = new THREE.MeshFaceMaterial(mats);
    this.mesh = new THREE
  }.bind(this));
}

Piece.prototype.setPos = function(){
  
  
}
