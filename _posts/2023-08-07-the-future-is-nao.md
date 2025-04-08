---
title: The future is NAO
description: Hogyan működött NAO hangfelismerője?
layout: post
---

<p align="center">
    <img src="/assets/images/2023-08-07-the-future-is-nao/NAO.png" height=300/>
</p>

## A kezdetek
Tavaly ősszel, a [2022-es Formáld a Világod Verseny](https://formaldavilagod.hu/2022/#verseny) után egy hírlevelet kaptam e-mailben a C3-tól. Egy meghívó állt benne egy workshop-sorozatra. Lehetőséget kaptunk, hogy egy német szociális robottal együtt dolgozhassunk és egy kiállítás részeként egy feladatot találjunk ki neki. Rögtön válaszoltam, hiszen nagyon érdekel a programozás és a robotika. 

Az első workshopon online találkoztam a csapattal. Az elején kérdéseket elemeztünk a robotok és az emberek kapcsolatáról, elgondolkoztunk, hogy a jövőben hogy fog kinézni az MI és a robot technológia. A második workshopon már a feladaton kezdtünk el gondolkozni. Felmerült egy interjúztató robot, egy szlenges MI, és még sok más is. A végső ötlet a következő lett: Az [AmITheAssHole](https://www.reddit.com/r/AmItheAsshole/) subredditből kiindulva, egy "Én voltam-e a rosszfej" kérdésre válaszoló robot. 

Később Budapesten végre élőben is találkoztunk. Itt elkezdtünk dolgozni a projekten. Volt aki szövegeket írt, néhányan programoztunk, páran a kiállítást tervezték, szóval egy igazi csapatmunka részese lehettem :)

A robotos kiállításunkat itt tudjátok megtekinteni: https://jateknemjatek.c3.hu/#nao

A programozó csapattal különböző okokból úgy határoztunk, hogy egy weboldalt fogunk készíteni, ami a robot mellett elrejtve kezeli és irányítja azt. 

A kommunikáció megoldásához, a böngészők egy beépített modulját, a Web Speech API-t használtuk. Ezzel tudtunk szöveget hanggá, és hangot szöveggé alakítani. 

Ebben a blogban a beszédfelismerés résszel fogunk foglalkozni. **Egy egyszerű programot fogunk összeállítani, ami egy kimondott szín alapján beállítja a weboldal háttérszínét.**

A beszédfelismerés egy beszéd befogadását jelenti az eszközünk mikrofonján keresztül, amit a böngészőnk egy szövegként ad vissza. Így a szavakat feldolgozhatjuk. 
Ilyen rendszerrel működik például a Google Asszisztens, vagy a Siri is. 

Hozzávalók:
* Egy laptop
* Egy szövegszerkesztő. Ez lehet a beépített jegyzettömb, egy parancssori alkalmazás, vagy egy komolyabb is, mint például a [Visual Studio Code](https://code.visualstudio.com/)

Az eredmény és a kód a következő linkeken található meg: 
[Github](https://github.com/davidfegyver/WebSpeechNAO), [Demo](https://davidfegyver.github.io/WebSpeechNAO)


## HTML és CSS
A weboldal struktúráját a HTML, a kinézetét a CSS kód adja meg. A beszédfelismerő appunknak ez a része nem túl bonyolult.

A CSS beállítja, hogy a weboldal betöltse a teljes képernyőt (a magassága 100%-a legyen a képernyőnek), és a szövegeket középre igazítsa.

```css
    body,
    html {
      margin: 0;
      overflow: hidden;
      height: 100%;
      text-align: center;
    }
```

A HTML kiírja a "használati utasítást", létrehoz egy diagnosztikai kimenetet és meghívja a JavaScript kódot a `script.js` fájlból.

```html
  <p>klikkelj a weboldalra és mondj ki egy színt!</p>

  <p id="diagnostic"></p>
  <script src="./script.js"></script>
```

## JavaScript

Most nézzük meg a JavaScript kódot, ahol az igazi beszédfelismerés folyik.

### Importálás

Ahhoz hogy el tudjunk kezdeni dolgozni, importálnunk kell a beszédfelismerő könyvtárat. A különböző böngészők más-más változó neveket adnak ennek az API-nak, ezért ezt a nevet általánosítani kell, hogy ne legyen probléma.

Fontos megjegyezni, hogy sajnos még a Firefox böngészők [nem támogatják a beszédfelismerést](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#api.speechrecognition).

```js
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
```

### Színek
Következőnek létrehozunk egy objektumot, ami a magyar és az angol színeket párosítja egymással. Így például a `piros`-hoz a `red`-et párosítja hozzá. Ezeket a színeket később a weboldal háttérszínének megváltoztatására használjuk. Itt nyugodtan add hozzá a saját kedvenc színeidet is, hexadecimális formátumban. 

```js
const colors = {
    "piros":"red",
    "zöld":"green",
    "dávid":"#0583D2"
};
```

### Beállítások
A beszédfelismerő könyvtár helyes működéséhez be kell állítanunk a nyelvet, hogy magyarok vagyunk.
```js
const recognition = new SpeechRecognition(); // Létrehozunk egy példányt a beszédfelismerő könyvtárból

recognition.lang = 'hu-HU';
```

### A beszédfelismerés elindítása

Miután létrehoztuk a referenciákat a diagnosztikai kimenetünkhöz és a hátterünkhöz, egy [eseménykezelőt](https://webiskola.hu/javascript-ismeretek/javascript-esemenyek-js-event-magyarul/) hozunk létre. Ez fogja érzékelni, amikor megérintjük a képernyőt, és elindítja nekünk a beszédfelismerést.

```js
const diagnostic = document.getElementById('diagnostic');
const bg = document.querySelector('html');

document.body.onclick = function () {
  recognition.start();
  diagnostic.textContent = 'A felismerés elindult.';
}
```

### A beszédfelismerő eseménykezelői

A beszédfelismeréssel kapcsolatban számos eseménykezelő funkciót tudunk használni. Mi néggyel fogunk foglalkozni. 

Ezek közül a leggyakrabban használt, a `SpeechRecognition.onresult`, ami akkor fut le, ha a felismerés sikerült. 

A funkció első sora elsőre kicsit ijesztőnek tűnhet, szóval bontsuk le kisebb részekre. Az event változó az esemény információit tartalmazza ([SpeechRecognitionEvent](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionEvent)) , aminek a `results` tulajdonsága (property) egy [SpeechRecognitionResultList](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionResultList). Ez egy listát jelent, amiben benne vannak a felismerésünk eredményei. Enenk az első elemét `results[0]`-val tudjuk megszerezni. Ez viszont még tartalmazhat több alternatív felismerést is, szóval nekünk ebből is csak az első elem érdekes. Ezután, ennek az alternatívának a `transcript` propertyjét adjuk vissza, ami a felismert szövegünk lesz.

A következő furcsa sor a `hunColor` változó definiálásakor jön velünk szemben. Ez a sor egyszerűen megkeresi a színek listájában (`["piros","zöld","kék",...]`) azt az elemet, amit a kimondott szövegünk tartalmaz.

A HTML kódba illő színt végül a magyar szó alapján a `colors` objektumból kikeressük, aztán háttérszínként beállítjuk.

```js
recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript

  diagnostic.textContent = 'Felismert szöveg: ' + transcript

  const hunColor = Object.keys(colors).find(color => transcript.toLowerCase().includes(color))

  if (!hunColor) {
    diagnostic.innerHTML += "<br> Nem ismertem fel színt. :(";
    return;
  }

  const HTMLColor = colors[hunColor];

  bg.style.backgroundColor = HTMLColor;

  diagnostic.innerHTML += "<br> Felismert szín: " + hunColor;
  diagnostic.innerHTML += "<br> HTML szín: " + HTMLColor;
}
```


Egy `SpeechRecognition.onspeechend` kezelőt is használunk a beszédfelismerő szolgáltatás leállítására, ha a szöveg kimondása befejeződött.
Az `onnomatch` és az `onerror` a hibákat kezelik, és a diagnosztikai kimenetünkre kiírja ha valami nem stimmel.

```js

recognition.onspeechend = function () {
  recognition.stop();
}

recognition.onnomatch = function (event) {
  diagnostic.textContent = "Nem ismertünk fel szöveget.";
}

recognition.onerror = function (event) {
  diagnostic.textContent = 'Hiba történt a felismerésben ' + event.error;
}
```

## Köszönöm a figyelmet🤖

És lásd, a Web Speech API ereje már a kezeidben van! :) 
