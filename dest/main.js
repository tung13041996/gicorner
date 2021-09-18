$(document).ready(function() {

    // slider home banner
    let homeBannerSlider = function() {
        $('#banner-carousel').flickity({
            cellAlign: 'left',
            contain: true,
            wrapAround: true,
            selectedAttraction: 0.015,
            friction: 0.42,
            autoPlay: 4500,
            pauseAutoPlayOnHover: false,
            prevNextButtons: false,
            pageDots: false
        });
    }


    /*innit function*/
    homeBannerSlider();

});