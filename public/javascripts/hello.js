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
        if (json_input === "Please enter the number of Players, must be between 3 & 5:") {
            $('.player_selection').show();
            $('.player_names').hide();
            $('.game').hide();
            $('.tui-instructions').html(json_input)
        } else if (json_input === "Player 1 please enter your name:"
            || json_input === "Player 2 please enter your name:"
            || json_input === "Player 3 please enter your name:"
            || json_input === "Player 4 please enter your name:"
            || json_input === "Player 5 please enter your name:") {
            $('.player_selection').hide();
            $('.player_names').show();
            $('.game').hide();
            $('.tui-instructions').html(json_input)
        } else {
            $('.player_selection').hide();
            $('.player_names').hide();
            $('.game').show();
            $('.tui-instructions').html(json_input)


        }
    }

    $(".game_container button").click(function (event) {
        event.preventDefault();
        var title = $(this).attr("value");
        console.log("/dominion/process?input=" + title)

        $.ajax({
            method: "GET",
            url: "/json?input=" + title,
            dataType: "json",
            data: title,
            processData: false,

            success: function (data) {
                console.log(data)
                check_string(data)
            },
            error: function (data) {
                alert("Error")
            }
        });
    })


});