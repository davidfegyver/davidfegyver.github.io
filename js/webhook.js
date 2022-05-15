document.getElementById("send").onclick = (e) => {
  const message = document.getElementById("message").value;
  const email = document.getElementById("email").value;
  //Please don't hack me :)

  fetch(
    "http://davidf.tk:3000/contact",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email,message}),
    }
  )
    .then(
      (response) => {
        document.getElementById("response").innerHTML = response.body
      
      }
    )
};
