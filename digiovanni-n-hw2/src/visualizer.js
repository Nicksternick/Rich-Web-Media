// ===== | Variables | =====

import * as utils from './utils.js';
import * as shape from './canvasUtils.js';
import * as visualizer from './visualizerUtils.js';

let ctx, canvasWidth, canvasHeight, gradient, analyserNode, audioData;

let streamers = [];
let lineVisualizer;
let CircleVisualizer;
// ===== | Methods | =====

const setupCanvas = (canvasElement, analyserNodeRef) => {
    // create drawing context
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
    // create a gradient that runs top to bottom
    gradient = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [{ percent: 0, color: "blue" }, { percent: .25, color: "green" }, { percent: .5, color: "yellow" }, { percent: .75, color: "red" }, { percent: 1, color: "magenta" }]);
    // keep a reference to the analyser node
    analyserNode = analyserNodeRef;
    // this is the array where the analyser data will be stored
    audioData = new Uint8Array(analyserNode.fftSize / 2);

    setupVisualizers();
    setupEffects();
}

const setupVisualizers = () => {
    lineVisualizer =  new visualizer.LineVisualizer(canvasWidth, canvasHeight, `rgba(255,255,255,0)`, "red", 1);
    CircleVisualizer = new visualizer.CircleVisualizer(canvasWidth, canvasHeight, `rgba(255,255,255,0)`, "red", 1);
}

const setupEffects = () => {
    for (let i = 0; i < 4; i++)
    {
        streamers.push(new shape.StreamerSprite(2, "red", canvasWidth, canvasHeight));
        streamers.push(new shape.StreamerSprite(2, "yellow", canvasWidth, canvasHeight));
        streamers.push(new shape.StreamerSprite(2, "blue", canvasWidth, canvasHeight));
        streamers.push(new shape.StreamerSprite(2, "green", canvasWidth, canvasHeight));
        streamers.push(new shape.StreamerSprite(2, "purple", canvasWidth, canvasHeight));
        streamers.push(new shape.StreamerSprite(2, "orange", canvasWidth, canvasHeight));
    }
}

const draw = (params = {}) => {
    // 1 - populate the audioData array with the frequency data from the analyserNode
    // notice these arrays are passed "by reference" 

    if (params.useFrequency)
    {
        analyserNode.getByteFrequencyData(audioData);
    }
    else
    {
        analyserNode.getByteTimeDomainData(audioData);
    }

    // OR
    //analyserNode.getByteTimeDomainData(audioData); // waveform data

    // 2 - draw background
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = .1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    // ===== | ===== | ===== | =====

    effectStreamers();

    // 3 - draw gradient
    if (params.showGradient) {
        //effectGradient();
    }

    // 4 - draw bars
    if (params.showBars) {
        //visualizeBars();
        //visualizeLine();
        lineVisualizer.update(audioData);
        lineVisualizer.draw(ctx);
        
        CircleVisualizer.update(audioData);
        CircleVisualizer.draw(ctx);
    }

    // 5 - draw circles
    if (params.showCircle) {
        //visualizeCircle();
    }
}

//#region Visualizer Methods
// ----- | Visualizer Methods | -----
// All visualizer methods will start with "visualize"

const visualizeLine = () => {
    let width = canvasWidth / (audioData.length);
    let height = 100
    let pointList = [];

    ctx.save();
    ctx.globalAlpha = 1;
    ctx.fillStyle = `rgba(255,255,255,0)`;
    ctx.strokeStyle = `rgba(255,255,255,0.50)`;

    for (let i = 0; i < audioData.length; i++) {
        let finalX = i * width;
        let finalY = height + 256 - audioData[i];
        let xy = [finalX, finalY];

        if (i == audioData.length - 1)
        {
            xy[0] = canvasWidth;
        }

        pointList[i] = xy;
    }

    pointList[audioData.length] = [canvasWidth, canvasHeight];
    pointList[audioData.length + 1] = [0, canvasHeight];

    shape.drawPoly(ctx, pointList, true);
    ctx.restore();
}

const visualizeBars = () => {
    let barSpacing = 0;
    let margin = 0;
    let screenWidthForBars = canvasWidth - (audioData.length * barSpacing) - margin * 2;
    let barWidth = screenWidthForBars / audioData.length;
    let barHeight = 200;
    let topSpacing = 100;

    let fillStyle = `rgba(255,255,255,0.50)`;
    let strokeStyle = `rgba(0,0,0,0.50)`;

    // loop through the data and draw 
    for (let i = 0; i < audioData.length; i++) {
        let finalX = margin + i * (barWidth + barSpacing);
        let finalY = topSpacing + 256 - audioData[i];
        shape.drawRectSave(ctx, finalX, finalY, barWidth, barHeight, fillStyle, 0, strokeStyle);
    }
}

const visualizeCircle = () => {
    let maxRadius = canvasHeight / 4;
    ctx.save();
    ctx.globalAlpha = 0.5;
    //ctx.lineWidth = 0;
    for (let i = 0; i < audioData.length; i++) {
        // red-ish circles
        let percent = audioData[i] / 255;

        let circleRadius = percent * maxRadius;

        ctx.fillStyle = utils.makeColor(255, 111, 111, .34 - percent / 3.0);
        shape.drawArc(ctx, canvasWidth / 2, canvasHeight / 2, circleRadius, 0, 2 * Math.PI);

        ctx.fillStyle = utils.makeColor(0, 0, 255, .10 - percent / 10.0);
        shape.drawArc(ctx, canvasWidth / 2, canvasHeight / 2, circleRadius * 1.5, 0, 2 * Math.PI);

        ctx.fillStyle = utils.makeColor(200, 200, 0, .5 - percent / 5.0);
        shape.drawArc(ctx, canvasWidth / 2, canvasHeight / 2, circleRadius * .50, 0, 2 * Math.PI);
    }
    ctx.restore();
}
//#endregion

//#region Effect Methods
// ----- | Effect methods | -----
const effectGradient = () => {
    ctx.save();
    ctx.fillStyle = gradient;
    ctx.globalAlpha = .3;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();
}

const effectStreamers = () => {
    streamers.forEach(streamer => {
        streamer.update();
        streamer.draw(ctx);
    });
}
//#endregion

export { setupCanvas, draw };