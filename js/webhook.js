document.getElementById("send").onclick = (e) => {
  const message = document.getElementById("message").value;
  const email = document.getElementById("email").value;
  //Please don't hack me :)

  fetch(
    atob('aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvOTc0NzI5OTU3OTY2MjM3NzM2LzZ4VGdNV18wNFItUXpKRXlKQ1hERF9ZYndadEI3bW43OHBTTnZ4dVJiTUx4QUloVDFvU2NRMkR4cXM5N2MzUm5KOWhO'),
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
