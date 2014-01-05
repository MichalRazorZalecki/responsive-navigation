;(function ($, window, document, undefined) {
	"use strict";

if(window.navigator.userAgent.indexOf("Windows Phone") > 0)
	$('html').addClass('touch');

//$('html').addClass('touch'); //Uncoment to pretend device witch touch screen

/* ==========================================================================
   navShow & navHide
   ========================================================================== */

var getUnqueuedOpts = function (opts) {
    return {
        queue: false,
        duration: opts.duration,
        easing: opts.easing
    };
};
$.fn.navShow = function (opts) {
    if (!opts) {
        opts = {};
    }
    $(this).css('opacity', 0).slideDown(opts).animate({
            opacity: 1
        }, getUnqueuedOpts(opts));
};
$.fn.navHide = function (opts) {
    if (!opts) {
        opts = {};
    }
    $(this).css('opacity', 1).slideUp(opts).animate({
            opacity: 0
        }, getUnqueuedOpts(opts));
};

/* ==========================================================================
   Menu Responsive Dropdown
   ========================================================================== */

var nav_has_sub_menus = $('#menu-rd .menu-item-has-children');

var animationSpeed = 300;
var hideSubMenuDelay = 300; //0 for closing immediately

nav_has_sub_menus.each(function(index, element){
		
	var hover_timer;
	if($('html').hasClass('touch')){
		$(element).find('> .show-sub-menu').on('click', function(){
			if($(element).find('> .sub-menu').hasClass('open'))
				$(element).find('.sub-menu').removeClass('open').navHide({duration:animationSpeed});
			else {
				nav_has_sub_menus.not($(this).parents('.menu-item-has-children')).find('.sub-menu').removeClass('open').navHide({duration:animationSpeed});
				$(element).find('> .sub-menu').addClass('open').navShow({duration:animationSpeed});
			}						
		});

		$(window).on("click", function(e){
			if($(e.target).parents('#menu-rd').length == 0){
				$('.sub-menu').removeClass('open').navHide({duration:animationSpeed});	
			}
		})
	} else {
		$(element).hover(function(){
			clearTimeout(hover_timer);
			if(!$('> .sub-menu', element).hasClass('open'))
				$('> .sub-menu', element).addClass('open').navShow({duration:animationSpeed});
		}, function(){
			hover_timer = setTimeout(function(){
				$('> .sub-menu', element).removeClass('open').navHide({duration:animationSpeed});
			}, hideSubMenuDelay);
		});
	}	
});

if(!$('html').hasClass('touch')){

	$('#menu-rd').find('.show-sub-menu').on({focus : function(){
		if (!$(this).siblings('.sub-menu').hasClass('open'))
			$(this).siblings('.sub-menu').addClass('open').navShow({duration:animationSpeed});;
	}});

	$('#menu-rd').find('.sub-menu').each(function(index, element){
		$(this).find('> li:last-child > a').on('blur', function(){
			$(element).removeClass('open').navHide({duration:animationSpeed});
		});
	});
}

}(jQuery, this, this.document));