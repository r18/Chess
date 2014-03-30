function Piece(type){
  this.type = type;
  this.loadMesh("js/queen.js");

}

Piece.prototype.typeToURL = {
 queen : "js/queen.js"
};

Piece.prototype.loadMesh = function(url){
  var loader = new THREE.JSONLoader();
  loader.load(url,function(geo,mats){
    var mat = new THREE.MeshFaceMaterial(mats);
    this.mesh = new THREE.Mesh(geo,mat);
    scene.add(this.mesh);
  }.bind(this));
}

Piece.prototype.setPos = function(){
  
  
}
