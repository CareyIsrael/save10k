document.addEventListener('DOMContentLoaded', function() {
    const slotsContainer = document.getElementById('slotsContainer');
    const regenerateButton = document.getElementById('regenerate-button');
    const saveButton = document.getElementById('save-button');
    const usernameInput = document.getElementById('usernameInput');
    const welcomeMessage = document.getElementById('welcomeMessage');

    let slots = [];
    let username = '';

    function generateSlots() {
        slots = [];
        for (let i = 0; i < 400; i++) {
            const amount = generateRandomAmount();
            slots.push({ amount, completed: false });
        }
        displaySlots();
    }

    function generateRandomAmount() {
        const amounts = [5, 10, 20, 50, 100];
        return amounts[Math.floor(Math.random() * amounts.length)];
    }

    function displaySlots() {
        slotsContainer.innerHTML = '';
        slots.forEach((slot, index) => {
            const slotDiv = document.createElement('div');
            slotDiv.className = 'slot' + (slot.completed ? ' completed' : '');
            slotDiv.innerHTML = `
                <span>Slot ${index + 1}: $${slot.amount}</span>
                <button class="close-button">X</button>
            `;
            slotDiv.querySelector('.close-button').addEventListener('click', () => completeSlot(index));
            slotsContainer.appendChild(slotDiv);
        });
    }

    function completeSlot(index) {
        slots[index].completed = true;
        displaySlots();
    }

    function saveData() {
        localStorage.setItem(username, JSON.stringify(slots));
        alert('Data saved successfully!');
    }

    function loadData() {
        const savedSlots = JSON.parse(localStorage.getItem(username));
        if (savedSlots) {
            slots = savedSlots;
            displaySlots();
        } else {
            generateSlots();
        }
    }

    usernameInput.addEventListener('blur', function() {
        username = usernameInput.value;
        welcomeMessage.textContent = `Welcome, ${username}!`;
        loadData();
    });

    regenerateButton.addEventListener('click', generateSlots);
    saveButton.addEventListener('click', saveData);

    generateSlots();
});
