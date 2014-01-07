(function ($) {
    "use strict";

    /*	Table OF Contents
	==========================
	1-Navigation 
	2-Accordain
	3-Tabs
	4-Blog-inner carousel
	5-Blog Masonary
	6-Flicker Feed
	7-Portfolio
	8-Home Page Featured Projects(3 Famous Projects)
	9-Testimonial
	10-Home Flexslider
	11-Latest blog Slider
	12-IE8-9 placeholder fix
	13-Google Maps
	*/

    /*==================================
	1-Navigation
	====================================*/

    $(window).scroll(function () { // scroll event 

        var windowTop = $(window).scrollTop(); // returns number

        if(windowTop >= 20) {
            if($('header').hasClass('navbar-fixed-top')) {
                $('#home').removeClass('fixed-home');
            }
        } else {
            if($('header').hasClass('navbar-fixed-top')) {
                $('#home').addClass('fixed-home');
            }
        }
    });



    /* HOVER ACTION LVL 1 */

    $('nav.main > ul > li').hover(function () {
        $(this).find('> ul').stop(true, true).slideDown(300);
    }, function () {
        $(this).find('> ul').slideUp(300);
    });



    /* ---------------------------------------------------------------------
            RESPONSIVE NAV
        --------------------------------------------------------------------- */

    $('header .nav-toggle').click(function () {

        $(this).toggleClass('active');
        $('nav.main').slideToggle(300);
    });

    // SELECT

    $('nav.main select').change(function () {
        var href = $(this).val();
        document.location.href = href;
    });


    /*==================================
	2-Accordain
	====================================*/
    $("#accordion").collapse();
    $('.panel-title > a').click(function () {
        $('.active .accordain-icon').addClass('icon-plus', 200).removeClass('icon-minus', 200);
        $('.active .accordain-icon').addClass('icon-plus', 200).removeClass('icon-minus', 200);
        $('.panel-title > a').removeClass('active');
        $(this).addClass('active');
        $('.active .accordain-icon').removeClass('icon-plus', 200).addClass('icon-minus', 200);
    });
    /*==================================
	3-Tabs
	====================================*/

    $('#tab-shortcode a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });


    /*================================
	4-Blog-inner carousel
	================================*/

    $(window).on("resize", function () {
        var carousel_nav = ($('.carousel-inner').height() / 2) - ($('.carousel-control').height() / 2);
        $('.carousel-control').css('top', carousel_nav + 'px');
        $('#carousel-portfolio').carousel();

        /*================================
	5-Blog Masonary
	================================*/

    }).resize();


    /*================================
	6-Flicker Feed
	================================*/

    /*================================
	7-Portfolio
	================================*/

    var $containerfolio = $('.showcase');
    if($containerfolio.length) {
        $containerfolio.isotope({
            layoutMode: 'fitRows',
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
    }

    $('#filter-out li a').click(function () {
        $('#filter-out li').removeClass("active");
        $(this).parent().addClass("active");
        var selector = $(this).attr('data-filter');
        $containerfolio.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });

    /*==================================================
	8-Home Page Featured Projects(3 Famous Projects)
	====================================================*/


    $('.showcase-images').bind('inview', function (event, visible) {
        if(visible === true) {
            $('.showcase-images .center').addClass("animated bounceInUp");
            $('.showcase-images .left').addClass("animated fadeInLeftBig");
            $('.showcase-images .right').addClass("animated fadeInRightBig");
        }
    });

    $('.about-pic').bind('inview', function (event, visible) {
        if(visible === true) {
            $('.about-pic').addClass("animated fadeInLeftBig");
        }
    });
    $('.blog').bind('inview', function (event, visible) {
        if(visible === true) {
            $('.blog').addClass("animated fadeInLeft");
        }
    });

    /* Make It Fade Custom Home Page */

    /* Make it Fade - Defaults */
    $('.makeitfade-default').bind('inview', function (event, visible) {
        if(visible === true) {
            $(this).addClass("animated fadeInUp");
        }
    });

    $('makeitfade-right-default').bind('inview', function (event, visible) {
        if(visible === true) {
            $(this).addClass("animated fadeInRight");
        }
    });
	
    $('makeitfade-left-default').bind('inview', function (event, visible) {
        if(visible === true) {
            $(this).addClass("animated fadeInLeft");
        }
    });

    /* Make it Fade - On Scroll */

    /*================================
	9-Testimonial
	================================*/


    /*================================
	10-Home Flexslider
	================================*/



    /*================================
	11-Latest blog Slider
	================================*/

    /*================================
	12-IE8-9 placeholder fix
	================================*/


    $('input[placeholder]').each(function () {
        var input = $(this);
        $(input).val(input.attr('placeholder'));
        $(input).focus(function () {
            if(input.val() === input.attr('placeholder')) {
                input.val('');
            }
        });
        $(input).blur(function () {
            if(input.val() === '' || input.val() === input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        });
    });

		
	
    /*================================
	13-AJAX Form
	================================*/
    $('#contact-form').submit(function(e){
		e.preventDefault();
		var $form = $(this);
		
		var hasErrors = false;
		var errorMessage = "";
		if ($('#contact_message').val() == ''){
			hasErrors = true;
			errorMessage = "Please enter a message";
		}
		if ($('#contact_email').val() == 'Email'){
			hasErrors = true;
			errorMessage = "Please enter your Email address";
		}
		if ($('#contact_name').val() == 'Name'){
			hasErrors = true;
			errorMessage = "Please enter your Name";
		}
		
		
		if (hasErrors) {
			var $errorResponse = $form.parent().find('.response-errors');
			$errorResponse.find('.section-heading').text(errorMessage);
			$form.slideUp(200);
			$errorResponse.slideDown(200);
			window.tempTimer = setTimeout(function(){
				$errorResponse.slideUp(200);
				$form.slideDown(200);
			}, 2000);
			return;
		} else{
			errorMessage = "";
			$form.parent().find('.response-errors').find('.section-heading').text(errorMessage);
		}
		
		var formData = $form.serialize();
		$form.find('input[type=text], textarea').css({'background': '#d3d3d3'}).attr('disabled', 'disabled');
		
		$.ajax({
			url: $form.attr('action'),
			type: 'post',
			data: formData,
			success: function(data){
				if (data == 1) {
					$form.slideUp(200);
					$('#contact_name, #contact_email, #contact_message').val('')
					var $response  = $form.parent().find('.response-message');
					$response.slideDown(200);
					window.tempTimer = setTimeout(function(){
						$form.find('input[type=text], textarea').css({'background': 'none'}).removeAttr('disabled');
						$response.slideUp(200);
						$form.slideDown(200);
					}, 4000);
				}
			}
		})
		
		return;
	});
	
	$('.response-message, .response-errors').click(function(e){
		e.preventDefault();
		clearTimeout(window.tempTimer);
		$('#contact-form').find('input[type=text], textarea').css({'background': 'none'}).removeAttr('disabled');
		$('.response-message, .response-errors').slideUp(200);
		$('#contact-form').slideDown(200);
	});



})(jQuery);