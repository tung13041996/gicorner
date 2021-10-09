$(document).ready(function () {
    $(".team__section").each(function() {
        const $wrapper = $(this),
              $item = $wrapper.find(".team__section-item");

        $item.each(function() {
            const $button = $(this).find(".team__section-item__button-more a"),
                  $closeBtn = $(this).find(".team__section-item__popup-close");

            // click button to open popup
            $button.on("click", function(e) {
                e.preventDefault();
                $("body").addClass("open-popup");
            });

            // click close button to close popup
            $closeBtn.on("click", function(e) {
                e.preventDefault();
                $("body").removeClass("open-popup");
            });
        });
    });
});