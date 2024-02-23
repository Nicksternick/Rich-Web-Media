/*
    main.js is primarily responsible for hooking up the UI to the rest of the application 
    and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';

const drawParams = {
    showGradient : true,
    showBars : true,
    showCircle : true,
    showNoise : true
}

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
    sound1: "media/New Adventure Theme.mp3"
});

function init() {
    console.log("init called");
    console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
    audio.setupWebaudio(DEFAULTS.sound1);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    setupUI(canvasElement);
    canvas.setupCanvas(canvasElement, audio.analyserNode);
    loop();
}

function setupUI(canvasElement) {
    // A - hookup fullscreen button
    const fsButton = document.querySelector("#fsButton");

    // add .onclick event to button
    fsButton.onclick = e => {
        console.log("goFullscreen() called");
        utils.goFullscreen(canvasElement);
    };

    const playButton = document.querySelector("#playButton");

    playButton.onclick = e => {
        console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

        // check if the contet i in suspended space (autoplay policy)
        if (audio.audioCtx.state == "suspended") {
            audio.audioCtx.resume();
        }

        console.log(`audioCtx.state after = ${audio.audioCtx.state}`);

        if (e.target.dataset.playing == "no") {
            // if the track is currently paused, play it
            audio.playCurrentSound();
            e.target.dataset.playing = "yes"; // our CSS will set the text to "pause"
        }
        else {
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no"; // our CSS will set the text to "play"
        }

        // C - hook up slider & label
        let volumeSlider = document.querySelector("#volumeSlider");
        let volumeLabel = document.querySelector("#volumeLabel");

        // add .oninput event to slider
        volumeSlider.oninput = e => {
            // Set the gain
            audio.setVolume(e.target.value);

            // update value of label to math value of slider
            volumeLabel.innerHTML = Math.round((e.target.value / 2 * 100));
        };

        // set value of label to match inital value of slider
        volumeSlider.dispatchEvent(new Event("input"));

        // D - hookup track <select>
        let trackSelect = document.querySelector("#trackSelect");
        // add .onchange event to <select>
        trackSelect.onchange = e => {
            audio.loadSoundFile(e.target.value);
            // pause the current track if it's playing
            if (playButton.dataset.playing == "yes") {
                playButton.dispatchEvent(new MouseEvent("click"));
            }
        };
    };

    // ===== | Setup Checkboxes | =====
        
        // toggleEffect(): Changes the boolean value of a thing
        // based of the value of the check (use with check boxes)
        const toggleEffect = (checked, value) => {
            value = checked;
        }

        // Get references to the buttons
        const gradientToggle = document.querySelector("#gradientCB");
        const barToggle = document.querySelector("#barsCB");
        const circleToggle = document.querySelector("#circlesCB");
        
        gradientToggle.onclick = () => {
            drawParams.showGradient = gradientToggle.checked;
        };

        barToggle.onclick = () => {
            drawParams.showBars = barToggle.checked;
        };

        circleToggle.onclick = () => {
            drawParams.showCircle = circleToggle.checked;
        };

        gradientToggle.checked = true;
        barToggle.checked = true;
        circleToggle.checked = true;


} // end setupUI

function loop() {
    /* NOTE: This is temporary testing code that we will delete in Part II */
    requestAnimationFrame(loop);

    canvas.draw(drawParams);

    // // 1) create a byte array (values of 0-255) to hold the audio data
    // // normally, we do this once when the program starts up, NOT every frame
    // let audioData = new Uint8Array(audio.analyserNode.fftSize / 2);

    // // 2) populate the array of audio data *by reference* (i.e. by its address)
    // audio.analyserNode.getByteFrequencyData(audioData);

    // // 3) log out the array and the average loudness (amplitude) of all of the frequency bins
    // console.log(audioData);

    // console.log("-----Audio Stats-----");
    // let totalLoudness = audioData.reduce((total, num) => total + num);
    // let averageLoudness = totalLoudness / (audio.analyserNode.fftSize / 2);
    // let minLoudness = Math.min(...audioData); // ooh - the ES6 spread operator is handy!
    // let maxLoudness = Math.max(...audioData); // ditto!
    // // Now look at loudness in a specific bin
    // // 22050 kHz divided by 128 bins = 172.23 kHz per bin
    // // the 12th element in array represents loudness at 2.067 kHz
    // let loudnessAt2K = audioData[11];
    // console.log(`averageLoudness = ${averageLoudness}`);
    // console.log(`minLoudness = ${minLoudness}`);
    // console.log(`maxLoudness = ${maxLoudness}`);
    // console.log(`loudnessAt2K = ${loudnessAt2K}`);
    // console.log("---------------------");
}

export { init };