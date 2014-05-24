;(function ($, window, document, undefined) {
	"use strict";

/* ==========================================================================
   Menu Responsive Dropdown
   ========================================================================== */

var $nav_menu = $('.masternav__menu'),
	$nav_sub_menus = $('.sub-menu', $nav_menu),
	$nav_has_sub_menus = $('.menu-item-has-children', $nav_menu),

	animationSpeed = 300,
	hideSubMenuDelay = 300; //0 for closing immediately

//useful for WordPress
//$nav_sub_menus.before('<button class="show-sub-menu icon-angle-down"></button>');

function closeNav() {
	$(this).removeClass('open').slideUp({duration:animationSpeed});;
}

function openNav() {
	$(this).addClass('open').slideDown({duration:animationSpeed});
}

// Open/close on click (touch screens) and focus on "tab"
$('.show-sub-menu', $nav_menu).each(function(i, element){
	var $submenu = $(element).siblings('.sub-menu');
	$(element).on({
		click : function(e){
			if ($('html').hasClass('touch'))
				if($submenu.hasClass('open'))
					closeNav.call($submenu);
				else {
					closeNav.call($nav_has_sub_menus.not($submenu.parents('.menu-item-has-children')).find('.sub-menu'));
					openNav.call($submenu);
				}
		},
		keyup : function(e){
			openNav.call($submenu);
		}
	});
});

// Open/close on mouseenter/mouseleave (standard screens)
if (!$('html').hasClass('touch')){
	$nav_has_sub_menus.each(function(index, element){
		var hover_timer;
		var $submenu = $('> .sub-menu', element);
		$(element).on({mouseenter : function(){
			clearTimeout(hover_timer);
			if(!$submenu.hasClass('open'))
				openNav.call($submenu);
		}, mouseleave : function(){
			hover_timer = setTimeout(function(){
				closeNav.call($submenu);
			}, hideSubMenuDelay);
		}});
	});
}

// Close submenus when clicking outside menu
$(window).on("click", function(e){
	if ($(e.target).parents('.masternav__menu').length == 0)
		closeNav.call($nav_sub_menus);
});

// Close after last "tab"
$nav_sub_menus.each(function(index, element){
	$(element).find('> li:last-child > a').on('blur', function(){
		closeNav.call(element);
	});
});

// Open/close menu for smartphones
$('.masternav__awning__button').on('click', function(){
	$nav_menu.slideToggle(animationSpeed);
});

}(jQuery, this, this.document));