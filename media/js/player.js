function AbstractDrower() {

};

AbstractDrower.prototype.getContext = function () {
    var context = document.getElementById("example").getContext("2d");
    return function () {
        return context;
    }
};

function Point(x, y) {
    this.x = x;
    this.y = y;
    this.color = getColor();

};

Point.prototype = Object.create(
    AbstractDrower.prototype, {
        constructor: {
            value: Point,
            writable: true,
            enumerable: true,
            configurable: true
        },
        radius: {
            value: 4,
            writable: true
        },
        drow: {
            value: function () {
                var context = this.getContext();
                context().beginPath();
                context().arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
                context().fillStyle = this.color;
                context().fill();
            }
        }
    }
);

function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = getColor();
};

Circle.prototype = Object.create(
    Point.prototype, {
        constructor: {
            value: Circle,
            writable: true,
            enumerable: true,
            configurable: true
        }
    }
);

function changeColor() {
    var finalcolor = document.getElementsByClassName('final-color');
    finalcolor[0].style = 'background-color: ' + getColor() + ';';
}
function getColor() {
    var red = document.getElementById("color-picker-red").value;
    var green = document.getElementById("color-picker-green").value;
    var blue = document.getElementById("color-picker-blue").value;
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
}



function init() {
    var startdrow = false;
    var startX, startY;
    var cirkle = 0;
    document.getElementById("example").addEventListener('mousedown', function (event) {
        startdrow = true;
        startX = event.offsetX;
        startY = event.offsetY;
    });
    document.getElementById("example").addEventListener('mouseup', function (event) {
        startdrow = false;
    });
    document.getElementById("example").addEventListener('mousemove', function (event) {
        if (!cirkle) {
            if (startdrow) {
                var mouseX = event.offsetX;
                var mouseY = event.offsetY;
                var point = new Point(mouseX, mouseY);
                point.drow();
            }
        } else {
            if (startdrow) {
                var mouseX = event.offsetX;
                var mouseY = event.offsetY;
                var circle = new Circle(startX, startY, mouseY - startY)
                circle.drow();
            }
        }
    });
    document.getElementById("color-picker-red").addEventListener(
        'input', changeColor
    );
    document.getElementById("color-picker-green").addEventListener(
        'input', changeColor
    );
    document.getElementById("color-picker-blue").addEventListener(
        'input', changeColor
    );
    document.getElementById("cirk").addEventListener(
        'click', function () {
            cirkle = 1;
        }
    );
    document.getElementById("pen").addEventListener(
        'click', function () {
            cirkle = 0;
        }
    );
}

document.addEventListener("DOMContentLoaded", init);




