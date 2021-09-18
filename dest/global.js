$(document).ready(function () {
    // mouse
    let mouseMove = function() {
        // var
        const $mouseWrapper = $(".mouse");
        let $link = $('a'); //all hyperlink

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

        // hide wrapper and wrapper parent
        timeline.to(settings.wrapper, {autoAlpha: 0, duration: .3});
        timeline.to(settings.wrapper.parent(), {autoAlpha: 0, duration: .3});
    }

    /*mobile menu*/
    let mobileMenuAccordion = function (options) {
        // default options
        let settings = $.extend({
            parent_ul: '.nav__mobile ul.nav__mobile-section--menu', // select ul to init
            active_one_at_once: true, // only active one sub menu at a time
            active_child: true, // active sub menu if there is a current item inside of it (only for the first item)
            active_child_class: '.current-menu-item', // class to detect current item
            skip_from_level: 999, // skip sub menu from level
            button_inner: '<i class="fas fa-chevron-down"></i>', // html inside the button
            trigger_with_empty_link: true, // empty will also trigger sub menu
            empty_link_selector: 'li.menu-no-click > a', // custom empty link selector
        }, options);

        // click hamburger button to show mobile menu
        $('.hamburger_button').on('click', function(e) {
            e.stopPropagation();
            $('html').toggleClass("open-mobile-menu");
            $(this).find(".nav-hamburger-line").toggleClass("active");
        });

        //click outside to close menu
        let $mobileMenu = $("nav .nav__mobile-inner");
        $('body').on('click', function(e) {
               if (!$mobileMenu.is(e.target) && $mobileMenu.has(e.target).length === 0) {
                   $('html').removeClass("open-mobile-menu");
                   $(".nav-hamburger-line").removeClass("active");
               }
        })

        // find all submenu using recursion
        function recursionSubmenu($li_items, subLevel) {
            if (subLevel <= settings.skip_from_level) {
                $li_items.each(function () {
                    let $li = $(this), $ul_inner = $li.children('ul');
                    if ($ul_inner.length) {
                        // set sub level
                        $ul_inner.addClass("level-" + subLevel);
                        $ul_inner.hide(); // sub menu is hidden by default

                        // add button
                        $li.addClass('has-sub-menu');
                        $('<button class="open-sub-menu">' + settings.button_inner + '</button>').insertAfter($li.children('a'));

                        // look for inner sub
                        $ul_inner.children("li").each(function () {
                            recursionSubmenu($(this), subLevel + 1);
                        });
                    }
                });
            }
        }

        // generate html
        $(settings.parent_ul).each(function () {
            $(this).addClass("level-1");
            recursionSubmenu($(this).children("li"), 2);
        });

        // click dropdown button
        let $buttons = $(settings.parent_ul).find('button.open-sub-menu');
        $buttons.click(function () {
            let $this = $(this),
                $this_li_parent = $this.closest('li.has-sub-menu'),
                $this_submenu = $this_li_parent.children('ul');

            if (settings.active_one_at_once) {
                // close all other active items (in the same level)
                let $this_level_ul_parent = $this_li_parent.closest("ul"),
                    $opening_li = $this_level_ul_parent.children("li.has-sub-menu.active:not(#" + $this_li_parent.attr("id") + ")"),
                    $opening_button = $opening_li.children('button.open-sub-menu.active');

                if ($opening_li.length && !$this.hasClass("active")) {
                    $opening_button.removeClass('active');
                    $opening_li.removeClass('active');
                    $opening_li.children('ul').slideUp();
                }
            }

            // toggle this
            $this_li_parent.toggleClass('active');
            $this.toggleClass('active');
            $this_submenu.slideToggle();
        });

        // show sub if there is a current item inside (only for the first item)
        if (settings.active_child) {
            let $current_item = $(settings.parent_ul).find(settings.active_child_class).eq(0),
                $this_li_parent;
            if ($current_item.length) {
                $this_li_parent = $current_item.parents("li.has-sub-menu");
                $this_li_parent.each(function () {
                    $(this).children('button.open-sub-menu').trigger('click');
                });
            }
        }

        // set trigger on empty link
        if (settings.trigger_with_empty_link) {
            $(settings.parent_ul).find('a[href="#"]' + "," + settings.empty_link_selector).click(function (e) {
                if ($(this).next('button.open-sub-menu').length) {
                    e.preventDefault();
                    $(this).next('button.open-sub-menu').trigger('click');
                }
            });
        }
    };

    /*parallax image*/
    let backgroundParallax = function() {
        $("[data-parallax]").each(function(){
            // update source image
            let $image = $(this).find("img"),
                $srcImage = $image.attr("src");
            $(this).css("background-image", "url(" + $srcImage + ")");



            const $target = $(this);

            // update when scrolling
            window.addEventListener("scroll", () => {
                // max distance is where the target disappear from viewport, counting from the middle
                const maxDistance = window.innerHeight * 0.5 + $target.height() * 0.5;

                // offset to the middle of target
                const targetOffset = $target.offset().top + $target.height() * 0.5;

                // position where the image has the best display
                let windowPosition = window.innerHeight * 0.5;

                // if missing top spacing
                if(targetOffset <= maxDistance){
                    windowPosition = targetOffset;
                }

                // if missing bottom spacing
                const offsetBottom = $(document).height() - $target.offset().top - $target.height();
                const targetBottomOffset = offsetBottom + $target.height() * 0.5;
                if(targetBottomOffset <= maxDistance){
                    windowPosition = window.innerHeight - targetBottomOffset;
                }

                // offset to the window position
                const windowOffset = window.scrollY + windowPosition;

                // distance from middle of target to middle of viewport
                const distance = targetOffset - windowOffset;

                // only run parallax when target is inside viewport
                if(distance > -maxDistance && distance < maxDistance){
                    // we already have 50%, so we need another 50% to fill up 100%
                    // the other 50% is vary base on the distance
                    const parallaxValue = 50 + (distance / maxDistance) * 50;

                    // update background position
                    $target.css("backgroundPosition", `center ${parallaxValue}%`);
                }
            });
        });
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
    mobileMenuAccordion();
    backgroundParallax();
});