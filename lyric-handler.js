async function getSongData (jsonPath) {
    const data = await fetch(jsonPath);
    if (!data.ok) throw new Error(data.statusText);
    return chooseRandomSong(await data.json());
}

function chooseRandomSong (songData) {
    return songData.songs[Math.floor(Math.random() * songData.songs.length)];
}

function displayLyrics (songData) {
    console.log(songData.Lyrics);
    let lyrics = songData.Lyrics;
    let divs = []
    for (let i = 0; i < lyrics.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = lyrics[i];
        divs.push(div);
        document.getElementById("lyrics-container").appendChild(div);
    }
}

async function setupSong (jsonPath) {
    let song = await getSongData(jsonPath);
    displayLyrics(song);
}