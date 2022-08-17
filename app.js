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

// Resize
window.addEventListener('resize', () => {
    _w = window.innerWidth;
    _h = window.innerHeight;
    app.renderer.resize(_w / ratio, _h / ratio);
});

const x = app.screen.width / 2;
const y = app.screen.height / 2;

const size = 50;

let hexagons = [];

let column = app.screen.width / (size);
let row = app.screen.height / (size * 2);

// Create hexagon grid
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if(i % 2 == 0) {
            hexagons.push(new Hexagon(x + (i * size), y + (j * size * 3), size, app));
        }
        else {
            hexagons.push(new Hexagon(x + (i * size), y + (j * size * 3) + size * 1.5, size, app));
        }
    }
}

// if(i % 2 === 0) {
//     hexagons.push(new Hexagon(i, y + (j * (size * 3)), size, app));
// } else {
//     hexagons.push(new Hexagon(i + size, y + (size * 1.5) + (j * (size * 3)), size, app));
// }

hexagons[0].makeCursor();

// for(let i = 0; i < 3; i++) {
//     hexagons.push(new Hexagon(x, y + (i * (size * 3)), size, app));
// }

// for(let i = 0; i < 3; i++) {
//     hexagons.push(new Hexagon(x + size, y + (size * 1.5) + (i * (size * 3)), size, app));
// }

// for(let i = 0; i < 4; i++) {
//     hexagons.push(new Hexagon(x + ((size * 2) - (size / 2)), y + (i * (size * 2 - (size / 4))) + size, size, app));
// }

// for(let i = 0; i < 4; i++) {
//     hexagons.push(new Hexagon(x + (i * (size * 2 - (size / 4))) + ((size / 2) + (size / 2)), y + ((size / 2) + (size / 2)), size, app));
// }

// Animation
app.ticker.add(animate);

function animate() {

}