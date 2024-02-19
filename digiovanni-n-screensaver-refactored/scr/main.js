// ===== | Imports | =====
import { getRandomInt, getRandomColor } from "./utils.js";
import * as shapes from "./canvas-utils.js";

// Declare top variables
let ctx;
let paused = false;
let createRectangles = true;
let createArcs = true;
let createLines = true;
let canvas;

// init(): Initilizes the page on startup
const init = () => {
    console.log("page loaded!");

    // A - `canvas` variable points at <canvas> tag
    canvas = document.querySelector("canvas");

    // B - the `ctx` variable points at a "2D drawing context"
    ctx = canvas.getContext("2d");

    // Draw the background
    drawBackground();

    // Set up the html UI
    setupUI();

    // Begin the update look
    update();
}

// drawBackground(): draws the shapes that make up the background
const drawBackground = () => {
    shapes.drawRectangle(ctx, 20, 20, 600, 440, "red");
    shapes.drawLine(ctx, 20, 20, 620, 440, 20, "Yellow");
}

// Update(): The main loop that updates every frame
const update = () => {
    // Stop the loop if paused
    if (paused) return;

    // Request update to be played next frame
    requestAnimationFrame(update);

    // Draw random shapes if they are active
    if (createRectangles) shapes.drawRandomRect(ctx, 0, 640, 0, 480);
    if (createArcs) shapes.drawRandomArc(ctx, 0, 640, 0, 480);
    if (createLines) shapes.drawRandomLine(ctx, 0, 640, 0, 480);
}

// Event Handler
const canvasClicked = (e) => {
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;
    console.log(mouseX, mouseY);
    for (let i = 0; i < 10; i++) {
        let x = getRandomInt(-100, 100) + mouseX;
        let y = getRandomInt(-100, 100) + mouseY;
        let radius = getRandomInt(10, 60);
        let color = getRandomColor();
        drawArc(ctx, x, y, radius, color);
    }
}

// Helpers
const setupUI = () => {
    document.querySelector("#btn-pause").onclick = () => {
        paused = true;
    };

    document.querySelector("#btn-play").onclick = () => {
        if (!paused) return;
        paused = false;
        update();
    };

    // CLEAR BUTTON
    document.querySelector("#btn-clear").onclick = () => {
        // CLEAR THE SCREEN
        ctx.clearRect(0, 0, 640, 480);
        // REDRAW THE BACKGROUND
        drawBackground();
    };

    canvas.onclick = canvasClicked;

    document.querySelector("#cb-rectangles").onclick = (e) => {
        createRectangles = e.target.checked;
    }

    document.querySelector("#cb-arcs").onclick = (e) => {
        createArcs = e.target.checked;
    }

    document.querySelector("#cb-lines").onclick = (e) => {
        createLines = e.target.checked;
    }
}

init();