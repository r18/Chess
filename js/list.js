function List(target){
  this.data = [];//{data1,data2,data3...}  
  this.dataType = [];
  this.table= document.createElement("table");
  target.appendChild(this.table); 
}

List.prototype.setColumn = function (type) {
  this.dataType = type;
};

List.prototype.appendRow= function(_data){
  var data = new ListData(_data,this.dataType,this.table);
  this.data.push(data);
  this.table.appendChild(data.createElement());
};

List.prototype.removeRowWithIndex = function(i){
  
};

List.prototype.insertRow = function () {
 
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

//-------------------------------
function ListData(data,dataType,target) {
  this.data = data; 
  this.dataType = dataType;
  this.table = target;
}

ListData.prototype.createElement = function(){
  
  var row = document.createElement("tr");
  var key;
  for(i in this.dataType){
    key = this.dataType[i];
    var d = document.createElement("td");
    if(key in this.data){
        d.innerHTML = this.data[key];
      row.appendChild(d);
    }
   if("onclick" in this.data)row.onclick = this.data.onclick;
   if("onmousemove" in this.data)row.onmousemove= this.data.onmousemove;
  }
  return row;
};

ListData.prototype.onmousemove = function () {
 
};
