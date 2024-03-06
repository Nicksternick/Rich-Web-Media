// ===== | Variables | =====

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as visualizer from './visualizer.js';

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
const checkboxLine = document.querySelector("#cb-line");
const checkboxCircle = document.querySelector("#cb-circle");
const checkboxGradient = document.querySelector("#cb-gradient");

const lineMinSlider = document.querySelector("#select-line-min");
const lineMinLabel = document.querySelector("#label-line-min");

const lineMaxSlider = document.querySelector("#select-line-max");
const lineMaxLabel = document.querySelector("#label-line-max");

const lineWidthSlider = document.querySelector("#select-line-width");
const lineWidthLabel = document.querySelector("#label-line-width");

const lineFillSelect = document.querySelector("#select-line-fill");
const lineStrokeSelect = document.querySelector("#select-line-stroke");

const circleMinSlider = document.querySelector("#select-circle-min");
const circleMinLabel = document.querySelector("#label-circle-min");

const circleMaxSlider = document.querySelector("#select-circle-max");
const circleMaxLabel = document.querySelector("#label-circle-max");

const circleWidthSlider = document.querySelector("#select-circle-width");
const circleWidthLabel = document.querySelector("#label-circle-width");

const circleFillSelect = document.querySelector("#select-circle-fill");
const circleStrokeSelect = document.querySelector("#select-circle-stroke");
//#endregion


// ===== | Methods | =====

const init = (defaultFill, defaultStroke) => {
    console.log("init called");
    console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
    audio.setupWebaudio(DEFAULTS.sound1);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    setupUI();
    
    visualizer.setupCanvas(canvasElement, audio.analyserNode, defaultFill, defaultStroke);
    loop();
}

const setupUI = () => {
    // set up the buttons
    setupButtons();

    // set up the sliders
    setupSliders();

    // set up selectors
    setupSelect();

    // set up checkboxes
    setupCheckboxes();
    
} // end setupUI

const loop = () => {
    /* NOTE: This is temporary testing code that we will delete in Part II */
    setTimeout(loop);

    visualizer.draw(drawParams);
}

// ----- | Setup Functions For Init To Organize It Better | -----

const setupCheckboxes = () => {
    checkboxFrequency.onclick = () => {
        drawParams.useFrequency = checkboxFrequency.checked;
    }

    checkboxLine.onclick = () => {
        drawParams.showBars = checkboxLine.checked;
    }

    checkboxCircle.onclick = () => {
        drawParams.showCircle = checkboxCircle.checked;
    }

    checkboxGradient.onclick = () => {
        drawParams.showGradient = checkboxGradient.checked;
    }
}

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
        lineMinLabel.innerHTML = `Min Analyzed Data: ${e.target.value}`;
        
    }

    lineMaxSlider.oninput = e => {
        visualizer.lineVisualizer.setMaxData(e.target.value);
        lineMaxLabel.innerHTML = `Max Analyzed Data: ${e.target.value}`;
    }

    lineWidthSlider.oninput = e => {
        visualizer.lineVisualizer.setLineWidth(e.target.value);
        lineWidthLabel.innerHTML = `Line Width: ${e.target.value}`;
    }

    circleMinSlider.oninput = e => {
        visualizer.circleVisualizer.setMinData(e.target.value);
        circleMinLabel.innerHTML = `Min Analyzed Data: ${e.target.value}`;
    }

    circleMaxSlider.oninput = e => {
        visualizer.circleVisualizer.setMaxData(e.target.value);
        circleMaxLabel.innerHTML = `Max Analyzed Data: ${e.target.value}`;
    }

    circleWidthSlider.oninput = e => {
        visualizer.circleVisualizer.setLineWidth(e.target.value);
        circleWidthSlider.innerHTML = `Line Width: ${e.target.value}`;
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

    highshelfSlider.oninput = e => {
        audio.setHighshelf(e.target.value);
    }

    lowshelfSlider.oninput = e => {
        audio.setLowshelf(e.target.value);
    }
}

export { init };