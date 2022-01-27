import './style.css';

const leaderboard = document.querySelector('.leaderboard');
const leaderForm = document.querySelector('form');
const leaderName = leaderForm.querySelector('input');
const leaderScore = leaderForm.querySelector('input[type="number"]');

(() => {
  leaderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/r9KSUi2ShOFoDajryYTb/scores',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: leaderName.value,
          score: leaderScore.value,
        }),
      },
    );
    leaderForm.reset();
  });
})();

const refreshLeaderboard = async () => {
  const response = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/r9KSUi2ShOFoDajryYTb/scores',
  );
  const scoreText = await response.text();
  const score = JSON.parse(scoreText);
  score.result.forEach((player) => {
    leaderboard.innerHTML += `
        <li>${player.user}:<span> ${player.score}</span></li>`;
  });
};

document.getElementById('refresh').addEventListener('click', () => {
  leaderboard.innerHTML = '';
  refreshLeaderboard();
});

window.onload = refreshLeaderboard();