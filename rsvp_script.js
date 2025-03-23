// File: script.js

// Initialize data storage
let events = JSON.parse(localStorage.getItem('events')) || [
    {
        id: 1,
        title: "Annual Tech Symposium",
        date: "2025-02-15",
        time: "10:00",
        location: "Main Auditorium",
        participants: 45,
        capacity: 100,
        description: "Join us for a day of tech talks and workshops.",
        status: "upcoming",
        rsvps: []
    },
    {
        id: 2,
        title: "Cultural Festival",
        date: "2025-02-20",
        time: "17:00",
        location: "College Ground",
        participants: 120,
        capacity: 200,
        description: "Annual cultural celebration with music and dance performances.",
        status: "open",
        rsvps: []
    }
];

// Store current user (for demo purposes)
const currentUser = { id: 1, name: "Test User" };

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showSection('viewEvents'); // Show default section
    renderAllSections();
    setupEventListeners();
});

// Render all sections
function renderAllSections() {
    renderEvents();
    renderManageEvents();
    renderUpcomingEvents();
    renderMyRSVPs();
}

// Navigation Functions
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle('active');
}

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Create Event Card
function createEventCard(event, isRSVPSection = false) {
    const hasRSVPd = event.rsvps.includes(currentUser.id);
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
        <div class="event-header">
            <h2>${event.title}</h2>
        </div>
        <div class="event-content">
            <div class="event-info">
                <div>
                    <i class="fas fa-calendar"></i>
                    <span>${formatDate(event.date)}</span>
                </div>
                <div>
                    <i class="fas fa-clock"></i>
                    <span>${formatTime(event.time)}</span>
                </div>
                <div>
                    <i class="fas fa-location-dot"></i>
                    <span>${event.location}</span>
                </div>
                <div>
                    <i class="fas fa-users"></i>
                    <span>${event.participants}/${event.capacity} Participants</span>
                </div>
            </div>
            <p class="event-description">${event.description}</p>
            <div class="event-actions">
                <button class="btn ${hasRSVPd ? 'secondary' : 'primary'}" onclick="handleRSVP(${event.id})">
                    <i class="fas ${hasRSVPd ? 'fa-times-circle' : 'fa-check-circle'}"></i>
                    ${hasRSVPd ? 'Cancel RSVP' : 'RSVP'}
                </button>
                ${isRSVPSection ? '' : `
                    <button class="btn secondary" onclick="handleReminder(${event.id})">
                        <i class="fas fa-bell"></i> Set Reminder
                    </button>
                `}
            </div>
        </div>
    `;
    return card;
}

// Render Functions
function renderEvents() {
    const container = document.getElementById('eventsContainer');
    if (!container) return;
    container.innerHTML = '';
    events.forEach(event => {
        container.appendChild(createEventCard(event));
    });
}

function renderManageEvents() {
    const container = document.getElementById('manageEventsContainer');
    if (!container) return;
    container.innerHTML = events.map(event => `
        <div class="manage-event-row">
            <h3>${event.title}</h3>
            <div class="event-info">
                <span>${formatDate(event.date)} at ${formatTime(event.time)}</span>
                <span>${event.participants}/${event.capacity} participants</span>
            </div>
            <div class="action-buttons">
                <button class="btn secondary" onclick="editEvent(${event.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn primary" onclick="deleteEvent(${event.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function renderUpcomingEvents() {
    const container = document.getElementById('upcomingEventsContainer');
    if (!container) return;
    container.innerHTML = '';
    const today = new Date();
    const upcomingEvents = events.filter(event => new Date(event.date) > today);
    upcomingEvents.forEach(event => {
        container.appendChild(createEventCard(event));
    });
}

function renderMyRSVPs() {
    const container = document.getElementById('myRSVPsContainer');
    if (!container) return;
    container.innerHTML = '';
    const myEvents = events.filter(event => event.rsvps.includes(currentUser.id));
    myEvents.forEach(event => {
        container.appendChild(createEventCard(event, true));
    });
}

// Event Handlers
function handleCreateEvent(e) {
    e.preventDefault();
    
    const newEvent = {
        id: Date.now(), // Unique ID based on timestamp
        title: document.getElementById('eventTitle').value,
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        location: document.getElementById('eventLocation').value,
        capacity: parseInt(document.getElementById('eventCapacity').value),
        description: document.getElementById('eventDescription').value,
        participants: 0,
        status: 'upcoming',
        rsvps: []
    };

    events.push(newEvent);
    saveEvents();
    document.getElementById('createEventForm').reset();
    closeModal();
    renderAllSections();
}

function handleRSVP(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    const userIndex = event.rsvps.indexOf(currentUser.id);
    if (userIndex === -1) {
        // Add RSVP
        if (event.participants < event.capacity) {
            event.rsvps.push(currentUser.id);
            event.participants++;
            alert('RSVP successful! You will receive a confirmation email shortly.');
        } else {
            alert('Sorry, this event is already at full capacity!');
            return;
        }
    } else {
        // Cancel RSVP
        event.rsvps.splice(userIndex, 1);
        event.participants--;
        alert('Your RSVP has been cancelled.');
    }

    saveEvents();
    renderAllSections();
}

function deleteEvent(eventId) {
    if (confirm('Are you sure you want to delete this event?')) {
        events = events.filter(event => event.id !== eventId);
        saveEvents();
        renderAllSections();
    }
}

function editEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    if (event) {
        // Populate form with event data
        document.getElementById('eventTitle').value = event.title;
        document.getElementById('eventDate').value = event.date;
        document.getElementById('eventTime').value = event.time;
        document.getElementById('eventLocation').value = event.location;
        document.getElementById('eventCapacity').value = event.capacity;
        document.getElementById('eventDescription').value = event.description;
        
        // Show modal
        showCreateEventModal();
        
        // Remove old event and add updated one on form submit
        const form = document.getElementById('createEventForm');
        form.onsubmit = (e) => {
            e.preventDefault();
            events = events.filter(e => e.id !== eventId);
            handleCreateEvent(e);
        };
    }
}

// Storage Functions
function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

// Utility Functions
function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(timeStr) {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Modal Functions
function showCreateEventModal() {
    document.getElementById('createEventModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('createEventModal').style.display = 'none';
    document.getElementById('createEventForm').reset();
}

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('createEventForm').addEventListener('submit', handleCreateEvent);
    
    window.onclick = function(event) {
        if (event.target === document.getElementById('createEventModal')) {
            closeModal();
        }
    };
}

// Update the renderManageEvents function
function renderManageEvents() {
    const container = document.getElementById('manageEventsContainer');
    if (!container) {
        // Create the container if it doesn't exist
        const tableContainer = document.querySelector('.events-table-container');
        const newContainer = document.createElement('div');
        newContainer.id = 'manageEventsContainer';
        tableContainer.appendChild(newContainer);
    }
    
    // Get the tbody element
    const tbody = document.querySelector('#manageEventsTable tbody');
    if (!tbody) return;
    
    // Clear existing content
    tbody.innerHTML = '';
    
    // Add each event as a table row
    events.forEach(event => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${event.title}</td>
            <td>${formatDate(event.date)}</td>
            <td>${event.location}</td>
            <td>${event.participants}/${event.capacity}</td>
            <td>
                <button class="btn secondary" onclick="editEvent(${event.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn primary" onclick="deleteEvent(${event.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}