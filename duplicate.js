// Show Group Creation Form
function showGroupForm() {
    document.getElementById("groupFormSection").classList.toggle("hidden");
}

// Add Member Dynamically
function addMember() {
    let membersContainer = document.getElementById("membersContainer");
    let memberIndex = membersContainer.children.length + 1;

    let memberDiv = document.createElement("div");
    memberDiv.classList.add("member-container");
    memberDiv.setAttribute("id", `member-${memberIndex}`);

    memberDiv.innerHTML = `
        <h4>Member ${memberIndex} Details</h4>
        <label>Name:</label>
        <input type="text" name="memberName" required>

        <label>Email:</label>
        <input type="email" name="memberEmail" required>

        <label>Phone No:</label>
        <input type="tel" name="memberPhone" required>

        <label>Branch Name:</label>
        <input type="text" name="memberBranch" required>

        <button type="button" class="remove-member" onclick="removeMember(${memberIndex})">❌ Remove</button>
    `;

    membersContainer.appendChild(memberDiv);
}

// Remove Member
function removeMember(index) {
    let memberDiv = document.getElementById(`member-${index}`);
    if (memberDiv) {
        memberDiv.remove();
    }
}

// Handle Form Submission
document.getElementById("groupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect Team Leader Details
    let leaderName = document.getElementById("leaderName").value;
    let leaderEmail = document.getElementById("leaderEmail").value;
    let leaderPhone = document.getElementById("leaderPhone").value;
    let leaderBranch = document.getElementById("leaderBranch").value;

    if (!leaderName || !leaderEmail || !leaderPhone || !leaderBranch) {
        alert("Please fill in all leader details.");
        return;
    }

    // Collect Team Members Details
    let members = [];
    document.querySelectorAll("#membersContainer .member-container").forEach(memberDiv => {
        let member = {
            name: memberDiv.querySelector('input[name="memberName"]').value,
            email: memberDiv.querySelector('input[name="memberEmail"]').value,
            phone: memberDiv.querySelector('input[name="memberPhone"]').value,
            branch: memberDiv.querySelector('input[name="memberBranch"]').value
        };

        if (!member.name || !member.email || !member.phone || !member.branch) {
            alert("Please fill in all member details.");
            return;
        }

        members.push(member);
    });

    // Show Confirmation
    alert(`Group Created Successfully!\nLeader: ${leaderName}\nMembers: ${members.length}`);
    
    // Reset Form
    this.reset();
    document.getElementById("membersContainer").innerHTML = "";
    document.getElementById("groupFormSection").classList.add("hidden");
});

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
    const responses = {
        "hello": "Hi there! How can I assist you today?",
        "how are you": "I'm good, thank you for asking!",
        "bye": "Goodbye! Have a great day!",
    };

    // Default response
    return responses[userInput.toLowerCase()] || "Sorry, I didn't understand that.";
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
