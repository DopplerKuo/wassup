$(document).ready(function() {

	// animateNumbers
	
    $.fn.animateNumbers = function(stop, commas, duration, ease) {
      return this.each(function() {
	      var $this = $(this);
        var start = parseInt($this.text().replace(/,/g, ""));
	      commas = (commas === undefined) ? true : commas;
        $({value: start}).animate({value: stop}, {
        	duration: duration == undefined ? 1000 : duration,
        	easing: ease == undefined ? "swing" : ease,
					step: function() {
        		$this.text(Math.floor(this.value));
        		if (commas) { $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); }
      		},
					complete: function() {
		     	 	if (parseInt($this.text()) !== stop) {
			      	$this.text(stop);
							if (commas) { $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); }
						}
        	}
  		  });
	    });
    };
  
  // animateNumbers End

	// loading
  var progress = 0;
  var $img_count = $("img").length;
  $("img").on('load', function() {
    progress += 100 / $img_count
    var percent = Math.round(progress)
    $("#loading .progress-text b").animateNumbers(percent, 100);
    $("#loading .progress").css('width', percent + '%')
  });

  $(window).on('load', function() {
  	$("#loading .progress-text b").animateNumbers(100, 100);
  	$("#loading").addClass('completed')
	})
	// loading end

	// a link target animation
	$(document).on('click', 'a[href^="#"]', function (event) {
	    event.preventDefault();
	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top
	    }, 500);
	});

	$(".backtop").click(function () {
	   $("html, body").animate({scrollTop: 0}, 1000);
	});

	window.sr = ScrollReveal({ reset: false });
	sr.reveal('.reveal', { 
		duration: 600,
		delay: 400
	});
	// a link target animation end

	var PEOPLE = [
		'Nike',
		'dudu',
		'Leo王',
		'佑誠',
		'春m'
	]

  // vue
  Wassup = new Vue ({
    el: 'body',
    data: {
			isTarget: 'Nike', // 'Nike', 'dudu', 'Leo王', '佑誠', '春m'
			isSec5ShowIndex: 1,
    	isShow: false,
      wantToBuyItemId: 3722,
      wantToBuyItemQuantity: 1,
      popup: {
      	whichMore: 1,
      	isShow: false
			},
			flashes: ""
		},
		
		created: function () {
			this.fetchData()
		},

    methods: {
			fetchData: function () {
				var self = this
				$.getJSON('https://wassup.backme.tw/api/projects/720.json?token=c0a0eb9d09079aaff9df860402401f99', function(data) {
					var flash = data.rewards.filter(function (reward) {
						return reward.category === '優惠訊息'
					})
					self.flashes = flash[0].description
				})
			},

			changeTarget: function(target) {
				this.isTarget = target;
			},

    	showBuy: function() {
    		// this.isShow = !this.isShow
    	},

    	showPopup: function(which) {
    		this.popup.isShow = true;
    		this.popup.whichMore = which
    	},

    	changeWantToBuyItemId: function(id) {
    		this.wantToBuyItemId = id
    	},
    	
      formSubmit: function() {
        $('#buy').find('form').submit();
			},
			
			sec5IndexThis: function(index) {
				this.isSec5ShowIndex = index;
			},

			sec5IndexNext: function() {
				var index = this.isSec5ShowIndex + 1 > 5 ? 1: this.isSec5ShowIndex + 1;
				this.isSec5ShowIndex = index;
			},

			sec5IndexPrev: function() {
				var index = this.isSec5ShowIndex - 1 === 0 ? 5: this.isSec5ShowIndex - 1;
				this.isSec5ShowIndex = index;
			}

    } // methods end

  }) // vue.js object end

}); // document ready end




