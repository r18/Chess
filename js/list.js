function List(target){
  this.data = [];//{index,data1,data2,data3...}  
  this.dataType = {};
  this.table= document.createElement("table");
  target.appendChild(this.table); 
}

List.prototype.addRow = function(data){
  var row = document.createElement("tr");
  for(key in data){
    var d = document.createElement("td");
    if(key in this.dataType){
      d.innerHTML = data[key];
      row.appendChild(d);
    }
  }
  this.elem.appendChild(row);
};

List.prototype.addColumn = function(){

};

List.prototype.removeRow = function(){

};

List.prototype.removeColumn = function(){

};

List.prototype.removeColumn = function(){

};

List.prototype.fold = function () {

};

List.prototype.unfold = function (){

};

List.prototype.show= function () {

};

List.prototype.hide = function () {

};
