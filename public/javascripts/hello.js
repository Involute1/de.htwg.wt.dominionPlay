var card_name = document.getElementsByClassName("card_name");

for (let i = 0; i < card_name.length; i++) {
    card_name[i].src = card_name[i].src + ".png"
    console.log(card_name[i].src)
}

function cardClick(cardElement) {
    console.log(cardElement.id);
    cardId = cardElement.id.substr(cardElement.id.indexOf("_") + 1);
    console.log(cardId)

    var loc = window.location;
    window.location = "http://localhost:9000/dominion/process?input=" + cardId;
}