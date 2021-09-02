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

    /*loading page*/
    function loadingAnimation(options) {
        let settings = $.extend({
                wrapper: '', // element wrap lines
                total: 10, // number of lines
                oddBg: 'red', // color code of odd line
                evenBg: 'blue', // color code of even line
                lineStagger: .03, // delay between each line
                lineDuration: .5
            }, options),
            timeline = gsap.timeline(),
            $oddLines, $evenLines;

        // if wrapper doesn't exist
        if (!settings.wrapper.length) return;

        // create lines
        for (let i = 0; i < settings.total; i++) {
            let style = `height:${settings.wrapper.height() / settings.total}px;`;
            style += `background-color:${i % 2 === 0 ? settings.oddBg : settings.evenBg}`;
            $(`<div class="line" style="${style}"></div>`).appendTo(settings.wrapper);
        }

        $oddLines = settings.wrapper.find('.line:nth-child(odd)');
        $evenLines = settings.wrapper.find('.line:nth-child(even)');

        // first screen has background like main background
        settings.wrapper.css("background-color","#fefaf9");
        // move odd line to main screen
        // staggerFromTo (oddLine reverse, 0s, {x=-100%}, {x=0})
        timeline.staggerFromTo($oddLines.get().reverse(), settings.lineDuration,
            {x: '100%'},
            {
                x: 0,
                stagger: function (index) {
                    return (2 * index + 1) * settings.lineStagger;
                }
            },
            {
                each:0,
                amount:0
            },
            0
        );


        //move even line to main screen
        // staggerFromTo (evenLine reverse, 0.2s, {x=-100%}, {x=0})
        timeline.staggerFromTo($evenLines.get().reverse(), settings.lineDuration,
            {x: '100%'},
            {
                x: 0,
                stagger: function (index) {
                    return (2 * index + 1) * settings.lineStagger;
                }
            },
            {
                each:0,
                amount:0
            },
            settings.lineDuration,
        );

        // set background for wrapper like background color of even line
        timeline.to(settings.wrapper, {backgroundColor: settings.evenBg, duration: 0});


        //move even line to main screen
        // staggerFromTo (evenLine reverse, after even before run, {x=-100%}, {x=100%})

        timeline.staggerTo($oddLines.get().reverse(), settings.lineDuration,
            {
                x: '-100%',
                stagger: function (index) {
                    return (2 * index + 1) * settings.lineStagger;
                }
            },
        );

        // hide wrapper
        timeline.to(settings.wrapper, {autoAlpha: 0, duration: .3});
    }


    // init function
    mouseMove();
    loadingAnimation({
        wrapper: $('.line-animation-wrapper'),
        total: 20,
        oddBg: '#108241',
        evenBg: '#d7f1ef',
        lineStagger: .02,
        lineDuration: .4
    })
});