document.addEventListener("DOMContentLoaded", function () {
    let scoresBtn = document.getElementById("view-high-scores");

    if (scoresBtn) {
        scoresBtn.addEventListener("click", function () {
            printHighscores();
        });
    }

    // Rank previous scores in order by
    // Retrieving scores from localStorage
    function printHighscores() {
        try {
            let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
            highscores.sort(function (a, b) {
                return b.score - a.score;
            });
            let olEl = document.getElementById("highscores");
            olEl.innerHTML = "";
            highscores.forEach(function (score) {
                let liTag = document.createElement("li");
                liTag.textContent = score.name + " - " + score.score;
                olEl.appendChild(liTag);
            });
        } catch (error) {
            console.error("Error while printing high scores:", error);
        }
    }

    // Clear previous scores when users click clear
    function clearHighscores() {
        localStorage.removeItem("highscores");
        window.location.reload();
    }

    let clearBtn = document.getElementById("clear");
    if (clearBtn) {
        clearBtn.onclick = clearHighscores;
    }
});
