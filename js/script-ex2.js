window.onload = function() {

	var canvas 		= document.getElementById("myCanvas"),
		c 			= canvas.getContext("2d"),
		fpsArray 	= [],
		fpsCount 	= 0,
		stopAt 		= 10,
		fps 		= 0,
		startTime 	= 0,
		date 		= new Date();

	startTime = Math.round(date.getTime() / 1000);

	c.font = "20px _sans";

	draw(startTime);

	function draw(timeStamp) {
		var date = new Date();
		ts = Math.round(date.getTime() / 1000);

		if(timeStamp !== ts) {
			fps = fpsCount;
			fpsCount = 0;
			fpsArray.push(fps);
		} else {
			fpsCount++;
		}

		c.fillStyle = "#000000";
		c.fillRect(0, 0, canvas.width, canvas.height);

		c.fillStyle = "#ffffff";
		c.fillText("TS: " + timeStamp, 10, 20);
		c.fillText("FPS: " + fps, 10, 40);

		if(timeStamp <= (startTime + stopAt)) {
			setTimeout(function(){ draw(ts); }, 1);
		} else {
			showResults(c, canvas);
		}
	}

	function showResults() {
		var mean = 0,
			sum = 0;

		c.fillStyle = "#ffffff";
		c.fillRect(0, 0, canvas.width, canvas.height);

		// sort the samples
		for (var i = 0; i < fpsArray.length; i++) {
			for (var j = fpsArray.length - 1; j > i; j--) {
				if (fpsArray[j - 1] > fpsArray[j]) {
					fpsArray[j - 1] = fpsArray[j];
				}
			}
		}

		// discard the first value
		fpsArray = fpsArray.slice(1, fpsArray.length);

		for(var i = 0; i < fpsArray.length; i++) {
			sum = sum + fpsArray[i];
		}

		mean = sum / fpsArray.length;

		c.fillStyle = "#000000";
		c.fillText("MIN: " + fpsArray[0], 10, 20);
		c.fillText("MAX: " + fpsArray[fpsArray.length - 1], 10, 40);
		c.fillText("MEAN: " + (Math.round(mean * 10) / 10), 10, 60);
	}
}