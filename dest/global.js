$(document).ready(function () {
    // mouse
    let mouseMove = function() {
        // var
        const $mouseWrapper = $(".mouse");
        let $link = $('[class*="button_"]'); //all hyperlink

        $mouseWrapper.each(function() {
            const $mouseRound = $(this).find(".mouse__round"), //round shape move to mouse
                  $mousePoint = $(this).find(".mouse__point"); //point move to mouse

            //the mouse move in window => round shape move to mouse
            $(window).on("mousemove", function (e) {
                let positionXRound = e.pageX - $mouseRound.outerWidth() / 2, //position of round when mouse move in window in axis-x
                    positionYRound = e.pageY - $mouseRound.outerHeight() / 2, //position of round when mouse move in window in axis-y
                    positionXPoint = e.pageX - $mousePoint.width() / 2, //position of point when mouse move in window in axis-x
                    positionYPoint = e.pageY - $mousePoint.height() / 2, //position of point when mouse move in window in axis-y
                    scale = 1; //size of round shape

                // hyperlink is hover => scale twice
                $link.each(function () {
                    let $this = $(this),
                        positionLinkLeft = $this.offset().left, //position left of button in axis-x
                        positionLinkRight = $this.offset().left + $this.outerWidth(), //position right of button in axis-x
                        positionLinkTop = $this.offset().top, //position top of button in axis-y
                        positionLinkBottom = $this.offset().top + $this.outerHeight(); //position bottom of button in axis-y

                    //check mouse inside the button
                    if (positionXRound >= positionLinkLeft
                        && positionXRound <= positionLinkRight
                        && positionYRound >= positionLinkTop
                        && positionYRound <= positionLinkBottom) {
                        scale = 2;
                    }
                });
                gsap.to($mouseRound, {
                    x: positionXRound,
                    y: positionYRound,
                    scale: scale,
                    duration: .6
                });
                gsap.to($mousePoint, {
                    x: positionXPoint,
                    y: positionYPoint,
                    duration: .2
                });
            });
        });
    }


    // init function
    mouseMove();
});