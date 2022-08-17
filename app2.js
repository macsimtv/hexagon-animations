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
    // transparent: true,
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

let hexagon = new Hexagon(x, y, size, app);
hexagon.makeCursor();

// Animation
app.ticker.add(animate);

function animate() {

}