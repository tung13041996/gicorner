$(document).ready(function() {
    gsap.registerPlugin(ScrollTrigger);

    let timeline = gsap.timeline({
        scrollTrigger: {
            trigger:"body",
            start:"top top",
            end:"bottom bottom",
            scrub: true,
        }
    });

    timeline.to($(".square"), {
        rotate: "360deg",
        backgroundColor:"#ff0000",
        borderRadius: "50%",
        duration: 1,
    },0);
})