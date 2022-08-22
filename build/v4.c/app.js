class HexagonTwo {
    constructor(x, y, size, app) {
        this.x = x;
        this.y = y;

        this.size = size;

        this.circles = [];
        this.cursor;

        this.app = app;

        this._init();
    }

    _init() {    
        this.makePoints();
        this.app.ticker.add(this.animate.bind(this));
    }

    makeCursor() {
        this.cursor = new PIXI.Sprite(PIXI.Texture.from("../../assets/img/angryimg.png"));

        const cursorSize = this.size * 25;

        this.cursor.width = cursorSize;
        this.cursor.height = cursorSize;

        this.cursor.zIndex = 100;

        this.app.stage.addChild(this.cursor);
        this.app.stage.interactive = true;


        this.app.stage.on('mousemove', (e) => {
            this.cursor.position.x = e.data.global.x - this.cursor.width / 2;
            this.cursor.position.y = e.data.global.y - this.cursor.height / 2;
        });

        this.app.stage.mask = this.cursor;
    }

    makePoints() {
        for (let side = 0; side < 6; side++) {

            let size = this.size;

            let angle_deg = 60 * side - 30
            let angle_rad = Math.PI / 180 * angle_deg

            let x = this.x + size * Math.cos(angle_rad);
            let y = this.y + size * Math.sin(angle_rad);

            let circle = new HexagonTwoPoint(x, y, this.app);

            this.app.stage.addChild(circle.getCircle());
            this.circles.push(circle);
        }
    }

    setPointer(cursor) {
        this.cursor = cursor;
    }

    animate() {
        for(let circle of this.circles){
            circle.clearLine();
        }

        // Get cursor position
        let cursor = this.app.renderer.plugins.interaction.mouse.global;
        
        // Draw lines between all points
        for(let circleIndex in this.circles) {
            let circle = this.circles[circleIndex];
            let circle2 = this.circles[circleIndex == (Number(this.circles.length) - 1) ? 0 : Number(circleIndex) + 1];
            
            circle.drawLine(circle.getCircle().x, circle.getCircle().y, circle2.getCircle().x, circle2.getCircle().y);
            this.app.stage.addChild(circle.getLine());
        }


        for(let circle of this.circles) {
            circle.animate();
        }
    }

    static getDistance(x1, y1, x2, y2){
        let y = x2 - x1;
        let x = y2 - y1;
        
        return Math.sqrt(x * x + y * y);
    }

    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
}

class HexagonTwoPoint {
    constructor(x, y, app) {
        this.x = x;
        this.y = y;
        this.x2;
        this.y2;

        this.isMagnetic = false;
        this.isAnimated = false;

        this.circle = new PIXI.Graphics();
        this.line = new PIXI.Graphics();

        this.anchor = {
            x: this.x,
            y: this.y
        };

        this.app = app;

        this._init();
    }

    set setIsMagnetic(value) {
        this.isMagnetic = value;
    }

    set setIsAnimated(value) {
        this.isAnimated = value;
    }

    getCircle() {
        return this.circle;
    }

    getLine() {
        return this.line;
    }

    _init() {
        this.anchor = new PIXI.Point(this.x, this.y);

        this.circle.x = this.x;
        this.circle.y = this.y;

        this.circle.beginFill(0xffffff);
        this.circle.drawCircle(0, 0, 2);
        this.circle.endFill();

        this.circle.alpha = 1;

        this.circle.zIndex = 10;
    }

    drawLine(x1, y1, x2, y2, alpha = 1, zIndex = 5) {
        this.x2 = x2;
        this.y2 = y2;
        // Grey line
        this.line.lineStyle(1, 0xcccccc, alpha);
        this.line.moveTo(x1, y1);
        this.line.lineTo(x2, y2);

        this.line.zIndex = zIndex;
    }

    clearLine() {
        this.line.clear();
    }

    animate() {
    }
}

// Canva
const canvas = document.getElementById('graphic');

// View
const ratio = 1;

let _w = window.innerWidth;
let _h = window.innerHeight;

const app = new PIXI.Application({
    view: canvas,
    width: _w * ratio,
    height: _h * ratio,
    sortableChildren: true,
    // transparent: true,
});

// Resize
window.addEventListener('resize', () => {
    _w = window.innerWidth;
    _h = window.innerHeight;
    app.renderer.resize(_w / ratio, _h / ratio);
});

const size = 50;

const x = 0;
const y = 0 + size + size / 2;


const hexagons = [];
const space = size * 2.5;

for (let i = 0; i < app.renderer.width / (space); i++) {
    for (let j = 0; j < app.renderer.height / (space); j++) {
        if(j % 2 == 0) {
            hexagons.push(new HexagonTwo(x + i * (space), y + j * (space), size, app));
        } else {
            hexagons.push(new HexagonTwo(x + (i * space) + size, y + (j * space), size, app));
        }
    }
}

hexagons[0].makeCursor();