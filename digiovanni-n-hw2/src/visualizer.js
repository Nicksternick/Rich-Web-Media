// ===== | Variables | =====

import * as utils from './utils.js';
import * as visualizer from './visualizerUtils.js';

let ctx, canvasWidth, canvasHeight, gradient, analyserNode, audioData;

let lineVisualizer;
let circleVisualizer;

let basefill;
let baseStroke;

let gradientTimer = 0;

let pause = false;
// ===== | Methods | =====

const setupCanvas = (canvasElement, analyserNodeRef, defaultFill, defaultStroke) => {
    // create drawing context
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
    // keep a reference to the analyser node
    analyserNode = analyserNodeRef;
    // this is the array where the analyser data will be stored
    audioData = new Uint8Array(analyserNode.fftSize / 2);

    console.log(defaultFill);
    console.log(defaultStroke);

    basefill = defaultFill;
    baseStroke = defaultStroke;

    setupVisualizers();
}

const setupVisualizers = () => {
    lineVisualizer = new visualizer.LineVisualizer(canvasWidth,
        canvasHeight, basefill, baseStroke, 1);
    circleVisualizer = new visualizer.CircleVisualizer(canvasWidth,
        canvasHeight, basefill, baseStroke, 1);
}

const draw = (params = {}) => {
    // 1 - populate the audioData array with the frequency data from the analyserNode
    // notice these arrays are passed "by reference" 

    if (params.useFrequency) {
        analyserNode.getByteFrequencyData(audioData);
    }
    else {
        analyserNode.getByteTimeDomainData(audioData);
    }

    // 2 - draw background
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = .1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    // ===== | ===== | ===== | =====

    // 3 - draw gradient
    if (params.showGradient) {
        // create a gradient that runs top to bottom
        let step = 1
        let gradientStop = 100 / step;
        let stops = [];

        for (let i = 0; i < gradientStop; i++) {
            let percentage = (step * i) / 100;
            let readAudio = audioData[Math.round((audioData.length - 1) * percentage)];
            let value = `hsl(${(readAudio + gradientTimer) % 360}, 30%, 70%)`;
            console.log();
            stops.push({ percent: percentage, color: value });
        }

        gradientTimer++;

        gradient = utils.getLinearGradient(ctx, 0, canvasHeight, 0, 0, stops);

        effectGradient();
    }

    // 4 - draw bars
    if (params.showBars) {
        lineVisualizer.update(audioData);
        lineVisualizer.draw(ctx);
    }

    // 5 - draw circles
    if (params.showCircle) {
        circleVisualizer.update(audioData);
        circleVisualizer.draw(ctx);
    }
}

//#region Effect Methods
// ----- | Effect methods | -----
const effectGradient = () => {
    ctx.save();
    ctx.fillStyle = gradient;
    ctx.globalAlpha = .3;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();
}
//#endregion

export { setupCanvas, draw, circleVisualizer, lineVisualizer };