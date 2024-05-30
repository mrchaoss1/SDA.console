const inputField = document.getElementById("input");
const outputContainer = document.getElementById("output-container");
const inputUnderline = document.getElementById("input-underline");
const historyLoaded = document.getElementById("history-loaded");

inputField.addEventListener("input", (event) => {
  const inputText = event.target.value;
  const inputWidth = inputText.length * 10;
  inputUnderline.style.width = `${inputWidth}px`;
});

inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const inputText = event.target.value;
    const inputArr = inputText.trim().split(" ");
    const command = inputArr[0];

    if (command === "/clear") {
      outputContainer.innerHTML = "";
      localStorage.setItem("outputText", ""); // Update the saved output text
      historyLoaded.innerHTML = ""; // Clear the history loaded message
    } 
    if (command === "/help") {
      const outputHTML = `
        <div class="output-line">
          <span>user@hacknet:~$</span> Available commands:
        </div>
        <div class="output-line">
          <span>user@hacknet:~$</span> - clear: Clears the console output
        </div>
        <div class="output-line">
          <span>user@hacknet:~$</span> - help: Displays this help message
        </div>`;
      outputContainer.innerHTML += outputHTML;
    } else {
      const outputHTML = `<div class="output-line">>>> <span>user@hacknet:~$</span> ${inputText}</div>`;
      outputContainer.innerHTML += outputHTML;

      // Save the output text automatically
      const savedOutputText = localStorage.getItem("outputText") || "";
      localStorage.setItem("outputText", savedOutputText + outputHTML);
    }

    event.target.value = "";
    inputUnderline.style.width = "0%";
  }
});

// Retrieve the saved output text when the page is reloaded
window.addEventListener("load", () => {
    const savedOutputText = localStorage.getItem("outputText");
    if (savedOutputText) {
      outputContainer.innerHTML = savedOutputText;
      const outputHTML = `<div class="output-line history-loaded"><span>●</span> History Loaded!</div><p></p>`;
      outputContainer.innerHTML += outputHTML;
    }
});