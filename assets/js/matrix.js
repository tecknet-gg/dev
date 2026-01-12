const noise = (function() {
    const p = new Uint8Array(512);
    for (let i = 0; i < 256; i++) p[i] = p[i + 256] = Math.floor(Math.random() * 256);
    const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (t, a, b) => a + t * (b - a);
    const grad = (hash, x, y, z) => {
        const h = hash & 15;
        const u = h < 8 ? x : y, v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    };
    return (x, y, z) => {
        const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
        x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
        const u = fade(x), v = fade(y), w = fade(z);
        const A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z, B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;
        return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)), lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))),
            lerp(v, lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)), lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1))));
    };
})();

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height, rows, cols;
const res = 16;
const scale = 0.05; // Adjusted for JS coordinate space
const speed = 0.01;
let z_time = 0;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    cols = Math.ceil(width / res);
    rows = Math.ceil(height / res);
}

window.addEventListener('resize', resize);
resize();

function draw() {
    ctx.fillStyle = 'rgb(10, 10, 15)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = `bold ${res}px Courier New`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const x = i * res;
            const y = j * res;
            
            const noiseVal = noise(i * scale, j * scale, z_time);
            const char = noiseVal > 0 ? "0" : "1";
            const fx = x / width;
            const fy = y / height;
            const t = (fx + fy) / 2;
            
            const r = Math.floor(31 + (255 - 31) * t);
            const g = Math.floor(80 * (1 - t));
            const b = Math.floor(255 * (1 - t));

            const brightness = Math.max(0.2, (noiseVal + 1) / 2); // 0 to 1 range
            
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${brightness})`;
            ctx.fillText(char, x + res / 2, y + res / 2);
        }
    }

    z_time += speed;
    requestAnimationFrame(draw);
}

draw();