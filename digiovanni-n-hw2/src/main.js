// ===== | Variables | =====

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as visualizer from './visualizer.js';
import * as video from './video.js';

const drawParams = {
    showGradient: true,
    showBars: true,
    showCircle: true,
    useFrequency: true
}

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
    sound1: "media/New Adventure Theme.mp3"
});

//#region HTML UI References
// ----- | HTML UI References | -----
// Play button: Responsible for starting the audio
const playButton = document.querySelector("#btn-play");

// Pause button: Responsible for stopping the audio
const pauseButton = document.querySelector("#btn-pause");

// ListPlayButton & FilePlayButton: Used to choose 
// whether you want to play from a file or play from the list
const listPlayButton = document.querySelector("#btn-list-play");
const filePlayButton = document.querySelector("#btn-file-play");

// Volume slider & label: Responsible for controlling the volume
// (Gain Node) of the audio
const volumeSlider = document.querySelector("#slider-volume");
const volumeLabel = document.querySelector("#label-volume");

const highshelfSlider = document.querySelector("#slider-highshelf");
const lowshelfSlider = document.querySelector("#slider-lowshelf");

const trackSelect = document.querySelector("#select-song");

const fileSongInput = document.querySelector("#input-song");

const checkboxFrequency = document.querySelector("#cb-frequency");

const lineMinSlider = document.querySelector("#select-line-min");
const lineMaxSlider = document.querySelector("#select-line-max");
const lineWidthSlider = document.querySelector("#select-line-width");
const lineFillSelect = document.querySelector("#select-line-fill");
const lineStrokeSelect = document.querySelector("#select-line-stroke");

const circleMinSlider = document.querySelector("#select-circle-min");
const circleMaxSlider = document.querySelector("#select-circle-max");
const circleWidthSlider = document.querySelector("#select-circle-width");
const circleFillSelect = document.querySelector("#select-circle-fill");
const circleStrokeSelect = document.querySelector("#select-circle-stroke");
//#endregion


// ===== | Methods | =====

const init = () => {
    console.log("init called");
    console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
    audio.setupWebaudio(DEFAULTS.sound1);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    setupUI(canvasElement);
    visualizer.setupCanvas(canvasElement, audio.analyserNode);
    loop();

    video.setupVideoNode(canvasElement.height, canvasElement.width);
}

const setupUI = (canvasElement) => {
    // set up the buttons
    setupButtons();

    // set up the sliders
    setupSliders();

    // set up selectors
    setupSelect();

    checkboxFrequency.onclick = () => {
        drawParams.useFrequency = checkboxFrequency.checked;
    }
} // end setupUI

const loop = () => {
    /* NOTE: This is temporary testing code that we will delete in Part II */
    setTimeout(loop);

    visualizer.draw(drawParams);
}

// ----- | Setup Functions For Init To Organize It Better | -----

const setupButtons = () => {
    // Get references to the buttons, then setup their on click event

    // Create an event when the play button is clicked
    playButton.onclick = e => {
        // check if the contet i in suspended space (autoplay policy)
        if (audio.audioCtx.state == "suspended") {
            audio.audioCtx.resume();
        }

        // play the audio
        audio.playCurrentSound();
    };

    // Create an event when the pause button is clicked
    pauseButton.onclick = e => {
        // pause the audio
        audio.pauseCurrentSound();
    }

    listPlayButton.onclick = e => {
        audio.loadSoundFile(trackSelect.value);
        playButton.dispatchEvent(new MouseEvent("click"));
    }

    filePlayButton.onclick = e => {
        let words = fileSongInput.value.split('.');

        if (words[words.length - 1] == "mp3") {
            const file = fileSongInput.files[0];
            audio.loadSoundFile(URL.createObjectURL(file));
            playButton.dispatchEvent(new MouseEvent("click"));
        }
        else if (words[words.length - 1] == "mp4") {
            video.playVideo();
            drawVideo();
        }
    }
}

const setupSelect = () => {
    lineFillSelect.onchange = () => {
        visualizer.lineVisualizer.setFillColor(lineFillSelect.value);
    }

    lineStrokeSelect.onchange = () => {
        visualizer.lineVisualizer.setLineColor(lineStrokeSelect.value);
    }

    circleFillSelect.onchange = () => {
        visualizer.circleVisualizer.setFillColor(circleFillSelect.value);
    }

    circleStrokeSelect.onchange = () => {
        visualizer.circleVisualizer.setLineColor(circleStrokeSelect.value);
    }
}

const setupSliders = () => {
    // ===== | Visualizer Sliders | =====
    lineMinSlider.oninput = e => {
        visualizer.lineVisualizer.setMinData(e.target.value);
    }

    lineMaxSlider.oninput = e => {
        visualizer.lineVisualizer.setMaxData(e.target.value);
    }

    lineWidthSlider.oninput = e => {
        visualizer.lineVisualizer.setLineWidth(e.target.value);
    }

    circleMinSlider.oninput = e => {
        visualizer.circleVisualizer.setMinData(e.target.value);
    }

    circleMaxSlider.oninput = e => {
        visualizer.circleVisualizer.setMaxData(e.target.value);
    }

    circleWidthSlider.oninput = e => {
        visualizer.circleVisualizer.setLineWidth(e.target.value);
    }

    // ===== | Other Stuff | =====
    volumeSlider.oninput = e => {
        // Set the gain
        audio.setVolume(e.target.value);

        // update value of label to math value of slider
        volumeLabel.innerHTML = Math.round((e.target.value / 2 * 100));
    };

    // set value of label to match inital value of slider
    volumeSlider.dispatchEvent(new Event("input"));

    audio.setVolume(.01);

    highshelfSlider.oninput = e => {
        audio.setHighshelf(e.target.value);
    }

    lowshelfSlider.oninput = e => {
        audio.setLowshelf(e.target.value);
    }
}

function drawVideo() {
    if (video.videoNode.paused || video.videoNode.ended) {
        return;
    }

    document.querySelector("canvas").getContext("2d").drawImage(video.videoNode, 0, 0, visualizer.width, visualizer.height);
    requestAnimationFrame(drawVideo);
}

export { init };