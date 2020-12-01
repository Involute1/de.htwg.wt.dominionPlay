jQuery(document).ready(function ($) {

    changeImageSrc();
    allowedClicks();

    $('.player_names').hide();
    $('.game').hide();

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

    function check_string(json_input) {
        console.log(json_input)
        if (json_input.html === "Player 1 please enter your name:"
            || json_input.html === "Player 2 please enter your name:"
            || json_input.html === "Player 3 please enter your name:"
            || json_input.html === "Player 4 please enter your name:"
            || json_input.html === "Player 5 please enter your name:") {
            $('.player_selection').hide();
            $('.player_names').show();
        } else {
            $('.player_names').hide();
            $('.game').show();
            $('#playerName').html(json_input.playerName)
            $('#playerMoney').html(json_input.playerMoney)
            $('#turn').html(json_input.turn)
            $('#phase').html(json_input.controllerPhase)
            $('#playerActions').html(json_input.playerActions)
            $('#playerBuys').html(json_input.playerBuys)
            $('#hand-decks').html(json_input.playerHand)
            $('#playing-decks').html(json_input.playingDecks)
        }

        $('.tui-instructions').html(json_input.html)
        $('.form-control').val('');

    }

    $(".game_container button").click(function (event) {
        event.preventDefault();
        var title = $(this).attr("value");

        if (title === "set_name") {
            title = $(this).prev().val();
        }

        console.log("/json?input=" + title)

        $.ajax({
            method: "GET",
            url: "/json?input=" + title,
            dataType: "json",
            data: title,
            processData: false,

            success: function (data) {
                check_string(data)
            },
            error: function (data) {
                alert("Error")
            }
        });
    })


});