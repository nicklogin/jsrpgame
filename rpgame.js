//Проект;
//RPG со случайно генерируемыми подземельями
//2 типа клеток - белые(проходимые) и чёрные(непроходимые);
//герой - спрайт Линка из Зельды;
//2-3 типа монстров;
//сражения с монстрами на новом экране;
//узнать, можно ли авто-скроллить canvas;
//если нет - каждый раз заполнять его заново, когда нужно скроллить;
//досмотреть видео на своей странице про Creating a game in HTML5;

//Программа максимум на 10.02:
//создать объект Field;
//создать объект camera - атрибут объекта Field;

function cellCoords(width, height, wcells, hcells) {
	//console.log(width, height, wcells, hcells);
	var cellWidth = width/wcells;
    var cellHeight = height/hcells;
    var i = 0;
    var j = 0;
    var coords = [];
	//console.log(i, width, j, height);
    while (j<height) {
    	i = 0;
        while (i<width) {
        	coords.push([i,j]);
            i += cellWidth;
        }
        j += cellHeight;
    }
	//console.log(coords);
	return {
    	coords: coords,
        cellWidth: cellWidth,
        cellHeight: cellHeight
    };
}

function createField(elemId) {
	console.log("Entered field-creating function");
	var pxWidth = parseInt(document.getElementById(elemId).width);
	var pxHeight = parseInt(document.getElementById(elemId).height);
	var ctx = document.getElementById(elemId).getContext("2d");
	var width = 16;
	var height = 9;
	var map0 = [
	[0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0],
	[0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1],
	[0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
	[1,0,0,1,1,1,1,1,0,1,1,1,0,0,1,1],
	[1,0,0,1,1,1,1,1,0,1,1,1,0,0,1,1],
	[1,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1],
	[1,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1],
	[1,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1]
	];
	Field = {
	width: width,
	height: height,
	pxWidth: pxWidth,
	pxHeight: pxHeight,
	ctx: ctx,
	grid: cellCoords(pxWidth, pxHeight, width, height),
	map: map0,
	showGrid: function () {
		//console.log(this.grid.coords);
		for (i in this.grid.coords) {
			this.ctx.beginPath();
			this.ctx.rect(this.grid.coords[i][0],this.grid.coords[i][1],this.grid.cellWidth,this.grid.cellHeight);
			this.ctx.stroke();
		};
		console.log("the grid is displayed now");
	},
	renderMap: function () {
		for (i in this.map) {
			for (j in this.map[i]) {
				if (this.map[i][j]==1) {
					//console.log(i,j,this.grid.cellWidth*i, this.grid.cellHeight*j);
					this.ctx.fillRect(this.grid.cellWidth*j, this.grid.cellHeight*i, this.grid.cellWidth, this.grid.cellHeight);
				}
			}
		}
	},
	placeImage: function (img,x,y) {
		console.log(img.src, this.grid.cellWidth*x, this.grid.cellHeight*y, this.grid.cellWidth, this.grid.cellHeight);
		this.ctx.drawImage(img, this.grid.cellWidth*x, this.grid.cellHeight*y, this.grid.cellWidth, this.grid.cellHeight);
	}
	};
	//return Field;
}

function createHero(x,y,imgPath) {
	var heroImage = new Image();
	heroImage.src = imgPath;
	Hero = {
		x: x,
		y: y,
		img: heroImage,
		place: function() {
			Field.placeImage(this.img, this.x, this.y)
		}
	};
	Hero.place();
}

//если будут проблемы с тем, что после запуска игры мы всё время находимся в функции Main,
//раскомменть строку 6 в html, а функцию Main запиши в виде $(document).ready(function() {//код внутри функции Main; })
//(просто не хотел подключать JQuery только ради входа в программу)
function Main() {
	createField("screen");
	Field.renderMap();
	createHero(1,8,'link_enface.jpg');
	//Field.showGrid();
}