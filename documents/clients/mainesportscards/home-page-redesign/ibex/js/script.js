/* Author:
	First Name, Last Name:: iBec Creative :: Month Year
*/

var $ = jQuery.noConflict();

$(document).ready(function(){

	$('iframe').mediaWrapper();
	$('table').tableit();
	$( '#nav li:has(ul)' ).doubleTapToGo();

	// Prevents external links from changing the origin, which could lead to phishing attacks.
	// Demo: http://codepen.io/akselkreis/pen/EgxPvA
	$('a[target="_blank"]:not([rel="noopener noreferrer"])').each(function(){
		$(this).attr('rel','noopener noreferrer').addClass('external');
	});
});


$(window).load(function() {

	
});
