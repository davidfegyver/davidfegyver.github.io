document.getElementById("send").onclick = (e) => {
    const message = document.getElementById("message").value
    const email = document.getElementById("email").value
    //Ne hackelj meg kérlek :))

    fetch('https://discord.com/api/webhooks/888355320802463834/5zkKo0fn8iY4Ezwl4xm99YSdfwN2B0lDwaSCfZWxjMVa5WAlTVBb6p4ntUkg3jGJ8ZMW', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "content": null,
                "embeds": [{
                    "color": null,
                    "fields": [{
                            "name": "Email",
                            "value": email
                        },
                        {
                            "name": "Message",
                            "value": message
                        }
                    ]
                }],
                "username": "You received a message"
            })
        })
        .then(_=>document.getElementById("response").innerText = "You succesfully sent your message")
        .catch(_=>document.getElementById("error").innerText = "There was an error :/")
}