document.getElementById("send").onclick = (e) => {
  const message = document.getElementById("message").value;
  const email = document.getElementById("email").value;
  //Please don't hack me :)

  fetch(
    atob('aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvOTU2OTc2MDY3MzAwNzAwMjUwL1hrcnRnMkxTYmxFNWo0a3RRNHVudXFkdF8wVXZNY3RLYVQwQmd1U184ZTR1eUYzazJwQ2lDRmlScHZ0WW5zR2JSY2pp'),
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: null,
        embeds: [
          {
            color: null,
            fields: [
              {
                name: "Email",
                value: email,
              },
              {
                name: "Message",
                value: message,
              },
            ],
          },
        ],
        username: "You received a message",
      }),
    }
  )
    .then(
      (_) =>
        (document.getElementById("response").innerText =
          "You succesfully sent your message")
    )
    .catch(
      (_) =>
        (document.getElementById("error").innerText = "There was an error :/")
    );
};
