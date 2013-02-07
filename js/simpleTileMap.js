window.onload = function() {

	var tileMap = [],
		tile = {
			width: 32,
			height: 32
		},
		grid = {
			width: 2500,
			height: 2500
		},
		Keys = {
			UP: 38,
			DOWN: 40,
			LEFT: 37,
			RIGHT: 39
		},
		scroll = {
			x: 0,
			y: 0
		},
		canvas,
		c;

	canvas = document.getElementById("myCanvas");
	c = canvas.getContext("2d");

	canvas.addEventListener("click", handleClick, false);
	window.addEventListener("keydown", handleKeyDown, false);

	draw();

	function handleClick(e) {
		var row,
			column;

		row = Math.floor((e.clientX + scroll.x) / tile.width);
		column = Math.floor((e.clientY + scroll.y) / tile.height);

		if(tileMap[row] == null) {
			tileMap[row] = [];
		}
		tileMap[row][column] = 1;
	}

	function handleKeyDown(e) {
		
		switch(e.keyCode) {
			case Keys.UP:
				scroll.y -= ((scroll.y - tile.height) >= 0) ? tile.height : 0;
				break;
			case Keys.DOWN:
				scroll.y += tile.height;
				break;
			case Keys.LEFT:
				scroll.x -= ((scroll.x - tile.width) >= 0) ? tile.width : 0;
				break;
			case Keys.RIGHT:
				scroll.x += tile.width;
				break;
		}

		document.getElementById("scrollx").innerHTML = scroll.x;
		document.getElementById("scrolly").innerHTML = scroll.y;
	}

	function draw() {

		var startRow,
			startCol,
			rowCount,
			colCount,
			tilePositionX,
			tilePositionY;

		c.fillStyle = "#ffffff";
		c.fillRect(0, 0, canvas.width, canvas.height);
		c.fillStyle = "#000000";

		startRow = Math.floor(scroll.x / tile.width);
		startCol = Math.floor(scroll.y / tile.height);
		rowCount = startRow + Math.floor(canvas.width / tile.width) + 1;
		colCount = startCol + Math.floor(canvas.height / tile.height) + 1;

		rowCount = ((startRow + rowCount) > grid.width) ? grid.width : rowCount;
		colCount = ((startCol + colCount) > grid.height) ? grid.height : colCount;

		for(var row = startRow; row < rowCount; row++) {
			for(var col = startCol; col < colCount; col++) {
				tilePositionX = tile.width * row;
				tilePositionY = tile.height * col;

				tilePositionX -= scroll.x;
				tilePositionY -= scroll.y;

				if(tileMap[row] != null && tileMap[row][col] != null) {
					c.fillStyle = "#cc0000";
					c.fillRect(tilePositionX, tilePositionY, tile.width, tile.height);
					c.fillStyle = "#000000";
				} else {
					if((row % 2) == 0 && (col % 2) == 0) {
						c.strokeRect(tilePositionX, tilePositionY, tile.width, tile.height);
					} else {
						c.fillRect(tilePositionX, tilePositionY, tile.width, tile.height);
					}
				}
			}
		}

		setTimeout(draw, 1);
	}

}