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

List.prototype.getIndexFromValue = function (key,value) {
  for(i in this.data){
    if(this.data[i].data[key] == value)return i;
  }
  return -1;
}

List.prototype.getRowFromValue = function (key,value){
  var r = this.getIndexFromValue(key,value);
  if(r == -1)console.log("Not found ,key: "+key+" ,value: "+value);
  return this.data[r];
}

List.prototype.update = function () {
 for(key in this.data)this.data[key].update();
}
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
  this.elements = {};
}

ListData.prototype.createElement = function(){

  this.elem = document.createElement("tr");
  var key;
  for(i in this.dataType){
    key = this.dataType[i];
    this.elements[key] = document.createElement("td");
    if(key in this.data){
      this.elements[key].innerHTML = this.data[key];
    }
    this.elem.appendChild(this.elements[key]);
  }

  if("onclick" in this.data){
    this.elem.onclick = this.data.onclick;
  } else {
    this.elem.onclick = this.onclick;
  }
  if("onmousemove" in this.data){
    this.elem.onmousemove= this.data.onmousemove;
  } else {
    this.elem.onmousemove= this.onmousemove;
  }
  return this.elem;
};

ListData.prototype.update = function(){
  var key ="";
  for(i in this.dataType){
    key = this.dataType[i]; 
    if(this.elements[key].innerHTML != this.data[key]){
     this.elements[key].innerHTML = this.data[key];
    }
  }
}

ListData.prototype.onmousemove = function (e) {
};

ListData.prototype.setValue = function (key,value) {
  if(key in this.data)this.data[key] = value;  
  this.update();
};
