const audio = document.getElementById('audio');
const visualizer = document.getElementById('visualizer');
const canvasContext = visualizer.getContext('2d');

// Add border to the audio element
audio.style.border = '2px solid lightgreen';

audio.volume = 0.03;
audio.play();

const audioContext = new AudioContext();
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
}

draw();