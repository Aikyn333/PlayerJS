let currentMusic = 0; 
const music = document.querySelector('#audio'); 
const seekBar = document.querySelector('.seek-bar'); 
const songName = document.querySelector('.music-name'); 
const artistName = document.querySelector('.artist-name'); 
const disk = document.querySelector('.disk'); 
const currentTimeDisplay = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration'); 
const playBtn = document.querySelector('.play-btn'); 
const forwardBtn = document.querySelector('.forward-btn'); 
const backwardBtn = document.querySelector('.backward-btn');

playBtn.addEventListener('click', () => {
    if (playBtn.classList.contains('pause')) {
        music.play();
    } else {
        music.pause();
    }
    playBtn.classList.toggle('pause'); 
    disk.classList.toggle('play'); 
});

const setMusic = (i) => {
    seekBar.value = 0; 
    let song = songs[i]; 
    currentMusic = i;
    music.src = song.path;
    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTimeDisplay.innerHTML = '00:00'; // Сброс
    setTimeout(() => {
        seekBar.max = music.duration; 
        musicDuration.innerHTML = formatTime(music.duration); 
    }, 300);
}

// Инициализация первого трека
setMusic(0);

// time
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}

setInterval(() => {
    seekBar.value = music.currentTime;
    currentTimeDisplay.innerHTML = formatTime(music.currentTime);
    //max= kelesi
    if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
        forwardBtn.click();
    }
}, 500);

//sek zhlzhty
seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
});

// playMusic
const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
}

//kelesi 
forwardBtn.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
});

backwardBtn.addEventListener('click', () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
});
