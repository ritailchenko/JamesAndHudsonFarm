(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
$(window).on('scroll', function(){

    var navpos = $(".nav-position").position().top;
    var currentScroll = $(window).scrollTop();

    var navHeight = $(".nav-content").height();
    
    if(navpos < currentScroll) {
        $("header").addClass("sticky");
        $(".nav-position").height(navHeight);
    } else {
        $("header").removeClass("sticky");
        $(".nav-position").height(0);
    }

});

var testimonials = $('.testimonial-text');
if(testimonials.length) {
    testimonials.each(function(){
        var text = $(this).text();
        var words = text.split(' ');
        if(words.length > 60){
            var concatText = words.slice(0, 60).join(' ');
            $(this).html(`
                <span class="text-less">${concatText}... <a href="#" class="read-more">Read More</a></span>
                <span class="text-more" style="display: none;">
                    ${text} <a href="#" class="read-less">Read Less</a></span>
                </span>
            `)
        }
    })
    $(".carousel").slick({
        speed: 300,
        autoplay: true,
        autoplaySpeed: 6000,
        pauseOnHover: true,
        pauseOnFocus: true,
    }).on('beforeChange', function() {
        $('.text-more').hide();
        $('.text-less').show();
    });
}

$(document).on('click','.read-more',function(){
    $(this)
        .parent()
        .hide()
        .parent()
        .find('.text-more')
        .show();
    return false;
});

$(document).on('click','.read-less',function(){
    $(this)
        .parent()
        .hide()
        .parent()
        .find('.text-less')
        .show();
    return false;
});

$(".mobile-nav").on("click", function() {
    var nav = $(this);
    var navContainer = $(".nav-list");
    if(nav.hasClass("open")) {
        nav.removeClass("open");
        navContainer.removeClass("open");
    } else {
        nav.addClass("open");
        navContainer.addClass("open");
    }
});

$("*[data-toggle='modal']").on("click", function() {
   
    modal = $(this);
    var title = modal.attr('data-title');
    var type = modal.attr('data-type');
    if(type == "html") {
        var bodyId = modal.attr('data-body');
        var bodyContent = $(bodyId).html();
    } else {
        var source =  modal.attr('data-src');
        var imgArray = source.split(',');
        var bodyContent = "";
        imgArray.forEach((image, index) => {
            bodyContent += `<div style="background: #FFF url(${image.trim()}) center center no-repeat; outline: none; background-size: contain;"><img class="img-fluid" src="/img/hero-placeholder.png" alt="${title + '' + index}" /></div>`;
        });
        bodyContent = "<div class='modal-slide'>"+bodyContent+"</div>";
        $(".modal-slide").slick('unslick');
        
    }

    $("#modal").find(".modal-title").html(title);
    $("#modal").find(".modal-body").html(bodyContent);
    $(".modal-slide").slick({
        adaptiveHeight: true,
        infinite: true,
        speed: 1000,
        fade: false,
        cssEase: 'linear',
        dots: false,
        autoplay: true
    });
    $(".modal-dialog").attr('style','opacity: 0 !important');
    setTimeout(function(){
        $(".modal-slide").slick('setPosition');
    }, 300);
    setTimeout(function(){
        $(".modal-dialog").animate({opacity: 1}, 300);
    }, 320);

    
})

$(".jumper").on('click', function(e) {
    var target = $(this).attr("href");

    if($(target).length){
        var navContainer = $(".nav-list");
        var nav = $(".mobile-nav");
        nav.removeClass("open");
        navContainer.removeClass("open");
        var pos =  $(target).offset().top - 55;
        $('html, body').animate({
            scrollTop: pos
            }, 800, function() {
                // Add hash (#) to URL when done scrolling (default click behavior)
                history.pushState(null, null, target);
               
                
            });
        return false;
    } else {
        window.location = '/'+target;
        return true;
    }
});

$("#contact-form form").on('submit', function(e) {

    e.preventDefault();
    var contactForm = $("#contact-form form");
    var formData = contactForm.serialize();
    var formUrl = contactForm.attr('action');

    $(".form-group").each(function(item) {
        var currentItem = $(this);
        var fields = currentItem.find("select, input, textarea");
        if(fields.length){
            var valueItem = fields.val() || "";
            if(fields.attr("id") == "email"){
                var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
                if(!pattern.test(valueItem)){
                    valueItem = false;
                }
            }
            // console.log('validating ' + valueItem);
            if(currentItem.hasClass("required") && (!valueItem || valueItem == "")){
                currentItem.addClass("has-error");
            }
        }
    });
    if($(".has-error").length) {
        return false;
    } else {
        submitForm(contactForm,formData,formUrl);
    }
    return false;

});

function submitForm(contactForm,formData,url) {

    $.ajax({
        url,
        type: "POST",
        data: formData,
        success: function(){
            contactForm.hide();
            $(".thank-you").fadeIn();
        }
    });

}

$(".required input, .required select, .required textarea").on("change", function() {
    $(this).parent().removeClass("has-error");
});

(function( $ ) {

	/*
		Author: Michael Rosario
	*/
 
    $.fn.lazyImages = function() {

    	let currentContainer = this;

        // Set pixelRatio to 1 if the browser doesn't offer it up.
        var pixelRatio = !!window.devicePixelRatio ? window.devicePixelRatio : 1;

    	const lazyImageLoad = () => {

    		currentContainer.each(function(index){
	
                let currentClass = $(this);
	
    		  	if ($(window).scrollTop()+$(window).height() >= currentClass.offset().top + currentClass.height()/9.5 && !currentClass.hasClass("loaded")) {
					
                    let containerStyle = currentClass.attr("data-style") || "";
                    if(containerStyle != ""){
                        currentClass.attr("style",containerStyle);
                    }

                    currentClass
                        .addClass("loaded")
						.find(".lazy-image")
                        .addClass("lazy-loaded")
						.each(function(){
    		      		
    		       			var img = $(this).attr('data-image') || '';
                            var style = $(this).attr('data-style') || '';
                            var imgStyle = $(this).attr('data-img-style') || '';
                            
                            if (pixelRatio > 1 || ($(window).width() <= 768 && $(window).width() > 311)) {
    
                                var retinaImg = $(this).attr('data-retina') || '';
                                if(retinaImg){ img = retinaImg; }
                            }

    		        		var alt = $(this).attr('data-alt') || "image "+index;
    		        		var className = $(this).attr('data-class') || "lazy-image-"+index;
    		        		if(img){
                                $(this).hide();
                                if(style){ $(this).attr("style",style); }
                                $(this).html(`<img class='${className}' alt='${alt}' src='${img}' ${imgStyle ? `style='${imgStyle}'` : ''} />`).fadeIn();
                            }
    	
    		    	});
    		 	}
    		});

    	}

    	lazyImageLoad();
 
    	$(window).scroll(function(){ 

    		lazyImageLoad();
    		
    	});

	}
}( jQuery ));

$('section').lazyImages();


},{}]},{},[1]);
