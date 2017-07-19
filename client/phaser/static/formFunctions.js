function showValue(newValue, id)
{
	document.getElementById(id).innerHTML=newValue;
	if(id === 'rangeSpeed'){
		window.ElapsedTime = newValue;
	}
}


function startGame() {
	//TO start Game
}