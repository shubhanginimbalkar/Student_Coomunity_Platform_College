let groups = [];

function showGroupForm(action) {
    document.getElementById("groupListSection").classList.add("hidden");
    document.getElementById("groupFormSection").classList.remove("hidden");

    if (action === "create") {
        document.getElementById("formTitle").innerText = "Create Group";
        document.getElementById("formSubmit").innerText = "Create Group";
        document.getElementById("groupForm").reset();
        document.getElementById("membersContainer").innerHTML = ""; // Clear previous members
        document.getElementById("formSubmit").onclick = createGroup;
    } else if (action === "update") {
        document.getElementById("formTitle").innerText = "Update Group";
        document.getElementById("formSubmit").innerText = "Update Group";
        loadGroupsIntoDropdown();
    }
}

// Add Member Functionality
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

// Create Group
function createGroup(event) {
    event.preventDefault();

    let leaderName = document.getElementById("leaderName").value;
    let leaderEmail = document.getElementById("leaderEmail").value;
    let leaderPhone = document.getElementById("leaderPhone").value;
    let leaderBranch = document.getElementById("leaderBranch").value;

    let members = [];
    document.querySelectorAll("#membersContainer .member-container").forEach(memberDiv => {
        let member = {
            name: memberDiv.querySelector('input[name="memberName"]').value,
            email: memberDiv.querySelector('input[name="memberEmail"]').value,
            phone: memberDiv.querySelector('input[name="memberPhone"]').value,
            branch: memberDiv.querySelector('input[name="memberBranch"]').value
        };
        members.push(member);
    });

    let group = { leaderName, leaderEmail, leaderPhone, leaderBranch, members };
    groups.push(group);

    alert("Group Created Successfully!");
    document.getElementById("groupForm").reset();
    document.getElementById("membersContainer").innerHTML = "";
}

// Show Groups for View & Delete
function showGroups(action) {
    let groupList = document.getElementById("groupList");
    groupList.innerHTML = "";

    groups.forEach((group, index) => {
        let li = document.createElement("li");
        li.classList.add("group-item");
        li.innerHTML = `
            <strong>${group.leaderName}</strong> (${group.leaderBranch})
            ${action === "delete" ? `<button onclick="deleteGroup(${index})">🗑 Delete</button>` : ""}
            ${action === "view" ? `<button onclick="viewGroup(${index})">👁 View</button>` : ""}
        `;
        groupList.appendChild(li);
    });

    document.getElementById("groupListSection").classList.remove("hidden");
    document.getElementById("groupFormSection").classList.add("hidden");
}

// View Group Details
function viewGroup(index) {
    let group = groups[index];

    let membersHTML = group.members.map(member => `
        <li>${member.name} - ${member.email} (${member.branch})</li>
    `).join("");

    alert(`Group Leader: ${group.leaderName}
Email: ${group.leaderEmail}
Phone: ${group.leaderPhone}
Branch: ${group.leaderBranch}
Members: 
${membersHTML}`);
}

// Delete Group
function deleteGroup(index) {
    groups.splice(index, 1);
    showGroups("delete");
    alert("Group Deleted Successfully!");
}

// Load Groups for Update
function loadGroupsIntoDropdown() {
    let groupList = document.getElementById("groupList");
    groupList.innerHTML = "";

    groups.forEach((group, index) => {
        let li = document.createElement("li");
        li.classList.add("group-item");
        li.innerHTML = `
            <strong>${group.leaderName}</strong> (${group.leaderBranch})
            <button onclick="editGroup(${index})">✏ Edit</button>
        `;
        groupList.appendChild(li);
    });

    document.getElementById("groupListSection").classList.remove("hidden");
}

// Edit Group
function editGroup(index) {
    let group = groups[index];

    document.getElementById("leaderName").value = group.leaderName;
    document.getElementById("leaderEmail").value = group.leaderEmail;
    document.getElementById("leaderPhone").value = group.leaderPhone;
    document.getElementById("leaderBranch").value = group.leaderBranch;

    document.getElementById("membersContainer").innerHTML = "";
    group.members.forEach((member, i) => {
        addMember();
        document.querySelectorAll("#membersContainer .member-container")[i].querySelector('input[name="memberName"]').value = member.name;
        document.querySelectorAll("#membersContainer .member-container")[i].querySelector('input[name="memberEmail"]').value = member.email;
        document.querySelectorAll("#membersContainer .member-container")[i].querySelector('input[name="memberPhone"]').value = member.phone;
        document.querySelectorAll("#membersContainer .member-container")[i].querySelector('input[name="memberBranch"]').value = member.branch;
    });

    document.getElementById("formTitle").innerText = "Update Group";
    document.getElementById("formSubmit").innerText = "Update Group";
    document.getElementById("formSubmit").onclick = function (event) {
        event.preventDefault();
        groups[index] = {
            leaderName: document.getElementById("leaderName").value,
            leaderEmail: document.getElementById("leaderEmail").value,
            leaderPhone: document.getElementById("leaderPhone").value,
            leaderBranch: document.getElementById("leaderBranch").value,
            members: []
        };

        document.querySelectorAll("#membersContainer .member-container").forEach(memberDiv => {
            let member = {
                name: memberDiv.querySelector('input[name="memberName"]').value,
                email: memberDiv.querySelector('input[name="memberEmail"]').value,
                phone: memberDiv.querySelector('input[name="memberPhone"]').value,
                branch: memberDiv.querySelector('input[name="memberBranch"]').value
            };
            groups[index].members.push(member);
        });

        alert("Group Updated Successfully!");
    };

    document.getElementById("groupFormSection").classList.remove("hidden");
}

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
