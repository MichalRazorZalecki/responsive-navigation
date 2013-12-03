;(function ($, window, document, undefined) {
	"use strict";

if(window.navigator.userAgent.indexOf("Windows Phone") > 0)
	$('html').addClass('touch');

//$('html').addClass('touch'); //Uncoment to pretend device witch touch screen

/* ==========================================================================
   Menu Responsive Dropdown
   ========================================================================== */

var nav_has_sub_menus = $('#menu-rd .has-sub-menu');

nav_has_sub_menus.each(function(index, element){
		
	var hover_timer;
	if($('html').hasClass('touch')){
		$(element).find('> .show-sub-menu').on('click', function(){
			if($(element).find('> .sub-menu').hasClass('open'))
				$(element).find('.sub-menu').removeClass('open');
			else {
				nav_has_sub_menus.not($(this).parents('.has-sub-menu')).find('.sub-menu').removeClass('open');
				$(element).find('> .sub-menu').addClass('open');	
			}						
		});

		$(window).on("click", function(e){
			if($(e.target).parents('#menu-rd').length == 0){
				$('.sub-menu').removeClass('open');	
			}
		})
	} else {
		$(element).on({mouseover: function(){
			clearTimeout(hover_timer);
			$('> .sub-menu', element).addClass('open');
		}, mouseout : function(){
			hover_timer = setTimeout(function(){
				$('> .sub-menu', element).removeClass('open');
			}, 100); //0 for closing immediately
		}}).find('> .show-sub-menu').on({focus : function(){
			nav_has_sub_menus.not($(this).parents('.has-sub-menu')).find('.sub-menu').removeClass('open');
			$('> .sub-menu', element).addClass('open');
		}});

		var all_f = $('#menu-rd a').add('#menu-rd .show-sub-menu');
		all_f.on({blur : function(){
			setTimeout(function(){
				if(all_f.filter(":focus").length==0)
					$('.sub-menu').removeClass('open');		
			}, 50);
		}});
	}	
});

}(jQuery, this, this.document));