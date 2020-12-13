$(document).ready(function () {

    Vue.component('dominion-logo-component', {
        template: '<img src="https://ph.gamekastle.com/categories/cat_2661.jpg">'
    })

    Vue.component('dominion-button-component', {
        template: '<button type="button">Click Me!</button>'
    })

    Vue.component('dominion-player-count-component', {
        template:
            '<div class="pricing-header px-3 mx-auto text-center">' +
            '   <div class="player_selection">' +
            '       <div class="input-tui" id="player_amount">' +
            '           <div class="row justify-content-md-center">' +
            '               <button name="input" value="3" id="player3" class="btn btn-primary mx-2 player-amount">3 Players</button>' +
            '               <button name="input" value="4" id="player4" class="btn btn-primary mx-2 player-amount">4 Players</button>' +
            '               <button name="input" value="5" id="player5" class="btn btn-primary mx-2 player-amount">5 Players</button>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div>'
    })

    Vue.component('dominion-name-input-component', {
        data: function () {
            return {
                nameString: 'TEST'
            }
        },
        template:
            '<div class=name-input>' +
            '   <div class="tui-string">' +
            '       <h2 class="tui-instructions">{{nameString}}</h2>' +
            '   </div>' +
            '   <div class="input-tui">' +
            '       <div class="row justify-content-md-center">' +
            '           <input type="text" class="form-control" name="input">' +
            '           <button class="btn btn-primary" value="set_name">Send</button>' +
            '       </div>' +
            '   </div>' +
            '</div>'
    })

    var app = new Vue({
        el: '#dominion'
    })
});