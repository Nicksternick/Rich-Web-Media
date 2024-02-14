import { getRandomInt, getRandomColor } from "./utils.js";

export const drawRectangle = (ctx, x, y, width, height, fillStyle = "black", lineWidth = 0, strokeStyle = "black") => {
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill();
    if (lineWidth > 0) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }
    ctx.restore();
}

export const drawArc = (ctx, x, y, radius,
    fillStyle = "black", lineWidth = 0, strokeStyle = "black",
    startAngle = 0, endAngle = Math.PI * 2) => {
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fill();
    if (lineWidth > 0) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }
    ctx.restore();
}

export const drawLine = (ctx, x1, y1, x2, y2, lineWidth = 1, strokeStyle = "black") => {
    ctx.save();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

// Draws a random Rectangle
export const drawRandomRect = (ctx, minWidth, maxWidth, minHeight, maxHeight) => {
    drawRectangle(ctx, getRandomInt(minWidth, maxWidth), getRandomInt(minHeight, maxHeight), getRandomInt(10, 90), 
    getRandomInt(10, 90), getRandomColor(), getRandomInt(2, 12), getRandomColor());
}

// Draws a random Circle
export const drawRandomArc = (ctx, minWidth, maxWidth, minHeight, maxHeight) => {
    drawArc(ctx, getRandomInt(minWidth, maxWidth), getRandomInt(minHeight, maxHeight), getRandomInt(10, 60),
        getRandomColor(), getRandomInt(1, 10), getRandomColor());
}

// Draws a random line
export const drawRandomLine = (ctx, minWidth, maxWidth, minHeight, maxHeight) => {
    drawLine(ctx, getRandomInt(minWidth, maxWidth), getRandomInt(minHeight, maxHeight),
        getRandomInt(minWidth, maxWidth), getRandomInt(minHeight, maxHeight), getRandomInt(5, 20), getRandomColor());
}