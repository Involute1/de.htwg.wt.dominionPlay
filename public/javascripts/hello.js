var card_name = document.getElementsByClassName("card_name");

for (let i = 0; i < card_name.length; i++) {
    card_name[i].src = card_name[i].src + ".png"
    console.log(card_name[i].src)
}