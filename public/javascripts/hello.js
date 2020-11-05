var card_name = document.getElementsByClassName("card_name");
var phase = document.getElementById("phase").innerHTML;
var phaseType = phase.substr(phase.indexOf(" ") + 1);
var img_cards_buydeck = document.getElementById("playing-decks").getElementsByClassName("card_name");
var img_cards_handdeck = document.getElementById("hand-decks").getElementsByClassName("card_name");
var buydeck = document.getElementById("playing-decks");
var handdeck = document.getElementById("hand-decks");

changeImageSrc()
allowedClicks()

function changeImageSrc() {
    for (let i = 0; i < card_name.length; i++) {
        card_name[i].src = card_name[i].src + ".png";
    }
}

function allowedClicks() {
    if (phaseType === "Buyphase") {
        for (let i = 0; i < img_cards_buydeck.length; i++) {
            img_cards_buydeck[i].style.cursor = "cursorurl";

        }
        for (let i = 0; i < img_cards_handdeck.length; i++) {
            img_cards_handdeck[i].style.cursor = "not-allowed";
        }
        handdeck.style.backgroundImage = "url(http://localhost:9000/assets/images/bg.png)"

    } else if (phaseType === "Actionphase") {
        for (let i = 0; i < img_cards_buydeck.length; i++) {
            img_cards_buydeck[i].style.cursor = "not-allowed";
        }
        for (let i = 0; i < img_cards_handdeck.length; i++) {
            img_cards_handdeck[i].style.cursor = "cursorurl";
        }
        buydeck.style.backgroundImage = "url(http://localhost:9000/assets/images/bg.png)"
    }
}


function cardClick(cardElement) {
    var cardId = cardElement.id.substr(cardElement.id.indexOf("_") + 1);
    var cardType = cardElement.id.substr(0, cardElement.id.indexOf('_'));

    if (phaseType === "Buyphase" && cardType === "card") {
        window.location = "http://localhost:9000/dominion/process?input=" + cardId;
    } else if (phaseType === "Actionphase" && cardType === "handCard") {
        window.location = "http://localhost:9000/dominion/process?input=" + cardId;
    }
}