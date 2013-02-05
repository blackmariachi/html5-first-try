
window.onload = function() {

	var canvas = document.getElementById("game");
	var c = canvas.getContext("2d");

	var State = {
		_current: 0,
		INTRO: 0,
		LOADING: 1,
		LOADED: 2
	}

	window.addEventListener("click", handleClick, false);
	window.addEventListener("resize", doResize, false);

	doResize();

	function handleClick() {
		State._current = State.LOADING;
		fadeToWhite();
	}

	function doResize() {
		canvas.width = document.body.clientWidth;
		canvas.height = document.body.clientHeight;

		switch(State._current) {
			case State.INTRO:
				showIntro();
				break;
		}
	}

	function showIntro() {
		var phrase = "Click or tap the screen to start the game";

		// clear canvas
		c.clearRect(0, 0, canvas.width, canvas.height);

		// blue gradient
		var grd = c.createLinearGradient(0, 0, canvas.width, canvas.height);
		grd.addColorStop(0, "#ceefff");
		grd.addColorStop(1, "#52bcff");

		c.fillStyle = grd;
		c.fillRect(0, 0, canvas.width, canvas.height);

		var logoImg = new Image();
		logoImg.src = "img/logo.png";

		// store img width
		var orgWidth = logoImg.width;

		// compute new width/height values
		logoImg.width = Math.round((50 * document.body.clientWidth) / 100);
		logoImg.height = Math.round((logoImg.width * logoImg.height) / orgWidth);

		var logo = {
			img: logoImg,
			x: (canvas.width/2) - (logoImg.width/2),
			y: (canvas.height/2) - (logoImg.height/2)
		}

		// present the img
		c.drawImage(logo.img, logo.x, logo.y, logo.img.width, logo.img.height);

		// change colot to black
		c.fillStyle = "#000000";
		c.font = "bold 16px Arial, sans-serif";
		var textSize = c.measureText(phrase);
		var xcoord = (canvas.width / 2) - (textSize.width / 2);
		c.fillText(phrase, xcoord, (logo.y + logo.img.height) + 50);
	}

	function fadeToWhite(alphaVal) {
		var alphaVal = (alphaVal == undefined) ? 0.02 : parseFloat(alphaVal) + 0.02;

		c.fillStyle = "#ffffff";
		c.globalAlpha = alphaVal;

		c.fillRect(0, 0, canvas.width, canvas.height);

		if(alphaVal < 1.0) {
			setTimeout(function() { fadeToWhite(alphaVal); }, 30);
		}
	}
}