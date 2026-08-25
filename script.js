const introScreen = document.getElementById("introScreen");
const mainSite = document.getElementById("mainSite");
const startButton = document.getElementById("startButton");

const music = document.getElementById("music");
const playButton = document.getElementById("playButton");
const playIcon = document.getElementById("playIcon");
const playText = document.getElementById("playText");

const mainPlayButton = document.getElementById("mainPlayButton");
const playerOverlay = document.getElementById("playerOverlay");

const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const backButton = document.getElementById("backButton");
const forwardButton = document.getElementById("forwardButton");

const scrollMemories = document.getElementById("scrollMemories");
const memoryCard = document.getElementById("memoryCard");

const backToBoxButton = document.getElementById("backToBoxButton");
const backToBoxText = document.getElementById("backToBoxText");


// ========================================
// TELA DE ABERTURA
// ========================================

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


// ========================================
// PLAYER
// ========================================

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const secondsPart = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${secondsPart}`;
}


function updatePlayer() {
    const isPlaying = !music.paused;

    playIcon.textContent = isPlaying ? "❚❚" : "▶";

    playText.textContent = isPlaying
        ? "Pausar"
        : "Ouvir";

    mainPlayButton.textContent = isPlaying
        ? "❚❚"
        : "▶";

    playerOverlay.textContent = isPlaying
        ? "❚❚"
        : "▶";
}


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


// Botão principal
playButton.addEventListener(
    "click",
    toggleMusic
);


// Botão central do player
mainPlayButton.addEventListener(
    "click",
    toggleMusic
);


// Overlay da capa
playerOverlay.addEventListener(
    "click",
    toggleMusic
);


// ========================================
// EVENTOS DO ÁUDIO
// ========================================

music.addEventListener(
    "play",
    updatePlayer
);


music.addEventListener(
    "pause",
    updatePlayer
);


music.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(music.duration);

    }
);


music.addEventListener(
    "ended",
    () => {

        updatePlayer();

        progressBar.value = 0;

        currentTime.textContent = "0:00";

    }
);


music.addEventListener(
    "timeupdate",
    () => {

        if (!music.duration) {
            return;
        }

        progressBar.value =
            (music.currentTime / music.duration) * 100;

        currentTime.textContent =
            formatTime(music.currentTime);

    }
);


// ========================================
// BARRA DE PROGRESSO
// ========================================

progressBar.addEventListener(
    "input",
    () => {

        if (!music.duration) {
            return;
        }

        music.currentTime =
            (progressBar.value / 100) *
            music.duration;

    }
);


// ========================================
// VOLTAR 10 SEGUNDOS
// ========================================

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


// ========================================
// AVANÇAR 10 SEGUNDOS
// ========================================

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


// ========================================
// IR PARA MEMÓRIAS
// ========================================

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


// ========================================
// PISTA FINAL
// ========================================

backToBoxButton.addEventListener(
    "click",
    () => {

        backToBoxText.textContent =
            "📦 Agora é com você.";

        backToBoxButton.style.pointerEvents =
            "none";

    }
);


// ========================================
// ANIMAÇÃO DOS CARDS
// ========================================

const cards =
    document.querySelectorAll(
        ".modern-card"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity =
                            "1";

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
            "opacity .6s ease, transform .6s ease";

        observer.observe(card);

    }
);


// ========================================
// INICIALIZAÇÃO
// ========================================

updatePlayer();
