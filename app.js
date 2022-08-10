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

const x = 0;
const y = 0;

const size = 50;

let hexagons = [];

for(let i = 0; i < 2; i++) {
    hexagons.push(new Hexagon(x + (i * (size * 2)), y, size, container, app));
}

console.log(hexagons);

app.stage.addChild(container);

// Animation
app.ticker.add(animate);

function animate() {

}