import { openSync, type Font } from "fontkit";

// Doto draws each glyph as square dots on a grid of 0.1em
const font = (openSync("src/assets/fonts/Doto.ttf") as Font).getVariation({ wght: 700 });
const pitch = font.unitsPerEm / 10;
const PAD_X = 2;
const PAD_Y = 1;

type Cell = [number, number];

const dotPath = (cells: Cell[]) => cells.map(([x, y]) => `M${x} ${y}h.8v.8h-.8z`).join("");

const dotsOf = (text: string) => {
    const { glyphs, positions } = font.layout(text);
    const dots: Cell[] = [];
    let advance = 0;
    glyphs.forEach((glyph, i) => {
        let minX = Infinity;
        let maxY = -Infinity;
        for (const { command, args } of [...glyph.path.commands, { command: "moveTo", args: [] }]) {
            if (command === "moveTo" && minX !== Infinity) {
                dots.push([Math.floor((advance + minX) / pitch), Math.floor(maxY / pitch)]);
                minX = Infinity;
                maxY = -Infinity;
            }
            for (let a = 0; a < args.length; a += 2) {
                minX = Math.min(minX, args[a]);
                maxY = Math.max(maxY, args[a + 1]);
            }
        }
        advance += positions[i].xAdvance;
    });
    return dots;
};

export const dotMatrix = (text: string) => {
    const dots = dotsOf(text);
    const xs = dots.map(([x]) => x);
    const ys = [...dots, ...dotsOf("Hg")].map(([, y]) => y);
    const left = Math.min(...xs) - PAD_X;
    const top = Math.max(...ys) + PAD_Y;
    const cols = Math.max(...xs) + PAD_X + 1 - left;
    const rows = top - Math.min(...ys) + PAD_Y + 1;
    return {
        cols,
        rows,
        lit: dotPath(dots.map(([x, y]) => [x - left, top - y])),
        frame: `M1 0H${cols - 1}V1H${cols}V${rows - 1}H${cols - 1}V${rows}H1V${rows - 1}H0V1H1Z`,
    };
};

export const cursor = dotPath([[0, -1], [-1, 0], [0, 0], [1, 0], [0, 1]]);
