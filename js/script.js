class PedidoCamiseta{
    
    constructor(id,nome,qtdP,qtdM,qtdG,total){
    this.id = id;
    this.nome = nome;
    this.qtdP = parseInt(qtdP);
    this.qtdM = parseInt(qtdM);
    this.qtdG = parseInt(qtdG);
    this.total = parseFloat(total);
    
    }
        
}
var contador = 1;
var pedidos = [{"id":1,"nome":"EX: José", "qtdP":1,"qtdM":2,"qtdG":3,"total":79}];

var idedicao = "";
function criaId(){
    contador ++
    return contador;
}

function save(){
    let pedido = readData();
    if(validation(pedido)){
        let novoPedido = new PedidoCamiseta(criaId(),pedido.nome,pedido.qtdP,pedido.qtdM,pedido.qtdG, getTotal(pedido))        
        pedidos.push(novoPedido);
        addData(pedidos);
        cleanData();
    }
    
    
    
}
function readData(){
    let pedido = {}
    pedido.id = idedicao;
    pedido.nome = document.getElementById("nome").value;
    pedido.qtdP = document.getElementById("qtdP").value;
    pedido.qtdM = document.getElementById("qtdM").value;
    pedido.qtdG = document.getElementById("qtdG").value;
    
    if(pedido.qtdP ==""){        
        pedido.qtdP = '0';
    }
    if(pedido.qtdM ==""){
        pedido.qtdM = '0';
    }
    if(pedido.qtdG ==""){
        pedido.qtdG = '0';
    }
    return pedido;
}
function validation(pedido){
    document.getElementById("msgErrors").style.display = "none";
    let errors = "";
    if(pedido.nome == ""){
        errors+= "<p>Preencha o campo NOME</p> "
    }
    if(pedido.qtdP =="0" && pedido.qtdM =="0"&& pedido.qtdG=="0"){
        errors +="<p>Informe a quantidade de pelo menos um Tamnho</p>"
    }
    if(errors ==""){
        return true;
    }else{
        document.getElementById("msgErrors").style.display = "block";
        document.getElementById("erros").innerHTML = errors;
        return false;
    }
}
function addData(arrPedidos){
  if(arrPedidos.length != 0){     
    var tabela = `
    <thead>
        <th>Cliente</th>
        <th>P</th>
        <th>M</th>
        <th>G</th>
        <th>Total</th>
        <th>Action</th>
    </thead>
    <tbody>`    
    
    for(let i =0;i<arrPedidos.length;i++){
      tabela +=  `<tr>
            <td>${arrPedidos[i].nome}</td>
            <td>${arrPedidos[i].qtdP}</td>
            <td>${arrPedidos[i].qtdM}</td>
            <td>${arrPedidos[i].qtdG}</td>
            <td>${formatValue(getTotal(arrPedidos[i]))}</td>
            <td><button class="btn btn-light" onclick="setUpdate(${arrPedidos[i].id})">Edit</button> <button class="btn btn-light" onclick="deleteData(${arrPedidos[i].id})">Excluir</button></td>
        </tr>`
    }
    tabela += `</tbody>`
    document.getElementById("tabelaa").innerHTML = tabela;
    }   
    
    
    saveDataStorage(arrPedidos);
}
function getTotal(pedido){
    
    var total = (pedido.qtdP *10)+(pedido.qtdM*12)+(pedido.qtdG*15)

    return total;
}

function cleanData(){
    document.getElementById("nome").value = "";
    document.getElementById("qtdP").value = "";
    document.getElementById("qtdM").value = "";
    document.getElementById("qtdG").value = "";

    document.getElementById("btnSave").style.display ="block";
    document.getElementById("btnUpadate").style.display ="none";
}
function setUpdate(id){
    
    for(let i =0;i<pedidos.length;i++){
        if(pedidos[i].id == id){
            document.getElementById("nome").value = pedidos[i].nome;
            document.getElementById("qtdP").value = pedidos[i].qtdP !=0 ? pedidos[i].qtdP: "Quantidade P";
            document.getElementById("qtdM").value = pedidos[i].qtdM !=0 ? pedidos[i].qtdM: "Quantidade M"
            document.getElementById("qtdG").value = pedidos[i].qtdG !=0 ? pedidos[i].qtdG: "Quantidade G"
            idedicao = pedidos[i].id

            document.getElementById("btnSave").style.display ="none";
            document.getElementById("btnUpadate").style.display ="block";
                
            
            
        }
    }
}

function deleteData(id){
    if(confirm("Deseja excluir pedido?")){
        for(let i=0;i<pedidos.length;i++){
            if(pedidos[i].id == id){
               if(i == 0){
                pedidos.shift()
               }else if(i == pedidos[i].length -1){
                   pedidos.pop();
               }else{
                   var arrAuxInit = pedidos.slice(0,i);
                   var arrAuxEnd = pedidos.slice(i+1);
                   pedidos = arrAuxInit.concat(arrAuxEnd);
               }
               addData(pedidos);
               if(pedidos.length == 0){
                   document.getElementById("tabelaa").innerHTML = ""
               }
            }
        }
    }
}
function formatValue(value){
    return "R$ "+parseFloat(value).toFixed(2);
}
function saveUpdate(){
    let pedido = readData();

    if(validation(pedido)){
        for(let i =0; i<pedidos.length;i++){
            if(pedidos[i].id == idedicao){
                pedidos[i].nome = pedido.nome;
                pedidos[i].qtdP = pedido.qtdP;
                pedidos[i].qtdM = pedido.qtdM;
                pedidos[i].qtdG = pedido.qtdG;
                idedicao = ""         ;
            }
        }
        addData(pedidos);
        cleanData();
    }   
}
function saveDataStorage(pedidos){
    let jsonPedidos = JSON.stringify(pedidos);

    localStorage.setItem("pedidos", jsonPedidos);
}
function initStorage(){
    let Initpedidos = localStorage.getItem("pedidos");

    if(Initpedidos ){
        pedidos = JSON.parse(Initpedidos);
        
    }
    addData(pedidos);
    
}
initStorage();



