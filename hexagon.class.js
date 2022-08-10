class Hexagon {
    constructor(x, y, size, frame, app) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.hexagonPointsCordinates = [];
        this.circles = [];

        this.isAnimated = true;
        this.isHovered = false;
        this.isClicked = false;

        this.hexagon;
        this.container;

        this.frame = frame;
        this.app = app;

        this._init();
    }

    _init() {

        this.container();
        this.draw();
        this.app.ticker.add(this.animate.bind(this));
    }

    container() {
        // Create container
        this.container = new PIXI.Container();
        this.frame.addChild(this.container);
    }

    draw() {
        for (let side = 0; side < 6; side++) {
            this.hexagonPointsCordinates[side] = new PIXI.Point(this.x + this.size * Math.cos(side * 2 * Math.PI / 6), this.y + this.size * Math.sin(side * 2 * Math.PI / 6));
        }

        this.hexagon = new PIXI.Graphics();
        this.hexagon.lineStyle(1, 0x7a736a);
        this.hexagon.drawPolygon(this.hexagonPointsCordinates);
        this.hexagon.endFill();

        this.hexagon.x = this.x;
        this.hexagon.y = this.y;

        this.hexagon.buttonMode = true;
        this.hexagon.interactive = true;

        this.drawCircles();
        this.addToFrame();
    }

    drawCircles() {
        for (let corner of this.hexagonPointsCordinates) {
            let pointCoordinate = {
                x: corner.x,
                y: corner.y
            }

            // Draw circle
            let circle = new PIXI.Graphics();
            circle.beginFill(0xbbbab7);
            circle.drawCircle(pointCoordinate.x, pointCoordinate.y, 2);
            circle.endFill();

            this.circles.push(circle);
        }
    }  
    
    addToFrame() {
        this.container.addChild(this.hexagon);

        for (let circle of this.circles) {
            this.container.addChild(circle);
        }
    }

    animate() {
        if (!this.isAnimated) {
            return;
        }
    }
}