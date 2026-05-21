document.addEventListener("DOMContentLoaded", () => {
    const chatWidget = document.getElementById("chatWidget");
    const chatToggleBtn = document.getElementById("chatToggleBtn");
    const chatCloseBtn = document.getElementById("chatCloseBtn");
    const chatSendBtn = document.getElementById("chatSendBtn");
    const chatInputField = document.getElementById("chatInputField");
    const chatLogs = document.getElementById("chatLogs");

    // Open chatbot
    chatToggleBtn.addEventListener("click", () => {
        chatWidget.classList.add("active");
    });

    // Close chatbot explicitly through the target close button
    chatCloseBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Stops event bubbling up
        chatWidget.classList.remove("active");
    });

    // Send messages
    chatSendBtn.addEventListener("click", executeMessageCycle);
    chatInputField.addEventListener("keydown", (e) => {
        if (e.key === "Enter") executeMessageCycle();
    });

    function executeMessageCycle() {
        const rawText = chatInputField.value;
        const cleanInput = rawText.trim();

        if (cleanInput === "") return;

        appendMessageLog(cleanInput, "user");
        chatInputField.value = ""; 

        setTimeout(() => {
            const botResponse = generateAlgorithmicReply(cleanInput.toLowerCase());
            appendMessageLog(botResponse, "bot");
        }, 500);
    }

    function appendMessageLog(text, sender) {
        const msgNode = document.createElement("div");
        msgNode.classList.add("msg", sender);
        msgNode.textContent = text;
        chatLogs.appendChild(msgNode);
        chatLogs.scrollTop = chatLogs.scrollHeight;
    }

    function generateAlgorithmicReply(input) {
        if (input.includes("jute")) {
            return "Corchorus capsularis (Jute) is a 100% biodegradable natural fiber with ultra-high raw tensile load limits.";
        } else if (input.includes("plastic") || input.includes("pollution")) {
            return "Synthetic low-density containers create lasting ocean disruptions. Replacing them with jute alternatives stops the toxic dependency cycle.";
        } else if (input.includes("garden") || input.includes("botany") || input.includes("air")) {
            return "Indoor gardening introduces active biological filtering fields that reduce chemical focus hazards and balance spatial oxygen indices.";
        } else if (input.includes("hello") || input.includes("hi")) {
            return "Greetings operator! Type 'Jute', 'Plastic', or 'Gardening' to query core database project details.";
        } else {
            return "Input statement unmapped. Try querying fields like 'Jute' or 'Gardening' to match logical loops.";
        }
    }
});