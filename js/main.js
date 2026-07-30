(function () {
    function initPresidentScroll() {
        var wraps = document.querySelectorAll(".president-scroll");

        wraps.forEach(function (wrap) {
            var content = wrap.querySelector(".president-details");
            var track = wrap.querySelector(".president-scrollbar");
            var thumb = wrap.querySelector(".president-scrollbar-thumb");

            if (!content || !track || !thumb) return;

            var dragging = false;
            var startY = 0;
            var startScrollTop = 0;

            function updateThumb() {
                // Mobile: no custom scrollbar — full content visible
                if (window.matchMedia("(max-width: 768px)").matches) {
                    track.classList.remove("is-visible");
                    content.style.maxHeight = "";
                    content.scrollTop = 0;
                    return;
                }

                var scrollHeight = content.scrollHeight;
                var clientHeight = content.clientHeight;

                if (scrollHeight <= clientHeight + 1) {
                    track.classList.remove("is-visible");
                    return;
                }

                track.classList.add("is-visible");

                var ratio = clientHeight / scrollHeight;
                var thumbHeight = Math.max(ratio * clientHeight, 32);
                var maxTop = clientHeight - thumbHeight;
                var top =
                    maxTop <= 0
                        ? 0
                        : (content.scrollTop / (scrollHeight - clientHeight)) * maxTop;

                thumb.style.height = thumbHeight + "px";
                thumb.style.top = top + "px";
                thumb.style.transform = "";
            }

            function getScrollMetrics() {
                var scrollHeight = content.scrollHeight;
                var clientHeight = content.clientHeight;
                var thumbHeight = Math.max(
                    (clientHeight / scrollHeight) * clientHeight,
                    32
                );
                var maxTop = clientHeight - thumbHeight;
                var maxScroll = scrollHeight - clientHeight;

                return { thumbHeight: thumbHeight, maxTop: maxTop, maxScroll: maxScroll };
            }

            // Drag thumb with mouse
            thumb.addEventListener("mousedown", function (e) {
                e.preventDefault();
                e.stopPropagation();
                dragging = true;
                startY = e.clientY;
                startScrollTop = content.scrollTop;
                document.body.style.userSelect = "none";
                track.classList.add("is-dragging");
            });

            document.addEventListener("mousemove", function (e) {
                if (!dragging) return;

                var metrics = getScrollMetrics();
                if (metrics.maxTop <= 0) return;

                var deltaY = e.clientY - startY;
                var scrollDelta = (deltaY / metrics.maxTop) * metrics.maxScroll;
                content.scrollTop = startScrollTop + scrollDelta;
            });

            document.addEventListener("mouseup", function () {
                if (!dragging) return;
                dragging = false;
                document.body.style.userSelect = "";
                track.classList.remove("is-dragging");
            });

            // Click on track to jump
            track.addEventListener("mousedown", function (e) {
                if (e.target === thumb) return;

                var rect = track.getBoundingClientRect();
                var metrics = getScrollMetrics();
                var clickY = e.clientY - rect.top;
                var ratio = (clickY - metrics.thumbHeight / 2) / metrics.maxTop;

                content.scrollTop = Math.max(
                    0,
                    Math.min(1, ratio)
                ) * metrics.maxScroll;
            });

            content.addEventListener("scroll", updateThumb, { passive: true });
            window.addEventListener("resize", updateThumb);
            updateThumb();
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initPresidentScroll);
    } else {
        initPresidentScroll();
    }
})();


// Presidents Slick Slider show 3 elements on desktop, 2 on tablet, 1 on mobile
function initMultiSlider(dir) {
    if (typeof jQuery === "undefined" || typeof jQuery.fn.slick === "undefined") {
        console.error("Slick Slider: jQuery or Slick is not loaded");
        return;
    }

    var $slider = jQuery(".president-slider .slider");
    if ($slider.length === 0) return;

    if ($slider.hasClass("slick-initialized")) {
        $slider.slick("unslick");
    }

    var slideCount = $slider.children().length;
    var showDots = slideCount > 2;

    $slider.slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        rtl: dir === "rtl",
        autoplay: true,
        autoplaySpeed: 3000,
        dots: showDots,
        arrows: false,
        infinite: true,
        speed: 500,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: showDots
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: showDots
                }
            }
        ]
    });
}

jQuery(function () {
    var dir = document.documentElement.getAttribute("dir") || "ltr";
    initMultiSlider(dir);
});
