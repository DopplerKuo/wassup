$(document).ready(function() {
  // animateNumbers
  $.fn.animateNumbers = function(stop, commas, duration, ease) {
    return this.each(function() {
      var $this = $(this);
      var start = parseInt($this.text().replace(/,/g, ''));
      commas = commas === undefined ? true : commas;
      $({ value: start }).animate(
        { value: stop },
        {
          duration: duration == undefined ? 1000 : duration,
          easing: ease == undefined ? 'swing' : ease,
          step: function() {
            $this.text(Math.floor(this.value));
            if (commas) {
              $this.text(
                $this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
              );
            }
          },
          complete: function() {
            if (parseInt($this.text()) !== stop) {
              $this.text(stop);
              if (commas) {
                $this.text(
                  $this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
                );
              }
            }
          },
        }
      );
    });
  };
  // animateNumbers End

  // loading
  var progress = 0;
  var $img_count = $('img').length;
  $('img').on('load', function() {
    progress += 100 / $img_count;
    var percent = Math.round(progress);
    $('#loading .progress-text b').animateNumbers(percent, 100);
    $('#loading .progress').css('width', percent + '%');
  });

  $(window).on('load', function() {
    $('#loading .progress-text b').animateNumbers(100, 100);
    $('#loading').addClass('completed');
    setTimeout(() => {
      $('body').addClass('show');
    }, 2000);
    setTimeout(() => {
			$('body').removeClass('show');
      $('body').css('overflow-y', 'auto');
      $('#loading').css('display', 'none');
			$('#nav')
        .css('opacity', 1)
      $('.bg')
        .css('opacity', 1)
        .css('transform', 'translateY(0)');
      $('.text img')
        .css('transform', 'scale(1) translate3d(0, 50%, 0)')
				.css('opacity', 1)
				.css('filter', 'blur(0)')
      $(window)
        .bind('scroll resize', function() {
          var $this = $(this);
          var $this_Top = $this.scrollTop();
          var $barFixedHeight = $('header').height() / 2;
          var $ratio = $this_Top / $barFixedHeight;
          $('.bg1').css('transform', 'translateY(' + $this_Top / 4 + 'px)');
          $('.bg2').css('transform', 'translateY(' + $this_Top / 3 + 'px)');
          $('.bg1').css('opacity', 1 - $this_Top / $('header').height());
          $('.bg2').css('opacity', 1 - ($this_Top * 3) / $('header').height());
          $('.text').css('transform', 'translateY(' + $this_Top / 5 + 'px)');
          $('.text').css('opacity', 1 - $ratio);
          $('.text img:nth-of-type(1)').css(
            'transform',
            'translate3d(-' + $this_Top / 4 + 'px, 50%, 0)'
          );
          $('.text img:nth-of-type(2)').css(
            'transform',
            'translate3d(' + $this_Top / 4 + 'px, 50%, 0)'
          );

          if ($this_Top > $barFixedHeight) {
            $('.fix-bg').addClass('blur');
          }

          var $buy_d =
            $(document).height() -
            ($('#buy').height() + $('footer').height()) * 2 -
            $('#buy').height();
          if ($this_Top > $buy_d) {
            $('#cta').addClass('hide');
          } else if ($this_Top <= $buy_d) {
            $('#cta').removeClass('hide');
          }
        })
    }, 3500);
  });
  // loading end

  // a link target animation
  $(document).on('click', 'a[href^="#"]', function(event) {
    event.preventDefault();
    $('html, body').animate(
      {
        scrollTop: $($.attr(this, 'href')).offset().top,
      },
      500
    );
  });

  $('.backtop').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 1000);
  });

  window.sr = ScrollReveal({ reset: false });
  sr.reveal('.reveal', {
    duration: 600,
    delay: 400,
  });
  // a link target animation end

  var PEOPLE = ['Nike', 'dudu', 'Leo王', '佑誠', '春m'];

  // vue
  Wassup = new Vue({
    el: 'body',
    data: {
      isTarget: 'Nike', // 'Nike', 'dudu', 'Leo王', '佑誠', '春m'
      isSec5ShowIndex: 1,
      isShow: false,
      buySec: {
        totalAmount: 1100,
        type: 1, // 1 = 礦砂, 2 = 松木砂
        picIndex: 1,
        isGambling: false,
        buyPlan: 1,
        trialPlan: '1',
      },
      wantToBuyItemId: 3722,
      wantToBuyItemQuantity: 1,
      popup: {
        whichOne: 1,
        isShow: false,
        img: '',
      },
      flashes: '',
    },

    created: function() {
      this.fetchData();
    },

    methods: {
      fetchData: function() {
        var self = this;
        $.getJSON(
          'https://wassup.backme.tw/api/projects/720.json?token=c0a0eb9d09079aaff9df860402401f99',
          function(data) {
            var flash = data.rewards.filter(function(reward) {
              return reward.category === '優惠訊息';
            });
            self.flashes = flash[0].description;
          }
        );
      },

      changeTarget: function(target) {
        this.isTarget = target;
      },

      showPopup: function(which) {
        this.popup.isShow = true;
        this.popup.whichMore = which;
      },

      changeWantToBuyItemId: function(id) {
        this.wantToBuyItemId = id;
      },

      formSubmit: function() {
        $('#buy')
          .find('form')
          .submit();
      },

      sec5IndexThis: function(index) {
        this.isSec5ShowIndex = index;
      },

      sec5IndexNext: function() {
        var index = this.isSec5ShowIndex + 1 > 5 ? 1 : this.isSec5ShowIndex + 1;
        this.isSec5ShowIndex = index;
      },

      sec5IndexPrev: function() {
        var index =
          this.isSec5ShowIndex - 1 === 0 ? 5 : this.isSec5ShowIndex - 1;
        this.isSec5ShowIndex = index;
      },

      videoNext: function() {
        var index = PEOPLE.indexOf(this.isTarget);
        var finalIndex = index + 1 > 4 ? 0 : index + 1;
        this.isTarget = PEOPLE[finalIndex];
      },

      videoPrev: function() {
        var index = PEOPLE.indexOf(this.isTarget);
        var finalIndex = index - 1 === -1 ? 4 : index - 1;
        this.isTarget = PEOPLE[finalIndex];
      },

      setBuyType: function(typeIndex) {
        this.buySec.type = typeIndex;
      },

      setBuyPicIndex: function(index) {
        this.buySec.picIndex = index;
      },

      setBuyPlan: function(buyPlanIndex) {
        this.buySec.buyPlan = buyPlanIndex;
      },

      showPopup1: function() {
        this.popup.isShow = true;
        this.popup.whichOne = 1;
      },

      showPopup2: function() {
        this.popup.isShow = true;
        this.popup.whichOne = 2;
      },

      showImg: function(src) {
        this.popup.isShow = true;
        this.popup.whichOne = 'img';
        this.popup.img = src;
      },
    }, // methods end
  }); // vue.js object end
}); // document ready end
