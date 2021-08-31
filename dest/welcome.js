$(document).ready(function() {
    const $buttonMove = $(".loading_content-button a");

    // click button move: after 2(s) move to homepage
    $buttonMove.on("click",function (e) {
        e.preventDefault(); //will stop the link href to call the homepage

        setTimeout(function () {
            window.location.href = "home.html"; //will redirect to homepage
        }, 2000); //will call the function after 2 secs.

    });
})