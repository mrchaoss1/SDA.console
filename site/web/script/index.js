const socket = io();

const input = document.getElementById('input');
const outputContainer = document.getElementById('output-container');

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const message = input.value;
    socket.emit('sendMessage', message);
    input.value = '';
  }
});

socket.on('newMessage', (message) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  outputContainer.appendChild(messageElement);
});