let theSong = 0;

class Song{
    constructor(json, elements){
        this.title = json.title;
        this.artist = json.artist;
        this.lyrics = json.lyrics;
        this.elements = elements;
        this.guesses = [];
        this.plainlyrics = json.lyrics;
        for(let i = 0; i < json.lyrics.length; i++){
            this.plainlyrics[i] = this.plainlyrics[i].toLowerCase();
            this.plainlyrics[i] = this.plainlyrics[i].replace(/[.,\/#!$%^&*';:{}=\-_`~()]/g, '');
        }
    }
    checkGuess(guess){
        guess = guess.toLowerCase().replace(/[.,\/#!$%^&*';:{}=\-_`~()]/g, '');
        let result = this.plainlyrics.includes(guess);
        if(result && !this.guesses.includes(guess)){
            this.guesses.push(guess);
            document.getElementById('guess-box').value = '';
            let indices = [];
            for(let i = 0; i < this.plainlyrics.length; i++){
                if (this.plainlyrics[i] === guess){
                    indices.push(i);
                }
            }
            for (let i = 0; i < indices.length; i++){
                this.elements[indices[i]].style.color = 'white';
                if (i + 1 === indices.length){
                    this.elements[indices[i]].scrollIntoView({behavior: 'smooth'});
                }
            }
        }
    }
}

async function getSongData (jsonPath) {
    const data = await fetch(jsonPath);
    if (!data.ok) throw new Error(data.statusText);
    return chooseRandomSong(await data.json());
}

function chooseRandomSong (songData) {
    return songData.songs[Math.floor(Math.random() * songData.songs.length)];
}

function displayLyrics (songData) {
    let lyrics = songData.lyrics;
    let divs = []
    for (let i = 0; i < lyrics.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = lyrics[i];
        div.classList.add('lyric');
        if(i%2 === 0){
            div.classList.add('even');
        }else{
            div.classList.add('odd');
        }
        divs.push(div);
        document.getElementById("lyrics-container").appendChild(div);
    }
    return divs;
}

async function setupSong (jsonPath) {
    let song = await getSongData(jsonPath);
    let divs = displayLyrics(song);
    theSong = new Song(song, divs);
}

function updateGuess(){
    let guess = document.getElementById("guess-box").value;
    theSong.checkGuess(guess);
}