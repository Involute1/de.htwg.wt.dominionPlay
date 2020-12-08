jQuery(document).ready(function ($) {

    $('.player_names').hide();
    $('.game').hide();

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

    function check_string(json_input) {
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
            $('.dominion-image').hide();
            $('#playerName').html("Name: " + json_input.playerName)
            $('#playerMoney').html("Money: " + json_input.playerMoney)
            $('#turn').html("Turn: " + json_input.turn)
            $('#phase').html("Phase: " + json_input.controllerPhase)
            $('#playerActions').html("Actions: " + json_input.playerActions)
            $('#playerBuys').html("Buys: " + json_input.playerBuys)

            jQuery('.playing-decks').html('');
            jQuery('.hand-decks').html('');

            for (i = 0; i < json_input.playingDecks[0].length; i++) {
                $('.playing-decks').append('<div id="card_' + i + '" class="card-stack"><img class="card_name" src="/assets/images/cards/' + json_input.playingDecks[0][i][0].cardName + '.png"></div>');
            }

            for (i = 0; i < json_input.playerHand[0].length; i++) {
                $('.hand-decks').append('<div id="handCard_' + i + '" class="card-stack float-left"><img class="card_name" src="/assets/images/cards/' + json_input.playerHand[0][i].cardName + '.png"></div>')


            }
        }
        $('.tui-instructions').html(json_input.html)
        $('.form-control').val('');
    }

    $(".game_container button").click(function () {

        var title = $(this).attr("value");
        if (title === "set_name") {
            title = $(this).prev().val();
        }

        $.ajax({
            method: "GET",
            url: "/json?input=" + title,
            dataType: "json",
            data: title,
            processData: false,

            success: function (data) {
                check_string(data)
                allowedClicks()
            },
            error: function (data) {
                alert("Error")
            }
        });
    });

    $(document).on('click', '.card-stack', function () {

        var phase = document.getElementById("phase").innerHTML;
        var phaseType = phase.substr(phase.indexOf(" ") + 1);
        var card = $(this).attr('id').split('_', 2);
        var cardId = card[1]
        var cardType = card[0];

        if ((phaseType === "Buyphase" && cardType === "card") || (phaseType === "Actionphase" && cardType === "handCard")) {
            $.ajax({
                method: "GET",
                url: "/json?input=" + cardId,
                dataType: "json",
                data: cardId,
                processData: false,

                success: function (data) {
                    check_string(data)
                    allowedClicks()
                },
                error: function (data) {
                    alert("Error")
                }
            });
        }
    });

    function connectWebSocket() {
        var websocket = new WebSocket("ws://localhost:9000/websocket");
        websocket.setTimout

        websocket.onopen = function(event) {
            console.log("Connected to Websocket");
        }

        websocket.onclose = function () {
            console.log('Connection with Websocket Closed!');
        };

        websocket.onerror = function (error) {
            console.log('Error in Websocket Occured: ' + error);
        };

        websocket.onmessage = function (e) {
            console.log(e);
        }
    }

    connectWebSocket();
});