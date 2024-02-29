// ===== | Variables | =====
/**The Web Audio Context*/
let audioCtx

/** the audio element instantiated in code */
let audioElement

/** The nodes used to analyize the audio data */
let analyserNode;
/** The nodes used to effect the audio sound */
let gainNode;

const DEFAULTS = Object.freeze({
    gain: .5,
    numSamples: 256
});

// ===== | Methods | =====

/** 
* Sets up the audio nodes to work on a new audio file
* @param filePath the path to the audio file
*/
const setupWebAudio = (filePath) =>
{
    // Create a new audioContext, and have a fallback incase window.AudioContex is not supported
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    // Fill the audioCtx with this new context
    audioCtx = AudioContext();

    // fill the audio element with a new audio tag
    audioElement = new Audio();
}