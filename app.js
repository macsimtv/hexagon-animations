// Canva
const canvas = document.getElementById('graphic');

// View
const ratio = 1.25;

let _w = window.innerWidth;
let _h = window.innerHeight;

const app = new PIXI.Application({
    view: canvas,
    width: _w / ratio,
    height: _h / ratio,
});

// Container
const container = new PIXI.Container();
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;
app.stage.addChild(container);

// Hexagon
const radius = 20;

let x = 0;
let y = 0;
let size = 25;
let hexagonPointsCordinates = [];

for (let side = 0; side < 7; side++) {
    hexagonPointsCordinates[side] = new PIXI.Point(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
    console.log(hexagonPointsCordinates[side]);
}

const hexagon = new PIXI.Graphics();
hexagon.beginFill(0xffffff);
hexagon.lineStyle(1, 0xFFFFFF);
hexagon.drawPolygon(hexagonPointsCordinates);
hexagon.endFill();

hexagon.x = 0;
hexagon.y = 0;

hexagon.buttonMode = true;
hexagon.interactive = true;

container.addChild(hexagon);

// Circle on hexagon corners
let circles = [];
for (corner of hexagonPointsCordinates) {
    let pointCoordinate = {
        x: corner.x,
        y: corner.y
    }

    // Draw circle
    let circle = new PIXI.Graphics();
    circle.beginFill(0xff0000);
    circle.drawCircle(pointCoordinate.x, pointCoordinate.y, 5);
    circle.endFill();
    container.addChild(circle);

    circle.x = 0;
    circle.y = 0;

    circles.push(circle);
}

// Animation
app.ticker.add(animate);

let isAnimated = false;

function animate() {

    hexagon.on('mouseover', () => {
        isAnimated = true;
        console.log('mouseover');
    });

    hexagon.on('mouseout', () => {
        isAnimated = false;
    });

    if (isAnimated) {
        container.scale.x += 0.01;
        container.scale.y += 0.01;
    } else {
        if(container.scale.x > 1) {
            container.scale.x -= 0.01;
            container.scale.y -= 0.01;
        }
    }
}