// ===== | Variables | =====
let videoNode

// ===== | Methods | =====
const setupVideoNode = (videoHeight, videoWidth) =>
{
    videoNode = document.createElement('video');

    videoNode.height = videoHeight;
    videoNode.width = videoWidth;
    videoNode.src = "media/gotchard.mp4";

    
}

const playVideo = () =>
{
    videoNode.play();
}

export {setupVideoNode, playVideo, videoNode}