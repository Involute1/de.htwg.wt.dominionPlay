$(document).ready(function () {

    Vue.component('dominion-logo-component', {
        template: '<img src="https://ph.gamekastle.com/categories/cat_2661.jpg">'
    })

    Vue.component('dominion-button-component', {
        template: '<button type="button" onclick=c()>Click Me!</button>'
    })

    function c() {
        console.log("clicked")
    }

    var app = new Vue({
        el: '#dominion'
    })
});