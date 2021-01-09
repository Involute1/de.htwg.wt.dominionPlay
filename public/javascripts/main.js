jQuery(document).ready(function ($) {

    /*

    $(document).on('click', '.card-stack', function () {
        var phase = document.getElementById("phase").innerHTML;
        var phaseType = phase.substr(phase.indexOf(" ") + 1);
        var card = $(this).attr('id').split('_', 2);
        var cardId = card[1]
        var cardType = card[0];
        if ((phaseType === "Buyphase" && cardType === "card") || (phaseType === "Actionphase" && cardType === "handCard")) {
            websocket.send(cardId);
        }
    });



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
                $('#playing-decks').css("background", "none");
            } else if (phaseType === "Actionphase") {
                $('#hand-decks .card_name').each(function () {
                    $(this).css('cursor', 'cursorurl');
                });
                $('#playing-decks .card_name').each(function () {
                    $(this).css('cursor', 'not-allowed');
                });
                $('#hand-decks').css("background", "none");
                $('#playing-decks').css("background-image", "url(http://localhost:9000/assets/images/bg.png)");
            }
        }
    }


    }*/

});
