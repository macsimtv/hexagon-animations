class Hexagon {
    constructor(x, y, size, app) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.polygonPointsCordinates = [];
        this.circles = [];

        this.isAnimated = false;
        this.isHovered = false;
        this.isClicked = false;

        this.container;

        this.hexagonContainer;
        this.hexagon;
        this.strokes = [];
        this.strokesContainer;


        this.cursor;
        this.cursorEvent;

        this.app = app;

        this._init();
    }

    _init() {
        this.container();
        this.draw();
        this.app.ticker.add(this.animate.bind(this));
        this.isAnimated = true;
    }
    
    container() {
        // Create container
        this.container = new PIXI.Container();
        this.container.sortableChildren = true;
        
        this.hexagonContainer = new PIXI.Container();
        this.hexagonContainer.zIndex = 5;
        this.container.addChild(this.hexagonContainer);
        
        this.strokesContainer = new PIXI.Container();
        this.strokesContainer.zIndex = 2;
        this.container.addChild(this.strokesContainer);
        
        this.app.stage.addChild(this.container)
    }

    draw() {
        for (let side = 0; side < 6; side++) {

            let size = this.size;

            var angle_deg = 60 * side - 30
            var angle_rad = Math.PI / 180 * angle_deg

            this.polygonPointsCordinates[side] = new PIXI.Point(0 + size * Math.cos(angle_rad), 0 + size * Math.sin(angle_rad))
        }

        this.hexagon = new PIXI.Graphics();
        this.hexagon.beginFill(0x00000000);
        this.hexagon.lineStyle(1, 0x7a736a);
        this.hexagon.drawPolygon(this.polygonPointsCordinates);
        this.hexagon.endFill();

        this.hexagon.buttonMode = true;
        this.hexagon.interactive = true;

        this.hexagon.zIndex = 1;

        this.hexagon.on('mouseover', (e) => {
            this.isHovered = true;
            this.cursorEvent = e;
        });

        this.hexagon.on('mouseout', (e) => {
            this.isHovered = false;
            this.cursorEvent = e;
        });

        this.drawCircles();
        this.drawBars();
        this.addToFrame();
    }

    makeCursor() {
        this.cursor = new PIXI.Graphics();
        this.cursor.moveTo(0, 0);

        let canvas = document.createElement('canvas');
        canvas.width  = 200;
        canvas.height = 200;
        let ctx = canvas.getContext('2d');
        let gradient = ctx.createLinearGradient(0, 0, 0, 50);
        gradient.addColorStop(0, "#D3872A");
        gradient.addColorStop(1, "#CFB732");
        ctx.fillStyle = gradient;
        this.cursor = new PIXI.Sprite(PIXI.Texture.from("../../assets/img/angryimg.png"));

        // this.cursor.drawCircle(0, 0, 100);

        this.cursor.zIndex = 100;
        // Center cursor

        this.app.stage.addChild(this.cursor);
        this.app.stage.interactive = true;

        this.app.stage.on('mousemove', (e) => {
            this.cursor.position.x = e.data.global.x - this.cursor.width / 2;
            this.cursor.position.y = e.data.global.y - this.cursor.height / 2;
        });

        this.app.stage.mask = this.cursor;
    }

    drawBars() {
        this.strokes = [];

        for (let corner of this.polygonPointsCordinates) {            
            let pointCoordinate = {
                x: corner.x,
                y: corner.y
            }

            // Draw stroke
            let stroke = new PIXI.Graphics();
            stroke.lineStyle(1, 0x7a736a);
            stroke.moveTo(this.hexagonContainer.position.x, this.hexagonContainer.position.y);
            stroke.lineTo(pointCoordinate.x, pointCoordinate.y);
            stroke.zIndex = 2;
            this.strokes.push(stroke);
        }

        for (let stroke of this.strokes) {
            this.strokesContainer.addChild(stroke);
        }
    }

    drawCircles() {
        for (let corner of this.polygonPointsCordinates) {
            let pointCoordinate = {
                x: corner.x,
                y: corner.y
            }

            // Draw circle
            let circle = new PIXI.Graphics();
            circle.beginFill(0xbbbab7);
            circle.drawCircle(pointCoordinate.x, pointCoordinate.y, 2);
            circle.endFill();

            circle.zIndex = 2;

            this.circles.push(circle);
        }
    }  
    
    addToFrame() {
        this.hexagonContainer.addChild(this.hexagon);

        for (let circle of this.circles) {
            this.hexagonContainer.addChild(circle);
        }

        this.container.x = this.x;
        this.container.y = this.y;
    }

    animate() {
        if(this.isHovered) {
            this.isAnimated = true;
            TweenMax.to(this.hexagonContainer.scale, 1, { x: .9, y: .9, ease: Power2.easeOut });
            TweenMax.to(this.hexagonContainer.position, .5, { x: this.cursorEvent.data.global.x - this.container.x, y: this.cursorEvent.data.global.y - this.container.y, ease: Power2.easeOut });

            for (let stroke of this.strokes) {
                stroke.clear();
            }

            this.drawBars();

            if(this.hexagonContainer.position.x > this.hexagonContainer.width / 2 || this.hexagonContainer.position.x < -this.hexagonContainer.width / 2 || this.hexagonContainer.position.y > this.hexagonContainer.height / 2 || this.hexagonContainer.position.y < -this.hexagonContainer.height / 2) {
                this.isHovered = false;
            }

            this.isAnimated = false;
        } else if(!this.isHovered) {
            this.isAnimated = true;
            TweenMax.to(this.hexagonContainer.scale, 1, { x: 1, y: 1, ease: Power2.easeOut });
            TweenMax.to(this.hexagonContainer.position, 1, { x: 0, y: 0, ease: Power2.easeOut });
            
            
            if(!this.isAnimated) {
                for (let stroke of this.strokes) {
                    stroke.clear();
                }

                this.drawBars();
            }
            
            this.isAnimated = false;
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

const space = size * 2;

for (let i = 0; i < app.renderer.width / space; i++) {
    for (let j = 0; j < app.renderer.height / space; j++) {
        if(j % 2 == 0) {
            hexagons.push(new Hexagon(x + i * space, y + j * space, size, app));
        } else {
            hexagons.push(new Hexagon(x + (i * space) + size * 1.5, y + (j * space), size, app));
        }
    }
}

hexagons[0].makeCursor();

// Animation
app.ticker.add(animate);

function animate() {

}