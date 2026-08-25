/* =========================================================
   ELEMENTOS
========================================================= */

const introScreen = document.getElementById("introScreen");
const mainSite = document.getElementById("mainSite");

const startButton = document.getElementById("startButton");

const music = document.getElementById("music");

const playButton = document.getElementById("playButton");
const playIcon = document.getElementById("playIcon");
const playText = document.getElementById("playText");

const mainPlayButton =
    document.getElementById("mainPlayButton");

const playerOverlay =
    document.getElementById("playerOverlay");

const progressBar =
    document.getElementById("progressBar");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const backButton =
    document.getElementById("backButton");

const forwardButton =
    document.getElementById("forwardButton");

const scrollMemories =
    document.getElementById("scrollMemories");

const memoryCard =
    document.getElementById("memoryCard");

const backToBoxButton =
    document.getElementById("backToBoxButton");


/* =========================================================
   TELA DE ABERTURA
========================================================= */

startButton.addEventListener("click", () => {

    introScreen.classList.add("hide");

    setTimeout(() => {

        mainSite.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 700);

});


/* =========================================================
   FORMATA TEMPO
========================================================= */

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;

}


/* =========================================================
   ATUALIZA PLAYER
========================================================= */

function updatePlayer() {

    const isPlaying =
        !music.paused;

    if (isPlaying) {

        playIcon.textContent = "❚❚";
        playText.textContent = "Pausar";

        mainPlayButton.textContent = "❚❚";
        playerOverlay.textContent = "❚❚";

    } else {

        playIcon.textContent = "▶";
        playText.textContent = "Ouvir";

        mainPlayButton.textContent = "▶";
        playerOverlay.textContent = "▶";

    }

}


/* =========================================================
   PLAY / PAUSE
========================================================= */

function toggleMusic() {

    if (music.paused) {

        music.play()
            .then(() => {
                updatePlayer();
            })
            .catch(() => {

                alert(
                    "Coloque o arquivo trevo-tu.mp3 dentro da pasta assets."
                );

            });

    } else {

        music.pause();

    }

    updatePlayer();

}


/* =========================================================
   BOTÕES DE PLAY
========================================================= */

playButton.addEventListener(
    "click",
    toggleMusic
);

mainPlayButton.addEventListener(
    "click",
    toggleMusic
);

playerOverlay.addEventListener(
    "click",
    toggleMusic
);


/* =========================================================
   EVENTOS DO ÁUDIO
========================================================= */

music.addEventListener(
    "play",
    updatePlayer
);

music.addEventListener(
    "pause",
    updatePlayer
);

music.addEventListener(
    "ended",
    () => {

        updatePlayer();

        progressBar.value = 0;

    }
);


/* =========================================================
   DURAÇÃO
========================================================= */

music.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(music.duration);

    }
);


/* =========================================================
   PROGRESSO
========================================================= */

music.addEventListener(
    "timeupdate",
    () => {

        if (!music.duration) {
            return;
        }

        const percentage =
            (music.currentTime / music.duration) * 100;

        progressBar.value = percentage;

        currentTime.textContent =
            formatTime(music.currentTime);

    }
);


/* =========================================================
   ARRASTAR PROGRESSO
========================================================= */

progressBar.addEventListener(
    "input",
    () => {

        if (!music.duration) {
            return;
        }

        const newTime =
            (progressBar.value / 100) *
            music.duration;

        music.currentTime = newTime;

    }
);


/* =========================================================
   VOLTAR 10 SEGUNDOS
========================================================= */

backButton.addEventListener(
    "click",
    () => {

        music.currentTime =
            Math.max(
                0,
                music.currentTime - 10
            );

    }
);


/* =========================================================
   AVANÇAR 10 SEGUNDOS
========================================================= */

forwardButton.addEventListener(
    "click",
    () => {

        music.currentTime =
            Math.min(
                music.duration || 0,
                music.currentTime + 10
            );

    }
);


/* =========================================================
   IR PARA MEMÓRIAS
========================================================= */

function goToMemories() {

    const memories =
        document.getElementById("memories");

    if (!memories) {
        return;
    }

    memories.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

scrollMemories.addEventListener(
    "click",
    goToMemories
);

memoryCard.addEventListener(
    "click",
    goToMemories
);


/* =========================================================
   BOTÃO VOLTE PARA A CAIXA
========================================================= */

backToBoxButton.addEventListener(
    "click",
    () => {

        /*
         * Não abre outra página.
         *
         * A intenção é que essa mensagem seja a pista
         * para ele voltar fisicamente para a caixa.
         */

        backToBoxButton.textContent =
            "📦 Agora é com você.";

        backToBoxButton.style.pointerEvents =
            "none";

    }
);


/* =========================================================
   EFEITO DE ENTRADA DOS CARDS
========================================================= */

const cards =
    document.querySelectorAll(".modern-card");

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


cards.forEach(
    (card) => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(18px)";

        card.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(card);

    }
);


/* =========================================================
   GARANTE ESTADO INICIAL
========================================================= */

updatePlayer();
