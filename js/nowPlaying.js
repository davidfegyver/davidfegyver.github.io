const playinge = document.getElementById("playing");
const artiste = document.getElementById("artist");
const tracke = document.getElementById("track");
const urle = document.getElementById("url");

const lastfmData = {
  baseURL:
    "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=",
  user: "davidfegyver",
  api_key: "6c60864eaab9bc3875fa75cf5b24a8e6",
};

function checkListening() {
  fetch(
    `${lastfmData.baseURL}${lastfmData.user}&api_key=${lastfmData.api_key}&format=json&limit=1`
  )
    .then((response) => response.json())
    .then((resp) => {
      playinge.innerText =
        resp.recenttracks.track.length == 1
          ? "Last listened song on Spotify:"
          : "I am listening on Spotify to";
      const recentTrack = resp.recenttracks.track[0];
      artiste.innerText = recentTrack.artist["#text"];
      tracke.innerText = recentTrack.name;

      urle.href = recentTrack.url;
    });
}

checkListening();
setInterval(checkListening, 5 * 1000);
