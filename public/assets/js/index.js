$(window).load(function() {
	$(".menu-btn").click(function() {
		$(this).toggleClass('on');
		$('.nav-list').toggleClass('on');
	});
})

$(document).ready(function() {
  // vue
  Wassup = new Vue ({
    el: 'body',
    data: {
    	isShow: false,
      wantToBuyItemId: 3722,
      wantToBuyItemQuantity: 1
    },

    methods: {
    	showBuy: function() {
    		this.isShow = !this.isShow
    	},

    	changeWantToBuyItemId: function(id) {
    		this.wantToBuyItemId = id
    		console.log(this.wantToBuyItemQuantity)
    	},
    	
      formSubmit: function() {
        $('#buy').find('form').submit();
      }

    } // methods end

  }) // vue.js object end

}); // document ready end




