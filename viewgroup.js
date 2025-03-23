document.getElementById("groupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let leaderName = document.getElementById("leaderName").value;
    let leaderEmail = document.getElementById("leaderEmail").value;
    let leaderPhone = document.getElementById("leaderPhone").value;
    let leaderBranch = document.getElementById("leaderBranch").value;

    let members = [];
    document.querySelectorAll(".member").forEach(member => {
        members.push({
            name: member.querySelector(".memberName").value,
            email: member.querySelector(".memberEmail").value,
            phone: member.querySelector(".memberPhone").value,
            branch: member.querySelector(".memberBranch").value
        });
    });

    let group = { leaderName, leaderEmail, leaderPhone, leaderBranch, members };
    saveGroup(group);
    alert("Group Created Successfully!");
    document.getElementById("groupForm").reset();
    hideGroupForm();
});

function saveGroup(group) {
    let groups = JSON.parse(localStorage.getItem("groups")) || [];
    groups.push(group);
    localStorage.setItem("groups", JSON.stringify(groups));
}

function showGroupForm() {
    document.getElementById("groupFormSection").classList.remove("hidden");
    document.getElementById("viewGroupsSection").classList.add("hidden");
}

function hideGroupForm() {
    document.getElementById("groupFormSection").classList.add("hidden");
}

function addMember() {
    let membersContainer = document.getElementById("membersContainer");
    let memberDiv = document.createElement("div");
    memberDiv.classList.add("member");

    memberDiv.innerHTML = `
        <label>Member Name:</label>
        <input type="text" class="memberName" required>

        <label>Member Email:</label>
        <input type="email" class="memberEmail" required>

        <label>Member Phone No:</label>
        <input type="tel" class="memberPhone" required>

        <label>Branch:</label>
        <input type="text" class="memberBranch" required>

        <button type="button" onclick="removeMember(this)">❌ Remove</button>
    `;
    membersContainer.appendChild(memberDiv);
}

function removeMember(button) {
    button.parentElement.remove();
}

function showViewGroups() {
    document.getElementById("viewGroupsSection").classList.remove("hidden");
    document.getElementById("groupFormSection").classList.add("hidden");

    let groups = JSON.parse(localStorage.getItem("groups")) || [];
    let groupsList = document.getElementById("groupsList");
    groupsList.innerHTML = "";

    groups.forEach((group, index) => {
        let groupDiv = document.createElement("div");
        groupDiv.innerHTML = `
            <h3>Group ${index + 1}</h3>
            <p><strong>Leader:</strong> ${group.leaderName} (${group.leaderBranch})</p>
            <p><strong>Email:</strong> ${group.leaderEmail}, <strong>Phone:</strong> ${group.leaderPhone}</p>
            <h4>Members:</h4>
            <ul>
                ${group.members.map(member => `<li>${member.name} (${member.branch}) - ${member.email}</li>`).join("")}
            </ul>
            <hr>
        `;
        groupsList.appendChild(groupDiv);
    });
}
