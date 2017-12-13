$(document).ready(function () {

	var ctx = document.getElementById('carpet').getContext('2d');
	carpet(5, new Rectangle(0, 0, 450, 450), ctx);
	
});

class Rectangle {
	
	constructor(x, y, height, width) {
		this.x = Math.round(x);
		this.y = Math.round(y);
		this.height = Math.round(height);
		this.width = Math.round(width);
	}
	
};

function draw(rect, ctx) {
	ctx.fillStyle = '#000000';
	ctx.fillRect(rect.x, rect.y, rect.height, rect.width);
	ctx.stroke();
}

function carpet(level, rect, ctx) {
	if (level == 0) {
		draw(rect, ctx);
		return;
	}
	
	var height = rect.height / 3,
		width = rect.width / 3,
		x1 = rect.x, x2 = x1 + width,
		x3 = x1 + 2 * width,
		y1 = rect.y, y2 = y1 + height,
		y3 = y1 + 2 * height;

	carpet(level - 1, new Rectangle(x1, y1, width, height), ctx);
	carpet(level - 1, new Rectangle(x2, y1, width, height), ctx);
	carpet(level - 1, new Rectangle(x3, y1, width, height), ctx);
	carpet(level - 1, new Rectangle(x1, y2, width, height), ctx);
	carpet(level - 1, new Rectangle(x3, y2, width, height), ctx);
	carpet(level - 1, new Rectangle(x1, y3, width, height), ctx);
	carpet(level - 1, new Rectangle(x2, y3, width, height), ctx);
	carpet(level - 1, new Rectangle(x3, y3, width, height), ctx);
}
