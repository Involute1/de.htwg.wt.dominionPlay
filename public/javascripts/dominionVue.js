$(document).ready(function () {

    Vue.component('dominion-logo-component', {
        template: '<div class="dominion-image"><img src="https://ph.gamekastle.com/categories/cat_2661.jpg"></div>'
    });

    var app = new Vue({
        el: '#titlescreen',
        data: {
            title: 'Welcome to Dominion',
            play: 'Play',
            rules: 'Rules',
            quit: 'Quit',
        }
    });

    Vue.component('dominion-player-count-component', {
            template: '<div class=name-input>' +
            '   <div class="tui-string">' +
            '       <h2 class="tui-instructions">How many Players are you?</h2>' +
            '   </div>' +
            '<br>' +
            '   <div class="pricing-header px-3 mx-auto text-center">' +
            '       <div class="player_selection">' +
            '           <div class="input-tui" id="player_amount">' +
            '               <div class="row justify-content-md-center">' +
            '                   <button name="input" value="3" id="player3" class="btn btn-primary mx-2 player-amount">3 Players</button>' +
            '                   <button name="input" value="4" id="player4" class="btn btn-primary mx-2 player-amount">4 Players</button>' +
            '                   <button name="input" value="5" id="player5" class="btn btn-primary mx-2 player-amount">5 Players</button>' +
            '               </div>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div>'
    });

    Vue.component('dominion-name-input-component', {
        template:
            '<div class=name-input>' +
            '   <div class="tui-string">' +
            '       <h2 class="tui-instructions">TEST</h2>' +
            '   </div>' +
            '<br>' +
            '   <div class="input-tui">' +
            '       <div class="row justify-content-md-center">' +
            '           <input type="text" class="form-control" name="input">' +
            '           <button class="btn btn-primary send-name" value="set_name">Send</button>' +
            '       </div>' +
            '   </div>' +
            '</div>'
    });

    Vue.component('dominion-rules-goal', {
        template: '<div class="description-heading">' +
                        '<div class="heading">' +
                            '<h4>Goal of the game:</h4>' +
                        '</div>' +
                        '<div class="description">' +
                        '   <p>Try to get the biggest card set with the most value.The player with the most valuest cards and most points wins the game.</p>' +
                        '</div>' +
                    '</div>'
    });

    Vue.component('dominion-rules-start', {
        template: '<div class="description-heading">\n' +
            '            <div class="heading">\n' +
            '                <h4>Setup:</h4>\n' +
            '            </div>\n' +
            '            <div class="description">\n' +
            '                <p>\n' +
            '                    Each player starts with 10 cards: 7 copper and 3 estates as a starting deck.\n' +
            '                </p>\n' +
            '            </div>\n' +
            '        </div>'
    });

    Vue.component('dominion-game', {
        template: '<div class="container px-3 mx-auto text-center">\n' +
            '                <div class="row gameboard">\n' +
            '                    <div class="game-information mb-3">\n' +
            '                        <div class="info text-center">\n' +
            '                            <h4 class="float-left mx-5" id="playerName"></h4>\n' +
            '                            <h4 class="float-left mx-5" id="playerMoney"></h4>\n' +
            '                            <h4 class="float-left mx-5" id="turn"></h4>\n' +
            '                            <h4 class="float-left mx-5" id="phase"></h4>\n' +
            '                            <h4 class="float-left mx-5" id="playerActions"></h4>\n' +
            '                            <h4 class="float-left mx-5" id="playerBuys"></h4>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="row card-row playing-decks justify-content-center pt-2" id="playing-decks">\n' +
            '\n' +
            '                </div>\n' +
            '                <div class="row hand-cards my-3" id="hand-decks">\n' +
            '                    <h4 class="mx-5">Handkarten</h4>\n' +
            '                    <br>\n' +
            '                    <div class="card-row hand-decks">\n' +
            '\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>'
    });

    Vue.component('dominion-rules-phase', {
        template: '<div class="description-heading">\n' +
            '            <div class="heading">\n' +
            '                <h4>Game Play:</h4>\n' +
            '            </div>\n' +
            '            <div class="description">\n' +
            '                <p>A turn consists of 3 phases:</p>\n' +
            '                <ul>\n' +
            '                    <li>\n' +
            '                        <b>Action:</b> The player may play one action card from his hand.\n' +
            '                    </li>\n' +
            '                    <li>\n' +
            '                        <b>Buy:</b> The player may buy a card in a pile on the table.\n' +
            '                    </li>\n' +
            '                    <li>\n' +
            '                        <b>Cleanup:</b> The player must discard all played and unplayed cards back to the discard pile and draw again 5 new cards.\n' +
            '                    </li>\n' +
            '                </ul>\n' +
            '            </div>\n' +
            '        </div>'
    });

    Vue.component('dominion-rules-description', {
        template: '<div class="description-heading">\n' +
            '            <div class="heading">\n' +
            '                <h4>Action phase:</h4>\n' +
            '            </div>\n' +
            '            <div class="description">\n' +
            '                <p>\n' +
            '                    The player may play one action cards. These are the Kingdom cards that say: "Action" at the bottom of the card.<br>\n' +
            '                    Players don\'t start with any Action cards, so during the first 1 turns no Actions can be performed.<br>\n' +
            '                    Normally a player can play only one card, but some action cards allow the player to play more cards.<br>\n' +
            '                    To play a card, the player lays the action card face-up in his play area. He announces which card he is playing and follows the instructions written on that card from top to bottom.<br>\n' +
            '                    The player may still play the Action card even when he is not able to do everything listed.<br>\n' +
            '                    Any action cards played remain in the player\'s play area until the Clean-up phase of the turn unless otherwise indicated on the card.<br>\n' +
            '                    The action phase ends when the player cannot or chooses not to play any more Action cards.<br>\n' +
            '                </p>\n' +
            '                <p>\n' +
            '                    The player can gain one card from the Supply by paying its cost. The cost of a card is found in the lower left corner.<br>\n' +
            '                    Any card in the Supply maybe be bought, but the player may not purchase cards from the Trash Pile. When a player played a certain card in his Action phase, its possible that he is allowed to buy more than one card.<br>\n' +
            '                    The player places the purchased card from the Supply pile face-up on his Discard pile. The ability of the purchased card may not be used when he just gain the card.<br>\n' +
            '                    The treasure cards remain in the play area until the Clean-up phase. Treasure cards will be used multiple times during the game. Treasure cards are a source of income, not a resource that is used up when played.<br>\n' +
            '                    Coppers are worth 1 coin, Silvers are worth 2 coins and Golds are worth 3 coins.<br>\n' +
            '                </p>\n' +
            '                <p>\n' +
            '                All cards gained are already in the player\'s discard pile. The player places also all his cards (played and unplayed) to this pile.<br>\n' +
            '                    The player now draws a new hand of 5 cards from his Deck. If there are not enough cards in his Deck, he draws as many as he can.<br>\n' +
            '                    The player shuffles then his Discard pile to form a new face-down Deck, and then draws the rest of his new hand.<br>\n' +
            '                    Once the player has drawn a new hand of 5 cards, the next player starts his turn.<br>\n' +
            '                    To speed up play, players may begin their turns while the previous players are completing their clean-up phases, but when someone plays an Attack card, the players must complete their Clean-up phases first in order to resolve the Attack.<br>\n' +
            '                </p>\n' +
            '                <p>\n' +
            '                    The game ends when the last Province is bought, or when 3-4 piles are empty. The players will count their victory points in their decks and the player with the most points wins.<br>\n' +
            '                    If there is a tie, then the player with the fewest turns wins.\n' +
            '                </p>\n' +
            '            </div>\n' +
            '        </div>'
    });

});