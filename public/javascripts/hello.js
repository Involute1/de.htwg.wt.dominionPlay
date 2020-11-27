jQuery(document).ready(function ($) {

    changeImageSrc();
    allowedClicks();

    function changeImageSrc() {
        $('.card_name').each(function () {
            var src = $(this).attr('src');
            $(this).attr('src', src + '.png')
        });
    }

    function allowedClicks() {
        if ($("#phase").length !== 0) {
            var phase = document.getElementById("phase").innerHTML;
            var phaseType = phase.substr(phase.indexOf(" ") + 1);
            if (phaseType === "Buyphase") {
                $('#hand-decks .card_name').each(function () {
                    $(this).css('cursor', 'not-allowed');
                });
                $('#playing-decks .card_name').each(function () {
                    $(this).css('cursor', 'cursorurl');
                });
                $('#hand-decks').css("background-image", "url(http://localhost:9000/assets/images/bg.png)");
            } else if (phaseType === "Actionphase") {
                $('#hand-decks .card_name').each(function () {
                    $(this).css('cursor', 'cursorurl');
                });
                $('#playing-decks .card_name').each(function () {
                    $(this).css('cursor', 'not-allowed');
                });
                $('#playing-decks').css("background-image", "url(http://localhost:9000/assets/images/bg.png)");
            }
        }
    }

    function cardClick(cardElement) {
        var cardId = cardElement.id.substr(cardElement.id.indexOf("_") + 1);
        var cardType = cardElement.id.substr(0, cardElement.id.indexOf('_'));

        if ((phaseType === "Buyphase" && cardType === "card") || (phaseType === "Actionphase" && cardType === "handCard")) {
            window.location = "http://localhost:9000/dominion/process?input=" + cardId;
        }
    }

    $(this).submit(function (event) {
        event.preventDefault();

        $.ajax({
            method: "GET",
            url: "/json",
            dataType: "json",

            success: function (result) {
                alert(result);
            }
        });
    })

});