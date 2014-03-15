;(function ($, window, document, undefined) {
	"use strict";

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

var $nav_awning = $('#mastermenu-awning');

var $nav = $('#mastermenu');

//useful for WordPress
//$nav.find('.sub-menu').before('<button class="show-sub-menu"><i class="icon icon-plus"></i></button>');

var $nav_awning_button = $nav_awning.find('#awning-button');

var $nav_has_sub_menus = $nav.find('.menu-item-has-children');

var animationSpeed = 300;
var hideSubMenuDelay = 300; //0 for closing immediately

$nav_has_sub_menus.each(function(index, element){

	var hover_timer;
	if($('html').hasClass('touch')){
		$(element).find('> .show-sub-menu').on('click', function(){
			if($(element).find('> .sub-menu').hasClass('open'))
				$(element).find('.sub-menu').removeClass('open').navHide({duration:animationSpeed});
			else {
				$nav_has_sub_menus.not($(this).parents('.menu-item-has-children')).find('.sub-menu').removeClass('open').navHide({duration:animationSpeed});
				$(element).find('> .sub-menu').addClass('open').navShow({duration:animationSpeed});
			}
		});

		$(window).on("click", function(e){
			if($(e.target).parents('#menu-rd').length == 0){
				$('.sub-menu').removeClass('open').navHide({duration:animationSpeed});
			}
		});
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

	$nav.find('.show-sub-menu').on({focus : function(){
		if (!$(this).siblings('.sub-menu').hasClass('open'))
			$(this).siblings('.sub-menu').addClass('open').navShow({duration:animationSpeed});;
	}});

	$nav.find('.sub-menu').each(function(index, element){
		$(this).find('> li:last-child > a').on('blur', function(){
			$(element).removeClass('open').navHide({duration:animationSpeed});
		});
	});
}

$nav_awning_button.on('click', function(){
	$nav.slideToggle(animationSpeed);
});

}(jQuery, this, this.document));