// audio.js

const audio = document.getElementById('audio');
const visualizer = document.getElementById('visualizer');
const canvasContext = visualizer.getContext('2d');

// Add border to the audio element
audio.style.border = '2px solid lightgreen';

audio.volume = 0.1;

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioSource = audioContext.createMediaElementSource(audio);
const analyser = audioContext.createAnalyser();

audioSource.connect(analyser);
analyser.connect(audioContext.destination);

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);

    canvasContext.clearRect(0, 0, visualizer.width, visualizer.height);
    canvasContext.fillStyle = 'rgba(0, 0, 0, 1)'; // Set background color to black

    const barWidth = 1;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] * 0.75;
        // Set bar color to green
        canvasContext.fillStyle = 'rgba(0, 255, 0, 0.4)';
        canvasContext.fillRect(x, visualizer.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }

    // Add border on the right side of the canvas (light green)
    canvasContext.strokeStyle = 'rgba(144, 238, 144, 1)'; // Change this line for a lighter green color
    canvasContext.lineWidth = 2;
    canvasContext.beginPath();
    canvasContext.moveTo(visualizer.width - 1, 0);
    canvasContext.lineTo(visualizer.width - 1, visualizer.height);
    canvasContext.stroke();

    // Add text to the second border (bottom border)
    canvasContext.fillStyle = 'lightgreen';
    canvasContext.font = '20px monospace';
    canvasContext.fillText('SDA.Console v1', 230, visualizer.height - 170); // Adjust position as needed
}

draw();

// Add event listeners for the start and pause buttons
const startAudioButton = document.getElementById('start-audio-button');
const pauseAudioButton = document.getElementById('pause-audio-button');

startAudioButton.addEventListener('click', () => {
    audio.play();
});

pauseAudioButton.addEventListener('click', () => {
    audio.pause();
});
