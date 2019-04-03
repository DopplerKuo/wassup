$(function(){
	$(window).bind('scroll resize', function(){
		var $this = $(this);
		var $this_Top = $this.scrollTop();
		var $barFixedHeight = $('header').height() / 2;
		var $ratio = $this_Top / $barFixedHeight;
		$('.bg1').css('transform', 'translateY(' + $this_Top / 4 + 'px)');
		$('.bg2').css('transform', 'translateY(' + $this_Top / 3 + 'px)');
		$('.bg1').css('opacity', 1 - ( $this_Top / $('header').height()));
		$('.bg2').css('opacity', 1 - ( $this_Top * 3 / $('header').height()));
		$('.text').css('transform', 'translateY(' + $this_Top / 5 + 'px)');
		$('.text').css('opacity', 1 - $ratio);
		$('.text img:nth-of-type(1)').css('transform', 'translate3d(-' + $this_Top / 4 + 'px, 50%, 0)');
		$('.text img:nth-of-type(2)').css('transform', 'translate3d(' + $this_Top / 4 + 'px, 50%, 0)');

		if ($this_Top < $barFixedHeight) {

		}

		else if ($this_Top > $barFixedHeight){
　　　 $('.fix-bg').addClass('blur')
		}

		var $buy_d = $(document).height() - ($('#buy').height() + $('footer').height()) * 2 - $('#buy').height();
		console.log($this_Top)
		console.log($buy_d)
		if ($this_Top > $buy_d) {
			$('#cta').addClass('hide');
		}

		else if ($this_Top <= $buy_d) {
			$('#cta').removeClass('hide');
		}
	}).scroll();
})
