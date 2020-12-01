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
            $('#playerName').html("Name: " + json_input.playerName)
            $('#playerMoney').html("Money: " + json_input.playerMoney)
            $('#turn').html("Turn: " + json_input.turn)
            $('#phase').html("Phase: " + json_input.controllerPhase)
            $('#playerActions').html("Actions: " + json_input.playerActions)
            $('#playerBuys').html("Buys: " + json_input.playerBuys)


            for (i = 0; i < json_input.playingDecks[0].length; i++) {
                console.log("Deck: " + json_input.playingDecks[0][i][0].cardName + " Size: " + json_input.playingDecks[0][i].length);
                var div = document.createElement("div");
                div.id = "card_" + i;
                div.class = "card-stack";
                var elem = document.createElement("img");
                elem.setAttribute("src", "/assets/images/cards/" + json_input.playingDecks[0][i][0].cardName + ".png");
                elem.setAttribute("class", "card_name");
                div.appendChild(elem)
                document.getElementById("playing-decks").appendChild(div);
            }

            for (i = 0; i < json_input.playerHand[0].length; i++) {
                console.log("Hand: " + json_input.playerHand[0][i].cardName + " id " + i);
                var div = document.createElement("div");
                div.id = "handCard_" + i;
                div.class = "card-stack float-left";
                var elem = document.createElement("img");
                elem.setAttribute("src", "/assets/images/cards/" + json_input.playerHand[0][i].cardName + ".png");
                elem.setAttribute("class", "card_name");
                div.appendChild(elem);
                document.getElementsByClassName("card-row hand-decks")[0].appendChild(div);
            }
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