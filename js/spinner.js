console.log("Dear reader");
console.log("This site is open-source!");
console.log(
  "You can find it here: https://github.com/davidfegyver/davidfegyver.github.io"
);
console.log("Please give me a star if you like it :D ");
const spinner = document.getElementById("data-spinner");
const datalist = [
  "Programmer",
  "Backend dev",
  "BountyHunter",
  "I <3 JS",
  "Pokemon Go player",
  "C^3 winner",
];
headeranim(datalist, spinner);

async function headeranim(datalist, spinner) {
  await wait(2000);
  while (true)
    for (let i = 0; i < datalist.length - 1; i++) {
      const next = datalist[i + 1];
      const curr = datalist[i];

      await transform(curr, next, spinner);
      await wait(1500);
    }
}

function randomString(length) {
  let result = "";
  for (let i = 0; i < length; i++)
    result += String.fromCharCode(Math.floor(Math.random() * 93 + 33));
  return result;
}

async function transform(prev, next, spinner) {
  if (prev.length < next.length) {
    for (let i = prev.length; i <= next.length; i++) {
      spinner.innerText = randomString(i);
      await wait(150);
    }
  } else {
    for (let i = prev.length; i >= next.length; i--) {
      spinner.innerText = randomString(i);
      await wait(150);
    }
  }
  spinner.innerText = next;
}

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
