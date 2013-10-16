/**
 * Builds the navigation
 * @type {{bindEvents: Function, init: Function}}
 */
var Navigation = {
	bindEvents: function(){
		$('.container .content').children().hide().first().fadeIn(600);
		$('.footer').hide().fadeIn(600);
		$('.navigation').click(function(){
			Navigation.showContent($(this));
			return false;
		});
	},
	showContent: function(clickedElement, callback){
		$('.footer').fadeOut(200);
		$('.container .content').children().fadeOut(300);
		$('.container .content div.' + $(clickedElement).attr('data-content')).delay(300).fadeIn(300);
		$('.footer').delay(300).fadeIn(300);
		if(callback){
			setTimeout(function() {
				callback();
			}, 300);
		}
	},
	showFirstContent: function(callback){
		Navigation.showContent($('.navigation.first'), callback);
	},
	init: function(){
		Navigation.bindEvents();
	}
}