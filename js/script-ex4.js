window.onload = function() {
	var preview  = document.getElementById("preview"),
		r        = document.getElementById("r"),
		g        = document.getElementById("g"),
		b        = document.getElementById("b"),
		a        = document.getElementById("a"),
		mx       = document.getElementById("mx"),
		my       = document.getElementById("my"),
		canvas   = document.getElementById("myCanvas"),
		c        = canvas.getContext("2d"),
		building = new Image();

	building.src = "img/cinema.png";

	canvas.addEventListener("mousemove", move, false);

	draw();

	function draw() {
		c.drawImage(building, 0, 0, canvas.width, canvas.height);
	}

	function move(e) {
		var img = c.getImageData(e.clientX, e.clientY, 1, 1),
			idata,
			red,
			green,
			blue,
			alpha,
			rgba;

		my.innerHTML = e.clientX;
		mx.innerHTML = e.clientY;

		idata = img.data;

		red   = idata[0];
		green = idata[1];
		blue  = idata[2];
		alpha = idata[3];

		r.innerHTML = red;
		g.innerHTML = green;
		b.innerHTML = blue;

		a.innerHTML = (alpha > 0) ? alpha : "Transparent";

		rgba = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";

		preview.style.backgroundColor = rgba;
	}
}