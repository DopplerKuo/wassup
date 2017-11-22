$(function(){
	$(window).bind('scroll resize', function(){
		var $this = $(this);
		var $this_Top = $this.scrollTop();
		var $barFixedHeight = $('.sec1').height() / 2;

		if($this_Top < $barFixedHeight){
　　　 $('.fix-bg').removeClass('blur');
			$('.backtop').removeClass('show');
		}
		else if($this_Top > $barFixedHeight){
　　　 $('.fix-bg').addClass('blur')
			$('.backtop').addClass('show');
		}
	}).scroll();
})
