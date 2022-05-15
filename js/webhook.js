document.getElementById("send").onclick = (e) => {
  const message = document.getElementById("message").value;
  const email = document.getElementById("email").value;

  fetch("http://davidf.tk:3000/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, message }),
  })
    .then((r) => r.text())
    .then((r) => {
      document.getElementById("response").innerHTML = r;
    });
};
