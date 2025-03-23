// Toggle chat visibility
function toggleChat() {
    const chatContainer = document.getElementById("chat-container");
    const chatWidget = document.getElementById("chat-widget");
    chatContainer.style.display = (chatContainer.style.display === "none" || chatContainer.style.display === "") ? "flex" : "none";
    chatWidget.style.position = "fixed"; // Ensure the chat widget remains in place when toggling visibility
}

// Send a message to the chat
function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    let chatBox = document.getElementById("chat-box");

    // User message
    let userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.textContent = "You: " + userInput;
    chatBox.appendChild(userMessage);

    // Bot message
    let botMessage = document.createElement("div");
    botMessage.classList.add("bot-message");
    botMessage.textContent = "Bot: " + getBotResponse(userInput);
    chatBox.appendChild(botMessage);

    // Scroll chat to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input field
    document.getElementById("user-input").value = "";
}

// Bot response logic
function getBotResponse(userInput) {
    // Convert user input to lowercase and trim spaces
    userInput = userInput.toLowerCase().trim();

    const responses = {
        "hello": "Hi there! How can I assist you today?",
        "how are you": "I'm good, thank you for asking!",
        "bye": "Goodbye! Have a great day!",

        // Community Platform-Related Responses
        "what is this platform": "This is a community platform for college students to find hackathon groups, flatmates, and join events.",
        "how can i join a group": "You can browse available groups and send a request to join or create your own group.",
        "how do i create an event": "Go to the events section and click on 'Create Event'. Fill in the details and invite participants!",
        "how can i find a flatmate": "Use the 'Find Flatmates' feature to browse listings or create your own post with your preferences.",
        "how do i chat with my group": "You can use the built-in chat feature in your group to communicate with members.",
        "can i edit my event details": "Yes, you can edit your event details from the 'My Events' section.",
        "how can i invite people to my event": "You can share the event link or invite users directly through the platform.",
        "is there a notification system": "Yes! You will receive reminders for upcoming events and important updates.",

        // AI-Driven Enhancements
        "how does ai help in this platform": "AI helps by recommending groups, suggesting events, and assisting in matchmaking for flatmates based on your preferences.",
        "can the bot recommend groups for me": "Yes! Based on your interests, I can suggest the best groups for you.",
        "how does the platform suggest flatmates": "The system uses AI to match you with potential flatmates based on common interests and location preferences.",

        // Event Management Features
        "how can i manage rsvps for my event": "You can see RSVP lists in the event management section and track attendance.",
        "how do i collect feedback for my event": "After an event, you can send a feedback form to participants.",
        "can i cancel an event": "Yes, event organizers can cancel events from the 'My Events' dashboard.",

        // Miscellaneous
        "is this platform free": "Yes! Our platform is completely free for students.",
        "who can use this platform": "Any college student looking to collaborate, join hackathons, find flatmates, or participate in events!",
        "how do i report a problem": "You can contact our support team or report an issue through the 'Help & Support' section."
    };

    // Return response if found, else return default message
    return responses[userInput] || "Sorry, I didn't understand that. Try asking something about community groups, events, or flatmates!";
}



// Minimize chat widget
function minimizeChat(event) {
    event.stopPropagation(); // Prevent triggering the toggleChat function
    const chatContainer = document.getElementById("chat-container");
    const chatWidget = document.getElementById("chat-widget");

    chatContainer.style.display = "none";
    chatWidget.innerHTML = '<div class="minimized" onclick="restoreChat()"><span>+</span></div>';
}

// Restore chat widget
function restoreChat() {
    const chatWidget = document.getElementById("chat-widget");
    chatWidget.innerHTML = `
        <div class="chat-header" onclick="toggleChat()">
            <img src="avatar.png" alt="Bot Avatar" class="chat-avatar">
            <span>Chat with us</span>
            <button class="minimize-btn" onclick="minimizeChat(event)">-</button>
        </div>
        <div class="chat-container" id="chat-container" style="display: flex;">
            <div class="chat-box" id="chat-box"></div>
            <input type="text" id="user-input" class="chat-input" placeholder="Type a message...">
            <button onclick="sendMessage()" class="send-btn">Send</button>
        </div>
    `;
}
