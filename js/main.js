(function () {
    var SCROLL_CONFIGS = [
        {
            wrap: ".president-scroll",
            content: ".president-details",
            track: ".president-scrollbar",
            thumb: ".president-scrollbar-thumb"
        },
        {
            wrap: ".news-details-scroll",
            content: ".news-details-content",
            track: ".news-details-scrollbar",
            thumb: ".news-details-scrollbar-thumb"
        }
    ];

    function setupCustomScroll(wrap, contentSel, trackSel, thumbSel) {
        var content = wrap.querySelector(contentSel);
        var track = wrap.querySelector(trackSel);
        var thumb = wrap.querySelector(thumbSel);

        if (!content || !track || !thumb) return;

        var dragging = false;
        var startY = 0;
        var startScrollTop = 0;

        function updateThumb() {
            // Mobile: no custom scrollbar — full content visible
            if (window.matchMedia("(max-width: 768px)").matches) {
                track.classList.remove("is-visible");
                wrap.style.height = "";
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

            // Keep track aligned to the visible content box
            wrap.style.height = clientHeight + "px";

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

        track.addEventListener("mousedown", function (e) {
            if (e.target === thumb) return;

            var rect = track.getBoundingClientRect();
            var metrics = getScrollMetrics();
            var clickY = e.clientY - rect.top;
            var ratio = (clickY - metrics.thumbHeight / 2) / metrics.maxTop;

            content.scrollTop =
                Math.max(0, Math.min(1, ratio)) * metrics.maxScroll;
        });

        content.addEventListener("scroll", updateThumb, { passive: true });
        window.addEventListener("resize", updateThumb);
        updateThumb();
        requestAnimationFrame(updateThumb);
        window.addEventListener("load", updateThumb);
    }

    function initCustomScrolls() {
        SCROLL_CONFIGS.forEach(function (cfg) {
            document.querySelectorAll(cfg.wrap).forEach(function (wrap) {
                setupCustomScroll(wrap, cfg.content, cfg.track, cfg.thumb);
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initCustomScrolls);
    } else {
        initCustomScrolls();
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
    initNewsSlider(dir);
    initImageGalleries();
    initActivitySelects();
    initImageGallerySliders();
});

// News details: main image + thumbnail strip
function initImageGallerySliders() {
    var sliders = document.querySelectorAll("[data-image-gallery-slider]");
    if (!sliders.length) return;

    sliders.forEach(function (root) {
        setupImageGallerySlider(root);
    });

    syncImageGallerySliderDirection();
}

function getSliderThumbVisibleCount() {
    if (window.matchMedia("(max-width: 576px)").matches) return 2;
    if (window.matchMedia("(max-width: 768px)").matches) return 3;
    return 5;
}

function syncImageGallerySliderDirection() {
    var labels = galleryLabels();
    document.querySelectorAll("[data-image-gallery-slider]").forEach(function (root) {
        var prevBtn = root.querySelector(".image-gallery_slider-arrow-prev");
        var nextBtn = root.querySelector(".image-gallery_slider-arrow-next");
        setChevronIcon(prevBtn, true);
        setChevronIcon(nextBtn, false);
        if (prevBtn) prevBtn.setAttribute("aria-label", labels.prev);
        if (nextBtn) nextBtn.setAttribute("aria-label", labels.next);
        if (typeof root._sliderUpdate === "function") {
            root._sliderUpdate();
        }
    });
}

window.syncImageGallerySliderDirection = syncImageGallerySliderDirection;

function setupImageGallerySlider(root) {
    var mainImg = root.querySelector(".image-gallery_slider-main");
    var track = root.querySelector(".image-gallery_slider-track");
    var thumbs = Array.prototype.slice.call(
        root.querySelectorAll(".image-gallery_slider-thumb")
    );
    var prevBtn = root.querySelector(".image-gallery_slider-arrow-prev");
    var nextBtn = root.querySelector(".image-gallery_slider-arrow-next");
    if (!mainImg || !track || !thumbs.length) return;

    var index = Math.max(
        0,
        thumbs.findIndex(function (t) {
            return t.classList.contains("is-active");
        })
    );
    var offset = 0;

    function maxOffset() {
        var visible = getSliderThumbVisibleCount();
        return Math.max(0, thumbs.length - visible);
    }

    function update() {
        var visible = getSliderThumbVisibleCount();
        var max = maxOffset();
        if (offset > max) offset = max;

        // Hide arrows when fewer than 5 thumbs (no strip overflow on desktop layout)
        var showArrows = thumbs.length >= 5;
        var needsScroll = thumbs.length > visible;

        track.classList.toggle("is-centered", !showArrows || !needsScroll);

        if (prevBtn) {
            prevBtn.hidden = !showArrows;
            if (showArrows) {
                var mutePrev = !needsScroll || offset <= 0;
                prevBtn.classList.toggle("is-muted", mutePrev);
                prevBtn.disabled = mutePrev;
            }
        }
        if (nextBtn) {
            nextBtn.hidden = !showArrows;
            if (showArrows) {
                var muteNext = !needsScroll || offset >= max;
                nextBtn.classList.toggle("is-muted", muteNext);
                nextBtn.disabled = muteNext;
            }
        }

        // Move by one thumb width + gap, using measured first thumb
        if (track.classList.contains("is-centered")) {
            track.style.transform = "";
            return;
        }
        var step = 0;
        if (thumbs[0] && offset > 0) {
            var style = window.getComputedStyle(track);
            var gap = parseFloat(style.columnGap || style.gap) || 0;
            step = thumbs[0].getBoundingClientRect().width + gap;
        }
        var rtl = isPageRtl();
        var px = offset * step;
        track.style.transform = "translateX(" + (rtl ? px : -px) + "px)";
    }

    function selectThumb(i) {
        if (i < 0 || i >= thumbs.length) return;
        index = i;
        thumbs.forEach(function (thumb, ti) {
            thumb.classList.toggle("is-active", ti === index);
        });
        var src = thumbs[index].getAttribute("data-src") ||
            (thumbs[index].querySelector("img") && thumbs[index].querySelector("img").src);
        if (src) {
            mainImg.src = src;
            var thumbImg = thumbs[index].querySelector("img");
            if (thumbImg && thumbImg.alt) mainImg.alt = thumbImg.alt;
        }

        var visible = getSliderThumbVisibleCount();
        if (index < offset) offset = index;
        if (index >= offset + visible) offset = index - visible + 1;
        update();
    }

    thumbs.forEach(function (thumb, i) {
        thumb.addEventListener("click", function () {
            selectThumb(i);
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            if (offset <= 0) return;
            offset -= 1;
            update();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            if (offset >= maxOffset()) return;
            offset += 1;
            update();
        });
    }

    root._sliderUpdate = update;
    window.addEventListener("resize", update);
    selectThumb(index);
}

// Multi-select activity filter with search
function initActivitySelects() {
    var roots = document.querySelectorAll("[data-activity-select]");
    if (!roots.length) return;

    function closeAll(except) {
        roots.forEach(function (root) {
            if (except && root === except) return;
            var trigger = root.querySelector(".activity-select-trigger");
            var menu = root.querySelector(".activity-select-menu");
            if (!trigger || !menu) return;
            trigger.setAttribute("aria-expanded", "false");
            menu.hidden = true;
            root.classList.remove("is-open");
        });
    }

    roots.forEach(function (root) {
        var trigger = root.querySelector(".activity-select-trigger");
        var menu = root.querySelector(".activity-select-menu");
        var label = root.querySelector(".activity-select-label");
        var list = root.querySelector(".activity-select-list");
        var searchInput = root.querySelector(".activity-select-search-input");
        var nativeSelect = root.querySelector("select.activity-select");
        if (!trigger || !menu || !label || !list) return;

        var options = Array.prototype.slice.call(
            list.querySelectorAll('[role="option"]')
        );

        function getOptionLabel(opt) {
            var textEl = opt.querySelector(".activity-select-option-label");
            return (textEl ? textEl.textContent : opt.textContent).trim();
        }

        function itemOptions() {
            return options.filter(function (opt) {
                return opt.getAttribute("data-value") !== "all";
            });
        }

        function allOption() {
            return options.find(function (opt) {
                return opt.getAttribute("data-value") === "all";
            });
        }

        function isChecked(opt) {
            return opt.classList.contains("is-checked");
        }

        function setChecked(opt, checked) {
            opt.classList.toggle("is-checked", checked);
            opt.setAttribute("aria-selected", checked ? "true" : "false");
        }

        function syncAllFromItems() {
            var all = allOption();
            if (!all) return;
            var items = itemOptions();
            var every = items.length > 0 && items.every(isChecked);
            setChecked(all, every);
        }

        function updateTriggerLabel() {
            var all = allOption();
            var items = itemOptions();
            var selected = items.filter(isChecked);

            if (all && isChecked(all) && selected.length === items.length) {
                label.textContent = getOptionLabel(all);
                return;
            }
            if (selected.length === 0) {
                label.textContent = all ? getOptionLabel(all) : "—";
                return;
            }
            if (selected.length === 1) {
                label.textContent = getOptionLabel(selected[0]);
                return;
            }
            label.textContent =
                getOptionLabel(selected[0]) + " +" + (selected.length - 1);
        }

        function syncNativeSelect() {
            if (!nativeSelect) return;
            var selectedValues = options
                .filter(isChecked)
                .map(function (opt) {
                    return opt.getAttribute("data-value");
                });

            Array.prototype.forEach.call(nativeSelect.options, function (opt) {
                opt.selected = selectedValues.indexOf(opt.value) !== -1;
            });
            nativeSelect.dispatchEvent(new Event("change", { bubbles: true }));
        }

        function refresh() {
            syncAllFromItems();
            updateTriggerLabel();
            syncNativeSelect();
        }

        trigger.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var willOpen = trigger.getAttribute("aria-expanded") !== "true";
            closeAll(willOpen ? root : null);
            trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
            menu.hidden = !willOpen;
            root.classList.toggle("is-open", willOpen);
            if (willOpen && searchInput) {
                searchInput.value = "";
                options.forEach(function (opt) {
                    opt.hidden = false;
                });
                setTimeout(function () {
                    searchInput.focus();
                }, 0);
            }
        });

        menu.addEventListener("click", function (e) {
            e.stopPropagation();
        });

        options.forEach(function (option) {
            option.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                var value = option.getAttribute("data-value");
                var next = !isChecked(option);

                if (value === "all") {
                    options.forEach(function (opt) {
                        setChecked(opt, next);
                    });
                } else {
                    setChecked(option, next);
                    syncAllFromItems();
                }

                updateTriggerLabel();
                syncNativeSelect();
            });
        });

        if (searchInput) {
            searchInput.addEventListener("input", function () {
                var q = searchInput.value.trim().toLowerCase();
                options.forEach(function (opt) {
                    var text = getOptionLabel(opt).toLowerCase();
                    opt.hidden = q !== "" && text.indexOf(q) === -1;
                });
            });

            searchInput.addEventListener("click", function (e) {
                e.stopPropagation();
            });

            searchInput.addEventListener("keydown", function (e) {
                e.stopPropagation();
                if (e.key === "Escape") {
                    closeAll();
                    trigger.focus();
                }
            });
        }

        refresh();
    });

    document.addEventListener("click", function () {
        closeAll();
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeAll();
    });
}

// News Slick Slider — 1 slide at a time
function initNewsSlider(dir) {
    if (typeof jQuery === "undefined" || typeof jQuery.fn.slick === "undefined") {
        console.error("Slick Slider: jQuery or Slick is not loaded");
        return;
    }

    var $slider = jQuery(".news-slider .slider, .talentNews-slider .slider");
    if ($slider.length === 0) return;

    $slider.each(function () {
        var $el = jQuery(this);

        if ($el.hasClass("slick-initialized")) {
            $el.slick("unslick");
        }

        $el.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            rtl: dir === "rtl",
            autoplay: false,
            dots: true,
            arrows: false,
            infinite: true,
            speed: 500
        });
    });
}

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
