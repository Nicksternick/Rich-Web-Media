// ===== | Variables | =====

// ===== | Methods | =====

//#region Normal Methods
// ----- | Normal Methods | -----
// Methods thjat do not use ctx.save() and ctx.restore() in the methods

export const drawPoly = (ctx, pointList, drawStroke = false) => {
    // begin drawing
    ctx.beginPath();

    ctx.moveTo(pointList[0][0], pointList[0][1]);

    // setup the rect postion and size
    for (let i = 1; i < pointList.length; i++) {
        ctx.lineTo(pointList[i][0], pointList[i][1]);
    }

    // color the rect
    ctx.fill();
    // setup lines if linewidth is greater then 0
    if (drawStroke) {
        // stroke the rect
        ctx.stroke();
    } // end if
    // stop drawing
    ctx.closePath();
}

/**
 * Draws a rect that uses ctx.save() and ctx.restore()
 * @param {*} ctx the canvas context
 * @param {*} x the x position of the rect (bottom left)
 * @param {*} y the y position of the rect (bottom left)
 * @param {*} width the width of the rect
 * @param {*} height the height of the rect
 * @param {*} drawStroke whether to stroke the line or not
 */
export const drawRect = (ctx, x, y, width, height, drawStroke = false) => {
    // begin drawing
    ctx.beginPath();
    // setup the rect postion and size
    ctx.rect(x, y, width, height);
    // color the rect
    ctx.fill();
    // setup lines if linewidth is greater then 0
    if (drawStroke) {
        // stroke the rect
        ctx.stroke();
    } // end if
    // stop drawing
    ctx.closePath();
}

/**
 * Draws an arc
 * @param {*} ctx the canvas context
 * @param {*} x the x position of the arc (center)
 * @param {*} y the y position of the ard (center)
 * @param {*} radius the radius of the sphere
 * @param {*} startAngle the start of the arc (default = 0)
 * @param {*} endAngle the end of the arc (default is PI*2)
 * @param {*} drawStroke whether to stroke the line or not
 */
export const drawArc = (ctx, x, y, radius, startAngle = 0,
    endAngle = Math.PI * 2, drawStroke = false) => {
    // begin drawing
    ctx.beginPath();
    // create the art
    ctx.arc(x, y, radius, startAngle, endAngle);
    // color the arc
    ctx.fill();
    // setup lines if linewidth is greater then 0
    if (drawStroke) {
        // stroke the rect
        ctx.stroke();
    } // end if
    // stop drawing
    ctx.closePath();
}
//#endregion

//#region Save Methods
// ----- | Save Methods | -----
// Methods that use ctx.save() and ctx.restore() in the methods

/**
 * Draws a passed in image to the canvas
 */
export const drawImageSave = (ctx, image, x, y, width, height) => {
    ctx.save();
    ctx.drawImage(image, x, y, width, height);
    ctx.restore();
}

/**
 * Draws a rect that uses ctx.save() and ctx.restore()
 * @param {*} ctx the canvas context
 * @param {*} x the x position of the rect (bottom left)
 * @param {*} y the y position of the rect (bottom left)
 * @param {*} width the width of the rect
 * @param {*} height the height of the rect
 * @param {*} fillStyle the fill color
 * @param {*} lineWidth the width of the line
 * @param {*} strokeStyle the line color
 */
export const drawRectSave = (ctx, x, y, width, height,
    fillStyle = "black", lineWidth = 0, strokeStyle = "black") => {
    // Save to the canvas stack
    ctx.save();
    // set the fillstyle of the rect
    ctx.fillStyle = fillStyle;
    // begin drawing
    ctx.beginPath();
    // setup the rect postion and size
    ctx.rect(x, y, width, height);
    // color the rect
    ctx.fill();
    // setup lines if linewidth is greater then 0
    if (lineWidth > 0) {
        // set up linewidth
        ctx.lineWidth = lineWidth;
        // set up stroke color
        ctx.strokeStyle = strokeStyle;
        // stroke the rect
        ctx.stroke();
    } // end if
    // stop drawing
    ctx.closePath();
    //Pop the stack
    ctx.restore();
}

/**
 * Draws a arc that uses ctx.save() and ctx.restore()
 * @param {*} ctx the canvas context
 * @param {*} x the x position of the arc (center)
 * @param {*} y the y position of the ard (center)
 * @param {*} radius the radius of the sphere
 * @param {*} fillStyle the fill color
 * @param {*} lineWidth the width of the line
 * @param {*} strokeStyle the line color
 * @param {*} startAngle the start of the arc (default = 0)
 * @param {*} endAngle the end of the arc (default is PI*2)
 */
export const drawArcSave = (ctx, x, y, radius, fillStyle = "black", lineWidth = 0,
    strokeStyle = "black", startAngle = 0, endAngle = Math.PI * 2) => {
    // Save to the canvas stack
    ctx.save();
    // set the fillstyle of the rect
    ctx.fillStyle = fillStyle;
    // begin drawing
    ctx.beginPath();
    // create the art
    ctx.arc(x, y, radius, startAngle, endAngle);
    // color the arc
    ctx.fill();
    // setup lines if linewidth is greater then 0
    if (lineWidth > 0) {
        // set up linewidth
        ctx.lineWidth = lineWidth;
        // set up stroke color
        ctx.strokeStyle = strokeStyle;
        // stroke the rect
        ctx.stroke();
    } // end if
    // stop drawing
    ctx.closePath();
    //Pop the stack
    ctx.restore();
}
//#endregion

// ===== | Classes | =====
export class StreamerSprite {
    constructor(radius, color, canvasWidth, canvasHeight) {
        Object.assign(this, { radius, color, canvasWidth, canvasHeight })
        this.x = Math.random() * (canvasWidth);
        this.y = 0;
        this.angle = 0;
        this.increment = Math.PI * 2 / 100;
        this.paused = true;
        Object.seal(this);
    }

    update() {
        if (!this.paused) {
            this.y++;
            this.x += Math.sin(this.angle);
            this.angle += this.increment;
        }
        else
        {
            if (Math.floor(Math.random() * (100)) == 50)
            this.paused = false;
        }

        if (this.y >= this.canvasHeight) {
            this.x = Math.random() * (this.canvasWidth);
            this.y = 0;
            this.angle = 0;
            this.paused = true;
        }
    }

    draw(ctx) {
        if (!this.paused) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    }
}