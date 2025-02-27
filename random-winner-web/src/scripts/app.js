const fs = require('fs');

const winnerDisplay = document.getElementById('winner');
const selectWinnerButton = document.getElementById('select-winner');
const usernamesFilePath = './data/usernames.json';

function loadUsernames() {
    return new Promise((resolve, reject) => {
        fs.readFile(usernamesFilePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

function selectRandomWinner(usernames) {
    const randomIndex = Math.floor(Math.random() * usernames.length);
    return usernames[randomIndex];
}

function updateWinnerDisplay(winner) {
    winnerDisplay.textContent = `This week's winner is: ${winner}`;
}

selectWinnerButton.addEventListener('click', async () => {
    try {
        const usernames = await loadUsernames();
        const winner = selectRandomWinner(usernames);
        updateWinnerDisplay(winner);
    } catch (error) {
        console.error('Error loading usernames:', error);
    }
});