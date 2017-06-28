window.onload = function (argument) {
	var btn = document.getElementById('btn');
	btn.addEventListener('click',startup, false);
	var log = document.getElementById('log');

	var el = document.getElementById('canvas');
	startup();
	function startup(){		
		el.addEventListener('touchstart',handleStart, false);
		el.addEventListener('touchend', handleEnd, false);
		el.addEventListener('touchcancel',handleCancel,false);
		el.addEventListener('touchmove', handleMove, false);
	}

	var ongoingTouches = [];

	function handleStart(evt){
		evt.preventDefault();
		var ctx = el.getContext('2d');
		var touches = evt.changedTouches;
console.log(evt.changedTouches);
		for(var i = 0 ; i < touches.length;i++){
			ongoingTouches.push(touches[i] );
			var color = colorForTouch(touches[i]);
			ctx.beginPath();
			ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2*Math.PI, false);
			ctx.fillStyle = color;
			ctx.fill();
		}
		console.log(ongoingTouches);
		var str = '';
		for(var i = 0; i< ongoingTouches.length ;i++){
			str += ongoingTouches[i].identifier +" $$$ ";
		}
		log.innerText = str+ "\n";
	};
	function handleMove(evt){
		evt.preventDefault();
		var ctx = el.getContext('2d');
		var touches = evt.changedTouches;
console.log(evt.changedTouches);
		ctx.lineWidth = 4;

		for(var i =0 ; i< touches.length; i++){
			var color = colorForTouch(touches[i]);
			var idx = ongoingTouchIndexById(touches[i].identifier);

			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
			ctx.lineTo(touches[i].pageX, touches[i].pageY);
			ctx.closePath();
			ctx.stroke();
			ongoingTouches.splice(idx, 1, touches[i]);
		}
		console.log(ongoingTouches);
		var str = '';
		for(var i = 0; i< ongoingTouches.length ;i++){
			str += ongoingTouches[i].identifier +" %%%% ";
		}
		log.innerText = str+"\n";
	};
	function handleEnd(evt){
		evt.preventDefault();
		var ctx = el.getContext('2d');
		var touches = evt.changedTouches;
console.log(evt.changedTouches);
		ctx.lineWidth = 4;

		for( var i =0 ; i< touches.length; i++){
			var color = colorForTouch(touches[i]);
			var idx = ongoingTouchIndexById(touches[i].identifier);

			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
			ctx.lineTo(touches[i].pageX, touches[i].pageY);
			ongoingTouches.splice(i,1);

		}
	};
	function handleCancel(evt){
		evt.preventDefault();
		var touches = evt.changedTouches;

		for(var i =0; i < touches.length; i++){
			ongoingTouches.splice(i,1);
		}
	}
	
//----------------------------------------------
function colorForTouch(touch){
	var id = touch.identifier;
	id = id.toString(16);
	return '#'+id + id +id;
}
function ongoingTouchIndexById(idToFind){
	for(var i = 0; i<ongoingTouches.length; i++){
		var id = ongoingTouches[i].identifier;
		if(id == idToFind){
			return i;
		}
	}
	return -1;
};


//
var bodys = document.getElementsByTagName('body')[0];
	bodys.addEventListener('touchmove',function(evt){
		
		//console.log(evt.changedTouches);
		
	},false);

};