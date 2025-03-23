function showAddFlatForm() {
    document.getElementById("flat-form").style.display = "block";
}

function addFlat() {
    let location = document.getElementById("location").value;
    let rent = document.getElementById("rent").value;
    let facilities = document.getElementById("facilities").value;
    let flatmates = document.getElementById("flatmates").value;
    let contact = document.getElementById("contact").value;

    if (!location || !rent || !facilities || !flatmates || !contact) {
        alert("Please fill out all fields.");
        return;
    }
    if (!/^[0-9]{10}$/.test(contact)) {
        alert("Please enter a valid 10-digit contact number.");
        return;
    }

    let flatList = document.getElementById("flat-list");
    let availableFlats = document.getElementById("available-flats");

    let newFlat = document.createElement("div");
    newFlat.classList.add("flat-item");

    let flatId = Date.now(); // Unique ID for each flat
    newFlat.setAttribute("data-id", flatId);

    let flatDetails = `
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Rent:</strong> ₹${rent}</p>
        <p><strong>Facilities:</strong> ${facilities}</p>
        <p><strong>Current Flatmates:</strong> ${flatmates}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <button onclick="removeItem(${flatId})">Delete</button>
    `;

    newFlat.innerHTML = flatDetails;
    flatList.appendChild(newFlat);

    let availableFlat = newFlat.cloneNode(true);
    availableFlat.removeChild(availableFlat.querySelector("button")); // Remove the delete button
    availableFlat.setAttribute("data-id", flatId);
    availableFlats.appendChild(availableFlat);
}

function removeItem(flatId) {
    let flatList = document.getElementById("flat-list");
    let availableFlats = document.getElementById("available-flats");

    let flatToRemove = flatList.querySelector(`[data-id="${flatId}"]`);
    let availableFlatToRemove = availableFlats.querySelector(`[data-id="${flatId}"]`);

    if (flatToRemove) flatToRemove.remove();
    if (availableFlatToRemove) availableFlatToRemove.remove();
}
