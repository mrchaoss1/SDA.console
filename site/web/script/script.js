const inputField = document.getElementById("input");
const outputContainer = document.getElementById("output-container");
const inputUnderline = document.getElementById("input-underline");

const updateInputUnderline = (inputText) => {
    const inputWidth = inputText.length * 10;
    inputUnderline.style.width = `${inputWidth}px`;
};

const handleClearCommand = () => {
    outputContainer.innerHTML = "";
    localStorage.setItem("outputText", ""); // Update the saved output text
};

const handleHelpCommand = () => {
    const outputHTML = `
        <div class="output-line">Available commands:</div>
        <p></p>
        <div class="output-line">- /clear: Clears the console output</div>
        <div class="output-line">- /help: Displays this help message</div>
        <div class="output-line">- /date: Displays the current date</div>
        <div class="output-line">- /echo <text>: Repeats the provided text</div>
        <p></p>`;
    outputContainer.innerHTML += outputHTML;
};

const handleDateCommand = (username) => {
    const currentDate = new Date().toLocaleString();
    const outputHTML = `<div class="output-line">Current date and time: ${currentDate}</div>`;
    outputContainer.innerHTML += outputHTML;

    // Save the output text automatically
    const savedOutputText = localStorage.getItem("outputText") || "";
    localStorage.setItem("outputText", savedOutputText + outputHTML);
};

const handleEchoCommand = (text, username) => {
    const outputHTML = `<div class="output-line">${text}</div>`;
    outputContainer.innerHTML += outputHTML;

    // Save the output text automatically
    const savedOutputText = localStorage.getItem("outputText") || "";
    localStorage.setItem("outputText", savedOutputText + outputHTML);
};

const handleGeneralInput = (inputText, username) => {
    const outputHTML = `<div class="output-line">${username}@sda-net:~$ ${inputText}</div>`;
    outputContainer.innerHTML += outputHTML;

    // Save the output text automatically
    const savedOutputText = localStorage.getItem("outputText") || "";
    localStorage.setItem("outputText", savedOutputText + outputHTML);
};

const retrieveSavedOutputText = () => {
    const savedOutputText = localStorage.getItem("outputText");
    if (savedOutputText) {
        outputContainer.innerHTML = savedOutputText;
        const outputHTML = `<div class="output-line history-loaded"><span>●</span> History Loaded!</div><p></p>`;
        outputContainer.innerHTML += outputHTML;
    }
};

const handleKeyPress = (event, username) => {
    if (event.key === "Enter") {
        const inputText = event.target.value.trim();
        if (inputText === "") {
            // Do nothing if the input is empty
            return;
        }

        const inputArr = inputText.split(" ");
        const command = inputArr[0];
        const args = inputArr.slice(1).join(" ");

        if (command === "/clear") {
            handleClearCommand();
        } else if (command === "/help") {
            handleHelpCommand();
        } else if (command === "/date") {
            handleDateCommand();
        } else if (command === "/echo") {
            handleEchoCommand(args, username);
        } else {
            handleGeneralInput(inputText, username);
        }

        event.target.value = ""; // Clear the input field
        inputUnderline.style.width = "0%"; // Reset underline width
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const loginContainer = document.getElementById("login-container");
    const loginInput = document.getElementById("login-input");
    const loginButton = document.getElementById("login-button");
    const terminal = document.getElementById("terminal");
    const userInputSpan = document.getElementById("user-input");
    const welcomeMessage = document.getElementById("welcome-message");

    const handleLogin = () => {
        const username = loginInput.value.trim();
        if (username) {
            // Save the username in localStorage
            localStorage.setItem("username", username);

            userInputSpan.textContent = `${username}@sda-net:~$`;
            welcomeMessage.textContent = `Welcome ${username}!`;
            loginContainer.style.display = "none";
            terminal.style.display = "block";
            inputField.addEventListener("input", (event) => {
                updateInputUnderline(event.target.value);
            });
            inputField.addEventListener("keypress", (event) => {
                handleKeyPress(event, username);
            });
        }
    };

    // Retrieve the saved username when the page loads
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
        loginInput.value = savedUsername;
        handleLogin();
    }

    loginButton.addEventListener("click", handleLogin);
    loginInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            handleLogin();
        }
    });
});

// Retrieve the saved output text when the page is reloaded
window.addEventListener("load", retrieveSavedOutputText);
