$(document).ready(function () {
    var app = new Vue({
        el: '#test-div',
        data: {
            text: '',
            logo: '/assets/images/cards/Copper.png'
        }
    })

    Vue.component('sudoku-highlight-button-bar', {
        template:`
         <div class="buttonbarcontainer">
             <label>
                 Highlight
             </label>
             <div  class=" btn-group" >
                 <a v-for="item in menuItems" v-bind:href="item.link" class="btn btn-primary"> {{item.text}} </a>
             </div>
         </div>
     `,
    })
});