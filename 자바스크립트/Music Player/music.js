let play = document.getElementById("Play");
let previous = document.getElementById("Previous");
let next = document.getElementById("Next");

let audio = document.querySelector("audio");
let img = document.querySelector("img");
let title = document.getElementById("title");
let artist = document.getElementById("artist");
let songs = [
    {
        name: "Alone",
        title: "Alone",
        artist: "Alan Walker",
    },
    {
        name: "Sugar",
        title: "sugar & Brownies",
        artist: "Dharia",
    },
    {
        name: "Peaches",
        title: "Peaches",
        artist: "Justin Bieber",
    },
];
let isPlaying = false;

let playMusic = () => {
    isPlaying = true;
    audio.play();
    play.classList.replace('fa-play', 'fa-pause');
};

img.classList.add("anime");

let pauseMusic = () => {
    isPlaying = false;
    audio.pause();
    play.classList.replace('fa-pause', 'fa-play');
};

play.addEventListener("click", () => {
    if (!isPlaying) {
        playMusic();
    } else {
        pauseMusic();
    }
});

const loadSong = (song) => {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = "Music/" + song.name + ".mp3";
    img.src = "images/" + song.name + ".jpg";
};

let songIndex = 0;

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

next.addEventListener('click', nextSong);
previous.addEventListener('click', prevSong);

// Volume control
let volume_slider = document.querySelector('.volume_slider');

function setVolume() {
    audio.volume = volume_slider.value / 100;
}

volume_slider.addEventListener('input', setVolume);
