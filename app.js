const fs = require('fs');

document.addEventListener('DOMContentLoaded', () => {
    const usernameForm = document.getElementById('usernameForm');
    const usernameInput = document.getElementById('usernameInput');
    const selectWinnerButton = document.getElementById('selectWinnerButton');
    const winnerDisplay = document.getElementById('winnerDisplay');
    const countdown = document.getElementById('countdown');
    const adminPasswordValue = 'bajs'; // Admin password

    let usernames = [];
    let isAdmin = false;

    usernameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        if (username) {
            usernames.push(username);
            usernameInput.value = '';
            alert('Användarnamn tillagt!');
        }
    });

    selectWinnerButton.addEventListener('click', () => {
        if (isAdmin) {
            if (usernames.length > 0) {
                const randomIndex = Math.floor(Math.random() * usernames.length);
                const winner = usernames[randomIndex];
                winnerDisplay.textContent = `Vinnare: ${winner}`;
                usernames = []; // Clear usernames after selecting a winner
            } else {
                alert('Inga användarnamn tillagda!');
            }
        } else {
            alert('Du måste vara admin för att välja en vinnare!');
        }
    });

    // Countdown timer logic
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + (7 - nextWeek.getDay())); // Set to next Sunday
    nextWeek.setHours(0, 0, 0, 0); // Set to midnight

    function updateCountdown() {
        const now = new Date();
        const timeLeft = nextWeek - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdown.textContent = `Tid kvar till nästa vecka: ${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            countdown.textContent = 'Tiden är ute!';
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Admin password prompt
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'm') {
            const password = prompt('Ange adminlösenord:');
            if (password === adminPasswordValue) {
                isAdmin = true;
                alert('Adminläge aktiverat!');
            } else {
                alert('Fel lösenord!');
            }
        }
    });
});