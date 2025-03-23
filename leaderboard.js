document.addEventListener("DOMContentLoaded", function () {
    const teams = [
        { name: "Team Alpha", leader: "Alice Johnson", members: ["Michael Smith", "Sarah Brown", "David Wilson", "Emma Thompson"] },
        { name: "Team Beta", leader: "Robert Williams", members: ["Jessica Taylor", "Daniel Martinez", "Olivia Garcia"] },
        { name: "Team Gamma", leader: "Emily Clark", members: ["James Anderson", "Lisa White", "Henry Adams", "Ava Scott"] },
        { name: "Team Delta", leader: "William Harris", members: ["Chloe Lewis", "Benjamin Hall", "Isabella Young"] },
        { name: "Team Epsilon", leader: "Sophia Walker", members: ["Ethan King", "Mia Wright", "Lucas Allen", "Charlotte Lopez"] },
        { name: "Team Zeta", leader: "Daniel Moore", members: ["Emily Carter", "Ryan Hill", "Madison Green"] },
        { name: "Team Theta", leader: "Kevin Baker", members: ["Olivia Harris", "Matthew Nelson", "Hannah White", "Jack Robinson"] },
        { name: "Team Omega", leader: "Jessica Adams", members: ["Samuel Scott", "Grace Thomas", "Liam Walker", "Sophia Martin"] }
    ];

    const teamContainer = document.getElementById("team-container");

    teams.forEach((team, index) => {
        const teamDiv = document.createElement("div");
        teamDiv.classList.add("team");
        teamDiv.innerHTML = `
            <h2>🏆 ${team.name}</h2>
            <p class="team-leader" onclick="toggleMembers(${index})">👤 Team Leader: <span>${team.leader}</span></p>
            <ul id="team-${index}" class="team-members">
                ${team.members.map(member => `<li>👥 ${member}</li>`).join('')}
            </ul>
        `;
        teamContainer.appendChild(teamDiv);
    });
});

function toggleMembers(teamIndex) {
    let selectedTeam = document.getElementById(`team-${teamIndex}`);

    // Hide other teams
    document.querySelectorAll('.team-members').forEach(team => {
        if (team !== selectedTeam) {
            team.classList.remove("show-members");
        }
    });

    // Toggle selected team
    selectedTeam.classList.toggle("show-members");
}
