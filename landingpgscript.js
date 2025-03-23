document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper-container', {
        loop: true,  // Enable looping of slides
        autoplay: {
            delay: 300,  // Slide interval in milliseconds
            disableOnInteraction: false,  // Keep autoplay running after user interacts
        },
        pagination: {
            el: '.swiper-pagination',  // Pagination dots
            clickable: true,  // Allow clicking on dots
        },
        navigation: {
            nextEl: '.swiper-button-next',  // Next button
            prevEl: '.swiper-button-prev',  // Previous button
        },
    });
});
