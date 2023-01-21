const list = [
    {
        id: 0,
        author: "C.Tangana",
        title: "Me Maten",
        cover: "./assets/tangana_cover.png",
        duration: 12
    },
    {
        id: 1,
        author: "Rosalía",
        title: "Despechá",
        cover: "./assets/rosalia_cover.png",
        duration: 5
    },
    {
        id: 2,
        author: "Shakira",
        title: "Te felicito",
        cover: "./assets/shakira_cover.png",
        duration: 8
    },
    {
        id: 3,
        author: "Quevedo",
        title: "Quédate",
        cover: "./assets/quevedo_cover.png",
        duration: 12
    },
    {
        id: 4,
        author: "Bad Bunny",
        title: "Tití me preguntó",
        cover: "./assets/bad_cover.png",
        duration: 20
    }
];

//Selectores
let currentCover = document.querySelector('.player__cover_image');
let currentTitle = document.querySelector('.player__song');
let currentAuthor = document.querySelector('.player__author');
let currentTime = document.querySelector('.player__current');
let currentBar = document.querySelector('.player__progress');
let currentSongTotal = document.querySelector('.player__total');
let playButton = document.querySelector('.play');
let pauseButton = document.querySelector('.pause');
let shuffleButton = document.querySelector('.shuffle');
let repeatButton = document.querySelector('.repeat');
let buttons = document.querySelectorAll('.player__buttons');

let paused = false;
let shuffle = false;
let repeat = false;
let timeCounter = 0;
let currentId = 0
let currentSong = list[currentId];
let contador;

constructor();

for(let button of buttons) {
    button.addEventListener('click', function() {
        let buttonPressed = button.getAttribute('value');

        switch (buttonPressed) {
            case 'play':
                playSong();
                paused = false;
                playButton.style.display = 'none';
                pauseButton.style.display = 'block';
                break;

            case 'pause':
                playButton.style.display = 'block';
                pauseButton.style.display = 'none';
                paused = true;
                clearInterval(contador);
                break;
            
            case 'forward':
                nextSong();
                constructor();
                break;

            case 'backward':
                lastSong();
                constructor();
                break;
            
            case 'shuffle':
                if (!shuffle){
                    shuffle = true;
                    shuffleButton.style.color = 'green';
                } else {
                    shuffle = false;
                    shuffleButton.style.color = 'black';
                }
                break;

            case 'repeat':
                if (!repeat){
                    repeat = true;
                    repeatButton.style.color = 'green';
                } else {
                    repeat = false;
                    repeatButton.style.color = 'black';
                }
                break;
        }
    });
}

function playSong() {
    constructor();
    if(!paused){
        timeCounter = 0;
    }
    

    let currentTimeUpdate = () => {
        currentTime.innerHTML = "00:" + (timeCounter++ + 1);
        if(timeCounter === currentSong.duration){
            clearInterval(contador);
        }
        if (timeCounter === currentSong.duration){
            nextSong();
        }
    }
    contador = setInterval(currentTimeUpdate, 1000);
    
    let currentBarUpdate = () => {
        currentBar.style.width = (timeCounter * 100 / currentSong.duration) + "%";
    }
    const barra = setInterval(currentBarUpdate, 1000);
}

function nextSong() {
    clearInterval(contador);
    timeCounter = 0;

    if(!repeat) {
        if(shuffle){
            currentId = Math.floor(Math.random() * 5);
        } else {
            if(currentId < (list.length - 1)) {
                currentId++;
            } else {
                currentId = 0;
            }
        }
    }
    console.log(currentId);

    currentSong = list[currentId];
    if(!paused){
        playSong();
    } 
}

function lastSong() {
    clearInterval(contador);
    timeCounter = 0;

    if(currentId > 0) {
        currentId--;
    } else if (currentId === 0){
        currentId = list.length - 1;
    }
    currentSong = list[currentId];
    if(!paused){
        playSong();
    } 
}

function constructor() {
    if(!paused){
        currentBar.style.width = 0;
    }
    clearInterval(contador);
    currentTime.innerHTML = "00:00";
    currentSongTotal.innerHTML = "00:" + currentSong.duration;
    currentCover.setAttribute('src', currentSong.cover);
    currentTitle.innerHTML = currentSong.title;
    currentAuthor.innerHTML = currentSong.author;
}