//Diese JS ist essentiell für den Hover Effect der Menu-Bar und den Übergang zur mobilen Dropdown menubar

// Menu-toggle button
$(document).ready(function() {
    $(".menu-icon").on("click", function() {
        $("nav ul").toggleClass("showing");
    });
});

// Scrolling Effect
$(window).on("scroll", function() {
    if($(window).scrollTop()) {
        $('nav').addClass('black');
    }

    else {
        $('nav').removeClass('black');
    }
})