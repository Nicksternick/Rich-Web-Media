// ===== | Variables | =====

// ===== | Classes | =====
export class CircleVisualizer {
    constructor(canvasWidth, canvasHeight, color = "white", lineColor = "white", lineWidth = 1) {
        Object.assign(this, { canvasWidth, canvasHeight, color, lineColor, lineWidth });
        this.pointList = [];
        this.circleDivisions = 0;
        Object.seal(this);
    }

    update(audioData) {
        this.circleDivisions = (Math.PI * 2) / (audioData.length);

        this.pointList = [];

        for (let i = 0; i <= audioData.length; i++) {
            if (audioData[i] == 0) { break; }
            this.pointList.push(25 + audioData[i]);
        }
    }

    draw(ctx) {
        let midX = this.canvasWidth / 2;
        let midY = this.canvasHeight / 2;

        ctx.save();

        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.lineColor;

        // begin drawing
        ctx.beginPath();

        ctx.lineTo((Math.cos(0) * this.pointList[0] / 2) + midX, (Math.sin(0) * this.pointList[0] / 2) + midY);

        // setup the rect postion and size
        for (let i = 1; i <= this.pointList.length; i++) {
            let x = Math.cos(this.circleDivisions * i) * this.pointList[i];
            let y = Math.sin(this.circleDivisions * i) * this.pointList[i];
            ctx.lineTo((x / 2) + midX,
                (y / 2) + midY);
        }

        ctx.lineTo((Math.cos(0) * this.pointList[0] / 2) + midX, (Math.sin(0) * this.pointList[0] / 2) + midY);

        // color the rect
        ctx.fill();

        ctx.stroke();

        ctx.closePath();
        ctx.restore();
    }
}

export class LineVisualizer {
    constructor(canvasWidth, canvasHeight, color = "white", lineColor = "white", lineWidth = 1) {
        Object.assign(this, { canvasWidth, canvasHeight, color, lineColor, lineWidth });
        this.pointList = [];
        this.height = canvasHeight / 2;
        Object.seal(this);
    }

    update(audioData) {
        let width = this.canvasWidth / (audioData.length);

        this.pointList = [];

        for (let i = 0; i < audioData.length; i++) {
            let finalX = i * width;
            let finalY = this.height + 256 - audioData[i];
            let xy = [finalX, finalY];

            if (i == audioData.length - 1) {
                xy[0] = this.canvasWidth;
            }

            this.pointList.push(xy);
        }

        // this.pointList[audioData.length] = [this.canvasWidth, this.canvasHeight];
        // this.pointList[audioData.length + 1] = [0, this.canvasHeight];
    }

    draw(ctx) {
        ctx.save();

        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.lineColor;

        // begin drawing
        ctx.beginPath();

        ctx.moveTo(this.pointList[0][0], this.pointList[0][1]);

        // setup the rect postion and size
        for (let i = 1; i < this.pointList.length; i++) {
            ctx.lineTo(this.pointList[i][0], this.pointList[i][1]);
        }

        // color the rect
        ctx.fill();

        ctx.stroke();

        ctx.closePath();
        ctx.restore();
    }
}