window.onload = function () {	
	carregarDatasLocalStorage();
	document.getElementById("btbAddDia").onclick = function(){
		var vdataFinal = new Date(document.getElementById("dataFinal").value);
		var vdataInicio = new Date();
		var DataContagem = {
			id: vdataInicio.getTime(), // ID == milisegundos desde Jan 1, 1970
			diaInicio: vdataInicio.getDate(),
			mesInicio: vdataInicio.getMonth(),
			anoInicio: vdataInicio.getFullYear(),
			diaFinal: vdataFinal.getDate(), 
			mesFinal: vdataFinal.getMonth(), 
			anoFinal: vdataFinal.getFullYear(),
			getDI : function() {
				//Obtem um objeto com o dia Dia Inicial
				var DiaInicio={
					dia: this.diaInicio,
					mes: this.mesInicio,
					ano: this.anoInicio
				}
				return DiaInicio;
			},
			getDF : function() {
				//Obtem um objeto com o dia Dia Final
				var DiaFinal={
					dia: this.diaFinal,
					mes: this.mesFinal,
					ano: this.anoFinal
				}
				return DiaFinal;
			}
		};
		gravarLocalStorage(DataContagem);
		carregarHTMLData(DataContagem);
	}
}

function carregarDatasLocalStorage () {
	try {
		var datasLocalStorage = localStorage.getItem("DatasGravadas");
		var datasString = datasLocalStorage.split(" ");
		for(var i=0; i < datasString.length; i++){	 
			carregarHTMLData(JSON.parse(datasString[i]));		
		}
	} catch(e) {
		console.log("Ainda não possuí datas adicionadas");
	}	
}

function carregarHTMLData (ObjData) {
	
	var conteinerDatas = document.getElementById("conteinerDatas");
	var newcard = document.createElement('div');
	newcard.className = "cardTempo mdl-card";
	newcard.id = "card-" + ObjData.id;
	conteinerDatas.appendChild(newcard);

	var excluir = document.createElement('div');
	excluir.className = "excluir";
	newcard.appendChild(excluir);

	var btnExluir = document.createElement('BUTTON');
	btnExluir.className = "mdl-button mdl-js-button mdl-button--icon floatRight";
	btnExluir.value = "exc-" + ObjData.id;
	btnExluir.onclick = function() {
		conteinerDatas.removeChild(document.getElementById("card-" + ObjData.id));
		removerLocalStorage(ObjData.id);

	}
	excluir.appendChild(btnExluir);


	// document.getElementById("btbremoveDia").onclick = function () {
	// 	var rmv = document.getElementById("btbremoveDia").value;
	// 	removerLocalStorage(rmv);
	// }

	var btnIcon = document.createElement("I")
	var iconvalue = document.createTextNode("remove");
	btnIcon.className = "material-icons";
	btnIcon.appendChild(iconvalue);
	btnExluir.appendChild(btnIcon);

	var tempoRestante = document.createElement('div');
	tempoRestante.className = "tempoRestante";
	newcard.appendChild(tempoRestante);

	var tempo = document.createElement('div');
	tempo.className = "tempo";
	tempoRestante.appendChild(tempo);

	var textoTempoRestante = document.createElement("H1");
	var textoH1TempoRestante = document.createTextNode(
		CalcularTempoRestante(ObjData)		
	); // Dias Restantes Valor
	textoTempoRestante.appendChild(textoH1TempoRestante);	
	textoTempoRestante.className = "textoTempoRestante";
	tempo.appendChild(textoTempoRestante);

	var datasInicialFinal = document.createElement('div');
	datasInicialFinal.className = "datasInicialFinal";
	newcard.appendChild(datasInicialFinal);

	var dateInicialCard = document.createElement("P")
	var dataInicialText = document.createTextNode(ObjData.diaInicio + "/" + (ObjData.mesInicio+1) + "/" + ObjData.anoInicio); // Data Inicial Card
	dateInicialCard.className = "floatLeft";
	dateInicialCard.appendChild(dataInicialText);
	datasInicialFinal.appendChild(dateInicialCard);

	var dateInicialCard = document.createElement("P")
	var dataInicialText = document.createTextNode(ObjData.diaFinal + "/" + (ObjData.mesFinal+1) + "/" + ObjData.anoFinal); // Data Inicial Card
	dateInicialCard.className = "floatRight";
	dateInicialCard.appendChild(dataInicialText);
	datasInicialFinal.appendChild(dateInicialCard);

	var datasInicialFinal = document.createElement('div');
	datasInicialFinal.className = "datasInicialFinal";
	newcard.appendChild(datasInicialFinal);

	var progresso = document.createElement('div');
	progresso.className = "progresso";
	newcard.appendChild(progresso);

	var progressoBarra = document.createElement('div');
	progressoBarra.className = "progressoBarra";
	progressoBarra.id = "bar" + ObjData.id;
	progresso.appendChild(progressoBarra);
}

function CalcularTempoRestante(ObjData) {
	var tempo = calcularDiferencaDatas (ObjData.anoInicio, ObjData.mesInicio, ObjData.diaInicio,ObjData.anoFinal, ObjData.mesFinal, ObjData.diaFinal);
	if (tempo > 1) {
		return tempo + " Dias";
	}else if (tempo == 0) {
		return "Chegou o dia";
	}else{
		return "Passou o dia";
	}
}


function gravarLocalStorage (Objeto) {
	var objeto = JSON.stringify(Objeto);
	if (localStorage.getItem("DatasGravadas")) {
		var Datas = localStorage.getItem("DatasGravadas");
		Datas += " " + objeto;
		localStorage.setItem("DatasGravadas", Datas);
	}else{
		localStorage.setItem("DatasGravadas", objeto);
	}
}

function removerLocalStorage (idObjeto) {
	try {
		var datasGravadasString = localStorage.getItem("DatasGravadas");
		var datasGravadasSplit = datasGravadasString.split(" ");
		for(var i = 0;i < datasGravadasSplit.length;i++){
			if(idObjeto == datasGravadasSplit[i].substring(6, 19)) {
				console.log("Achou o objeto", idObjeto);
				datasGravadasSplit.splice(i, 1);
			}else{
				console.log("Não achou o objeto" + i + " - " + datasGravadasSplit[i].substring(6, 19));
			}	
		}
		console.log(datasGravadasSplit.toString());
		localStorage.setItem("DatasGravadas", datasGravadasSplit.toString().replace(/},{/gi,"} {"));
	}catch(e) {
		console.log("idObjeto incorreto, impossível remover");
	}	
}

function getDiaAtual() {
	var dia = new Date();
	var diaAtual = {
		dia: dia.getDate(), 
		mes: dia.getMonth(), 
		ano: dia.getFullYear()
	};
	return DiaAtual;
}

function calcularDiferencaDatas (DiaFinalc, DiaAtualc) {
	var DiaFinal = new Date(DiaFinalc.ano, DiaFinalc.mes, DiaFinalc.dia);
	var DiaAtual = new Date(DiaAtualc.ano, DiaAtualc.mes, DiaAtualc.dia);
	return Math.floor ((DiaFinal - DiaAtual) / (1000 * 60 * 60 * 24))
}

function calcularDiferencaDatas (DAtualAno, DAtualMes, DAtualDia,DFinalAno, DFinalMes, DFinalDia) {
	var DiaFinal = new Date(DFinalAno, DFinalMes, DFinalDia);
	var DiaAtual = new Date(DAtualAno, DAtualMes, DAtualDia);
	return Math.floor ((DiaFinal - DiaAtual) / (1000 * 60 * 60 * 24))
}

