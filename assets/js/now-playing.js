
function updateSongInfo(recentTrack) {
    let cleanedTitle = recentTrack.name.replace(/\(.*?\)/g, '').replace(/ -.*$/g, '').trim();

  document.getElementById("playing").innerHTML = `
    <h3>${recentTrack ? "Now playing" : "Last track played"}</h3>
    <a href="${recentTrack.url}">
    ${recentTrack.artist["#text"]} - ${cleanedTitle}
    </a>`;
}

function checkListening() {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${last_fm_user}&api_key=${last_fm_api_key}&format=json&limit=1`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const recentTrack = data.recenttracks.track[0];
      updateSongInfo(recentTrack);
    });
}

checkListening();
setInterval(checkListening, 5 * 1000);
