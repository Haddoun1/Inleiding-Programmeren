console.log("Bomboclat"); //Checken of JavaScript het doet

const mijnStartKnop = document.querySelector('.startKnop'); // Selecteer de knop om de radio aan of uit te zetten
const mijnKnop = document.querySelector('.knop'); // Selecteer de knop om de liedjes te spelen
const mijnAudio = new Audio(); //Audio element zodat muziek afspeelt
const radioSound = new Audio('./Liedjes/radiosound.mp3'); //Audio element voor de radio geluid als de radio aanstaat
const liedjes = [ "4U.mp3","LOYALTY.mp3", "2024.mp3", "Devil In A New Dress.mp3", "Drugs You Should Try It.mp3", "FSMH1.mp3", 
    "Follow God.mp3", "PROMOTION.mp3", "Through The Wire.mp3", "SKELETONS.mp3", "TELEKINESIS.mp3",
    "EARFQUAKE.mp3", "WUSYANAME.mp3"
]; //een const met een array met alle liedjes die ik heb

let currentIndex = 0; //Vertelt welke liedje afspeelt, het gaat van eerste naar laatste. (0=Eerste lied)
let radioAan = false; //Houdt bij of de radio aan of uit staat. "False" betekent dat de radio uit begint
const liedTitel = document.querySelector('.lied h2'); //Laat liedje weergeven in de html

//Functie op liedjes of te spelen
function speelLied() {
    const huidigLied = liedjes[currentIndex]; //const 
    mijnAudio.src = './Liedjes/' + huidigLied; //Haalt de liedjes uit de bron
    mijnAudio.play(); //speelt audio af
    liedTitel.textContent = `${huidigLied.replace('.mp3', '')}`; //Veranderd de h2 in de index.html met de naam van het liedje. (Huidige lied en haalt de .mp3 weg)
    console.log("Now Playing: " + huidigLied); //Checken in de console of alles goed loopt 
}

//Event listener voor de startknop
mijnStartKnop.addEventListener('click', function () {
    radioAan = !radioAan; //Wissel de status van aan en uit als er wordt geclicked op de startknop
    if (radioAan) {
        console.log("Radio is aan"); //Checken in console
        radioSound.play(); //Als de knop wordt geclicked zal de radio geluid afspelen.
    } else {
        console.log("Radio is uit"); //Checken in console
        mijnAudio.pause(); //Als de knop nog een keer wordt geclicked zal de audio pauseren
        mijnAudio.currentTime = 0; //Reset de audio
        radioSound.pause(); //Pauzeerd de radio geluid
        radioSound.currentTime = 0; //reset de radio geluid
        liedTitel.textContent = "Naoufal's Playlist"; //veranderd de H2 weer in "Naoufals playlist"
    }
    mijnStartKnop.classList.toggle('active'); //Een classlist toggle zodat de startknop groen wordt wanneer het wordt ingedrukt en pas als er nog een keer op wordt gedrukt zal het weer rood worden
});

//Event listener voor de volgende lied knop
mijnKnop.addEventListener('click', function () {
    if (!radioAan) {
        console.log("Radio is uit! Schakel de radio eerst aan met de start knop."); //Als de radio uit zal dit vertellen in de console en er zal niks gebeuren
        return; //Stopt de functie als de radio uit is
    }

    console.log("De knop is gedrukt"); //checked in de console of de knop is ingedrukt
    radioSound.pause(); //De radio geluid zal stoppen/pauzeren
    radioSound.currentTime = 0; //De radio geluid wordt gereset dus begint opnieuw

    if (!mijnAudio.paused || mijnAudio.currentTime > 0) { //als de radio niet is gepauseerd en almis begonnen zal de volgende lied afspelen als je drukt op de knop
        currentIndex++;//speelt volgende lied
        if (currentIndex >= liedjes.length) {
            console.log("Alle nummers zijn afgespeeld! Nummers spelen vanaf begin");
            currentIndex = 0; //Als de currentindex groter of gelijk is aan de aantal liedjes zal de playlist opnieuw beginnen en het zal worden gecheckt in de console
        }
    }
    speelLied(); //speelt het volgende liedje af
});

//Event listener voor als een liedje is 
mijnAudio.addEventListener('ended', function () {
    console.log("Nummers afspelen gaat verder");
    currentIndex++;//Als een liedje is afgelopen zal de volgende liedje afspelen en het wordt gechecked in de console
    if (currentIndex >= liedjes.length) {
        console.log("Alle nummers zijn afgespeeld! Nummers spelen vanaf begin");
        currentIndex = 0;//Als de index dus groter of gelijk is aan de aantal liedjes zal de playlist opnieuw spelen.
    }
    if (radioAan) {
        speelLied();
    }
});

// https://www.w3schools.com/tags/tag_button.asp
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
// https://www.w3schools.com/css/css3_buttons.asp
// https://dev.to/nicm42/how-to-make-a-button-looked-like-it-s-staying-pressed-down-58k
// Janno gaf hulp met een start voor de speellied functie 
