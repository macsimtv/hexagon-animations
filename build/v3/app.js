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

    makePoints() {
        for (let side = 0; side < 6; side++) {

            let size = this.size;

            let angle_deg = 60 * side - 30
            let angle_rad = Math.PI / 180 * angle_deg

            let x = this.x + size * Math.cos(angle_rad);
            let y = this.y + size * Math.sin(angle_rad);

            let circle = new HexagonTwoPoint(x, y);

            this.app.stage.addChild(circle.getCircle());
            this.circles.push(circle);
        }
    }

    makeCursor() {
        this.cursor = new PIXI.Sprite(PIXI.Texture.from("../../assets/img/angryimg.png"));

        const cursorSize = this.size * 3;

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
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.isMagnetic = false;
        this.isAnimated = false;

        this.circle = new PIXI.Graphics();
        this.line = new PIXI.Graphics();

        this.anchor = {
            x: this.x,
            y: this.y
        };

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

        this.circle.zIndex = 10;
    }

    drawLine(x1, y1, x2, y2, alpha = 1) {
        // Grey line
        this.line.lineStyle(1, 0xcccccc, alpha);
        this.line.moveTo(x1, y1);
        this.line.lineTo(x2, y2);

        this.line.alpha = alpha;

        this.line.zIndex = 5;
    }

    clearLine() {
        this.line.clear();
    }

    animate() {
        if(!this.isAnimated && !this.isMagnetic) {
            const duration = 5;
            const random = 15;

            this.isAnimated = true;

            gsap.to(this.circle, {
                x: `random(${this.x - random}, ${this.x + random})`,
                y: `random(${this.y - random}, ${this.y + random})`,
                duration: duration,
                ease: Linear.easeInOut,
            });

            setTimeout(() => {
                this.isAnimated = false;
            }, duration * 1000);
        } else if (this.isMagnetic) {
            // Magnetic effet to the cursor with the anchor point
            
        }
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

for (let i = 0; i < app.renderer.width / (size * 3); i++) {
    for (let j = 0; j < app.renderer.height / (size * 3); j++) {
        if(j % 2 == 0) {
            hexagons.push(new HexagonTwo(x + i * (size * 3), y + j * (size * 3), size, app));
        } else {
            hexagons.push(new HexagonTwo(x + (i * size * 3) + size * 1.5, y + (j * size * 3), size, app));
        }
    }
}

hexagons[0].makeCursor();