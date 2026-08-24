// =========================
// ViniFlix Player
// =========================

const audio =
    document.getElementById("audio");

const playPauseButton =
    document.getElementById("playPause");

const heroPlay =
    document.getElementById("heroPlay");

const progress =
    document.getElementById("progress");

const volume =
    document.getElementById("volume");

const volumeIcon =
    document.getElementById("volumeIcon");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");


// =========================
// FORMATAR TEMPO
// =========================

function formatTime(seconds) {

    if (
        !Number.isFinite(seconds) ||
        seconds < 0
    ) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return (
        `${minutes}:` +
        `${remainingSeconds
            .toString()
            .padStart(2, "0")}`
    );
}


// =========================
// PLAY / PAUSE
// =========================

function togglePlay() {

    if (audio.paused) {

        audio.play().catch(() => {
            console.log(
                "O navegador bloqueou a reprodução automática."
            );
        });

    } else {

        audio.pause();

    }

}


// =========================
// ATUALIZAR INTERFACE
// =========================

function updatePlayButton() {

    if (audio.paused) {

        playPauseButton.textContent = "▶";

        heroPlay.textContent =
            "▶ Ouvir";

    } else {

        playPauseButton.textContent = "⏸";

        heroPlay.textContent =
            "⏸ Pausar";

    }

}


// =========================
// PLAY / PAUSE
// =========================

playPauseButton.addEventListener(
    "click",
    togglePlay
);


heroPlay.addEventListener(
    "click",
    togglePlay
);


audio.addEventListener(
    "play",
    updatePlayButton
);


audio.addEventListener(
    "pause",
    updatePlayButton
);


// =========================
// DURAÇÃO DA MÚSICA
// =========================

audio.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(audio.duration);

    }
);


// =========================
// ATUALIZAR PROGRESSO
// =========================

audio.addEventListener(
    "timeupdate",
    () => {

        currentTime.textContent =
            formatTime(audio.currentTime);

        if (audio.duration > 0) {

            const percentage =
                (
                    audio.currentTime /
                    audio.duration
                ) * 100;

            progress.value =
                percentage;

        }

    }
);


// =========================
// ARRASTAR PROGRESSO
// =========================

progress.addEventListener(
    "input",
    () => {

        if (!audio.duration) {
            return;
        }

        audio.currentTime =
            (
                Number(progress.value) /
                100
            ) * audio.duration;

    }
);


// =========================
// VOLUME
// =========================

volume.addEventListener(
    "input",
    () => {

        const value =
            Number(volume.value);

        audio.volume = value;

        if (value === 0) {

            volumeIcon.textContent =
                "🔇";

        } else if (value < 0.5) {

            volumeIcon.textContent =
                "🔉";

        } else {

            volumeIcon.textContent =
                "🔊";

        }

    }
);


// =========================
// TECLADO
// =========================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.code === "Space" &&
            event.target.tagName !== "INPUT" &&
            event.target.tagName !== "BUTTON"
        ) {

            event.preventDefault();

            togglePlay();

        }

    }
);


// =========================
// BOTÕES ANTERIOR / PRÓXIMO
// =========================

document
    .getElementById("previous")
    .addEventListener(
        "click",
        () => {

            audio.currentTime = 0;

        }
    );


document
    .getElementById("next")
    .addEventListener(
        "click",
        () => {

            audio.currentTime = 0;

            if (!audio.paused) {
                audio.play();
            }

        }
    );


// =========================
// INICIALIZAÇÃO
// =========================

audio.volume = 1;

progress.value = 0;

updatePlayButton();
