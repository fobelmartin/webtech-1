function testForMinus(input){
	var cislo = document.getElementById(input);
	if(cislo.value<0){
		alert("Zadali ste záporne číslo!");
		cislo.value=(-cislo.value);

	}
}

function testForOrder(){
	var zaci=document.getElementById("zaciatok");
	var kone=document.getElementById("koniec");
	if(Number(kone.value)<Number(zaci.value)){
		alert("Začiatočná hodnota je vyššia ako konečná");
		var tmp=zaci.value;
		zaci.value=kone.value;
		kone.value=tmp;
	}
}
function testForMinMax(){
	var zaci=document.getElementById("zaciatok");
	var kone=document.getElementById("koniec");
	if(Number(kone.value)<5){
		alert("Minimálna hodnota pre konečnú hodnotu je 5");
		kone.value=5;
	}
	if(Number(kone.value)>89000000 || Number(zaci.value)>89000000){
		alert("Maximálna povolená hodnota je 89 000 000");
		zaci.value=0;
		kone.value=100;
	}
}
function runAllTests(){
	testForMinus('zaciatok');
	testForMinus('koniec');
	testForOrder();
	testForMinMax();
}

var w;
var text=[];
var stav=[];




function startWorker() {
	if(typeof(Worker) !== "undefined") {
		if(typeof(w) == "undefined") {
			runAllTests();
			w = new Worker("worker.js");
			var inputs=[];
			var zac=document.getElementById("zaciatok").value;
			var kon=document.getElementById("koniec").value;
			inputs.push(zac);
			inputs.push(kon);
			document.getElementById("puttext").innerHTML = "" ;
			w.postMessage(inputs);
		}
		w.onmessage = function (event) {
			if((event.data[0]=="P") || (event.data[0]=="F") || (event.data[0]=="D")){
				document.getElementById("stav").innerHTML = event.data;

			}

			else if(event.data=="Koniec"){
				document.getElementById("puttext").innerHTML = text.join(' ');
				document.getElementById("stav").innerHTML = event.data;
				console.log("Terminated");
				text=[];
				w.terminate();
				w = undefined;

			}
			else{
				text.push(event.data);
    }

};
} else {
	document.getElementById("puttext").innerHTML = "...";
}
}



