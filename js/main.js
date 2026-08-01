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
    initImageGalleries();
});

/*==============================================================================
    Global Image Gallery + Lightbox (classes only, RTL + LTR)
==============================================================================*/

function isPageRtl() {
    return (document.documentElement.getAttribute("dir") || "rtl") === "rtl";
}

function galleryLabels() {
    if (window.HawarLang && typeof window.HawarLang.t === "function") {
        return {
            prev: window.HawarLang.t("galleryPrev"),
            next: window.HawarLang.t("galleryNext"),
            close: window.HawarLang.t("lightboxClose")
        };
    }
    return isPageRtl()
        ? { prev: "السابق", next: "التالي", close: "إغلاق" }
        : { prev: "Previous", next: "Next", close: "Close" };
}

function setChevronIcon(btn, pointingStart) {
    if (!btn) return;
    var icon = btn.querySelector("i");
    if (!icon) return;
    var rtl = isPageRtl();
    // pointingStart = toward gallery start (prev)
    // RTL: start is right → chevron-right; LTR: start is left → chevron-left
    var cls = pointingStart
        ? rtl
            ? "bi bi-chevron-right"
            : "bi bi-chevron-left"
        : rtl
          ? "bi bi-chevron-left"
          : "bi bi-chevron-right";
    icon.className = cls;
}

function syncGalleryDirection() {
    var labels = galleryLabels();
    var rtl = isPageRtl();

    document.querySelectorAll(".image-gallery").forEach(function (gallery) {
        var prevBtn = gallery.querySelector(".image-gallery-arrow-prev");
        var nextBtn = gallery.querySelector(".image-gallery-arrow-next");
        setChevronIcon(prevBtn, true);
        setChevronIcon(nextBtn, false);
        if (prevBtn) prevBtn.setAttribute("aria-label", labels.prev);
        if (nextBtn) nextBtn.setAttribute("aria-label", labels.next);
        if (typeof gallery._galleryUpdate === "function") {
            gallery._galleryUpdate();
        }
    });

    var lightbox = document.querySelector(".gallery-lightbox");
    if (lightbox) {
        var prev = lightbox.querySelector(".gallery-lightbox-prev");
        var next = lightbox.querySelector(".gallery-lightbox-next");
        var closeBtn = lightbox.querySelector(".gallery-lightbox-close");
        setChevronIcon(prev, true);
        setChevronIcon(next, false);
        if (prev) prev.setAttribute("aria-label", labels.prev);
        if (next) next.setAttribute("aria-label", labels.next);
        if (closeBtn) closeBtn.setAttribute("aria-label", labels.close);
    }

    return rtl;
}

window.syncGalleryDirection = syncGalleryDirection;

function initImageGalleries() {
    var galleries = document.querySelectorAll(".image-gallery");
    if (!galleries.length) return;

    ensureGalleryLightbox();
    syncGalleryDirection();

    galleries.forEach(function (gallery) {
        setupImageGallery(gallery);
    });
}

function ensureGalleryLightbox() {
    if (document.querySelector(".gallery-lightbox")) return;

    var labels = galleryLabels();
    var rtl = isPageRtl();
    var prevIcon = rtl ? "bi bi-chevron-right" : "bi bi-chevron-left";
    var nextIcon = rtl ? "bi bi-chevron-left" : "bi bi-chevron-right";

    var lightbox = document.createElement("div");
    lightbox.className = "gallery-lightbox";
    lightbox.hidden = true;
    lightbox.innerHTML =
        '<div class="gallery-lightbox-backdrop"></div>' +
        '<button type="button" class="gallery-lightbox-close" aria-label="' +
        labels.close +
        '"><i class="bi bi-x-lg"></i></button>' +
        '<button type="button" class="gallery-lightbox-prev" aria-label="' +
        labels.prev +
        '"><i class="' +
        prevIcon +
        '"></i></button>' +
        '<figure class="gallery-lightbox-figure"><img class="gallery-lightbox-img" src="" alt=""></figure>' +
        '<button type="button" class="gallery-lightbox-next" aria-label="' +
        labels.next +
        '"><i class="' +
        nextIcon +
        '"></i></button>';

    document.body.appendChild(lightbox);
}

function getGalleryVisibleCount() {
    if (window.matchMedia("(max-width: 576px)").matches) return 1;
    if (window.matchMedia("(max-width: 768px)").matches) return 2;
    if (window.matchMedia("(max-width: 992px)").matches) return 3;
    return 5;
}

function setupImageGallery(gallery) {
    var track = gallery.querySelector(".image-gallery-track");
    var items = Array.prototype.slice.call(
        gallery.querySelectorAll(".image-gallery-item")
    );
    var prevBtn = gallery.querySelector(".image-gallery-arrow-prev");
    var nextBtn = gallery.querySelector(".image-gallery-arrow-next");

    if (!track || !items.length) return;

    var index = 0;

    function maxIndex() {
        return Math.max(0, items.length - getGalleryVisibleCount());
    }

    function updateArrows() {
        var showArrows = items.length > getGalleryVisibleCount();
        var max = maxIndex();

        if (prevBtn) prevBtn.hidden = !showArrows;
        if (nextBtn) nextBtn.hidden = !showArrows;

        if (!showArrows) {
            index = 0;
        } else {
            index = Math.min(index, max);
        }

        setArrowMuted(prevBtn, index <= 0);
        setArrowMuted(nextBtn, index >= max);
    }

    function updateTrack() {
        var first = items[0];
        if (!first) return;

        var itemWidth = first.getBoundingClientRect().width;
        var styles = window.getComputedStyle(track);
        var gap = parseFloat(styles.columnGap || styles.gap) || 0;
        var offset = Math.round(index * (itemWidth + gap));
        var x = isPageRtl() ? offset : -offset;

        track.style.transform = "translate3d(" + x + "px, 0, 0)";
        updateArrows();
    }

    function go(delta) {
        var max = maxIndex();
        index = Math.max(0, Math.min(max, index + delta));
        updateTrack();
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            if (prevBtn.disabled) return;
            go(-1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            if (nextBtn.disabled) return;
            go(1);
        });
    }

    items.forEach(function (item, i) {
        item.addEventListener("click", function () {
            openGalleryLightbox(items, i);
        });
    });

    window.addEventListener("resize", function () {
        updateTrack();
    });

    gallery._galleryUpdate = updateTrack;
    updateTrack();
    gallery._galleryItems = items;
}

function setArrowMuted(btn, muted) {
    if (!btn) return;
    btn.disabled = !!muted;
    btn.classList.toggle("is-muted", !!muted);
    btn.setAttribute("aria-disabled", muted ? "true" : "false");
}

function openGalleryLightbox(items, startIndex) {
    var lightbox = document.querySelector(".gallery-lightbox");
    if (!lightbox) return;

    syncGalleryDirection();

    var img = lightbox.querySelector(".gallery-lightbox-img");
    var closeBtn = lightbox.querySelector(".gallery-lightbox-close");
    var backdrop = lightbox.querySelector(".gallery-lightbox-backdrop");
    var prevBtn = lightbox.querySelector(".gallery-lightbox-prev");
    var nextBtn = lightbox.querySelector(".gallery-lightbox-next");
    var current = startIndex;
    var rtl = isPageRtl();

    function updateLightboxArrows() {
        setArrowMuted(prevBtn, current <= 0);
        setArrowMuted(nextBtn, current >= items.length - 1);
    }

    function render() {
        var thumb = items[current].querySelector("img");
        if (!thumb || !img) return;
        img.src = thumb.currentSrc || thumb.src;
        img.alt = thumb.alt || "";
        updateLightboxArrows();
    }

    function close() {
        lightbox.hidden = true;
        document.body.style.overflow = "";
        document.removeEventListener("keydown", onKey);
    }

    function onKey(e) {
        if (e.key === "Escape") close();

        // Physical arrow keys: Left/Right follow reading direction
        if (e.key === "ArrowRight") {
            if (rtl) {
                if (current > 0) {
                    current -= 1;
                    render();
                }
            } else if (current < items.length - 1) {
                current += 1;
                render();
            }
        }
        if (e.key === "ArrowLeft") {
            if (rtl) {
                if (current < items.length - 1) {
                    current += 1;
                    render();
                }
            } else if (current > 0) {
                current -= 1;
                render();
            }
        }
    }

    render();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    closeBtn.onclick = close;
    backdrop.onclick = close;
    prevBtn.onclick = function () {
        if (current <= 0) return;
        current -= 1;
        render();
    };
    nextBtn.onclick = function () {
        if (current >= items.length - 1) return;
        current += 1;
        render();
    };
}
