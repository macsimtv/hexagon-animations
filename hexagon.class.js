class Hexagon {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.hexagonPointsCordinates = [];
        this.circles = [];
        this.isAnimated = false;
        this.isHovered = false;
        this.isClicked = false;
    }

    draw() {
        for (let side = 0; side < 7; side++) {
            this.hexagonPointsCordinates[side] = new PIXI.Point(this.x + this.size * Math.cos(side * 2 * Math.PI / 6), this.y + this.size * Math.sin(side * 2 * Math.PI / 6));
        }

        this.hexagon = new PIXI.Graphics();
        this.hexagon.beginFill(0xffffff);
        this.hexagon.lineStyle(1, 0xFFFFFF);
        this.hexagon.drawPolygon(this.hexagonPointsCordinates);
        this.hexagon.endFill();

        this.hexagon.x = this.x;
        this.hexagon.y = this.y;

        this.hexagon.buttonMode = true;
        this.hexagon.interactive = true;
    }

    drawCircles() {
        for (let corner of this.hexagonPointsCordinates) {
            let pointCoordinate = {
                x: corner.x,
                y: corner.y
            }

            // Draw circle
            let circle = new PIXI.Graphics();
            circle.beginFill(0xff0000);
            circle.drawCircle(pointCoordinate.x, pointCoordinate.y, 5);
            circle.endFill();
            this.circles.push(circle);
        }
    }        
}