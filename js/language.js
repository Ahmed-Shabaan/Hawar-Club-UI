/**
 * Language toggle (AR ↔ EN): dir, stylesheet, UI strings, gallery icons.
 */
(function () {
    var STORAGE_KEY = "hawar-lang";

    var I18N = {
        ar: {
            langLabel: "AR",
            langAria: "اللغة",
            home: "الرئيسية",
            about: "عن النادي",
            presidents: "رؤساء النادي",
            history: "تاريخ النادي",
            news: "الأخبار",
            renew: "تجديد العضوية",
            follow: "تابعنا",
            brandSub: "نادي الحوار للألعاب الرياضية",
            copyright: "جميع الحقوق محفوظة - نادي حوار الرياضي 2024 ©",
            footerTitle: "نادي الحوار للألعاب الرياضية",
            photoLibrary: "مكتبة الصور",
            photoGallery: "معرض الصور",
            galleryPrev: "السابق",
            galleryNext: "التالي",
            lightboxClose: "إغلاق",
            pageHistoryTitle: "تاريخ النادي",
            crumbHome: "الرئيسية",
            crumbAbout: "عن النادي",
            crumbHistory: "تاريخ النادي",
            searchCategory: "البحث عن فئة...",
            catAll: "الكل",
            catSports: "رياضة",
            catActivities: "انشطة",
            catClub: "النادى",
            catAcademies: "الاكاديميات"
        },
        en: {
            langLabel: "EN",
            langAria: "Language",
            home: "Home",
            about: "About",
            presidents: "Club Presidents",
            history: "Club History",
            news: "News",
            renew: "Renew Membership",
            follow: "Follow us",
            brandSub: "Hawar Sports Club",
            copyright: "All rights reserved - Hawar Sports Club 2024 ©",
            footerTitle: "Hawar Sports Club",
            photoLibrary: "Photo Library",
            photoGallery: "Photo Gallery",
            galleryPrev: "Previous",
            galleryNext: "Next",
            lightboxClose: "Close",
            pageHistoryTitle: "Club History",
            crumbHome: "Home",
            crumbAbout: "About",
            crumbHistory: "Club History",
            searchCategory: "Search category...",
            catAll: "All",
            catSports: "Sports",
            catActivities: "Activities",
            catClub: "The Club",
            catAcademies: "Academies"
        }
    };

    var MONTHS_AR = [
        "يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    var MONTHS_EN = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    function pad2(n) {
        return n < 10 ? "0" + n : String(n);
    }

    // AR: 09 ابريل 2025 | EN: 09 April 2025
    function formatHawarDate(iso, lang) {
        var parts = String(iso || "").split("-");
        if (parts.length < 3) return iso || "";

        var year = parseInt(parts[0], 10);
        var monthIndex = parseInt(parts[1], 10) - 1;
        var day = parseInt(parts[2], 10);
        if (isNaN(year) || isNaN(monthIndex) || isNaN(day)) return iso;

        var months = lang === "en" ? MONTHS_EN : MONTHS_AR;
        return pad2(day) + " " + months[monthIndex] + " " + year;
    }

    function applyDates(lang) {
        document.querySelectorAll("[data-date]").forEach(function (el) {
            el.textContent = formatHawarDate(el.getAttribute("data-date"), lang);
        });
    }

    function getLang() {
        return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "ar";
    }

    function setStylesheet(lang) {
        var link = document.getElementById("mainStylesheet");
        if (!link) return;
        link.href = lang === "en" ? "css/styleEN.css" : "css/styleAR.css";
    }

    function syncPaginationDirection(lang) {
        var rtl = lang !== "en";
        var prevIcon = rtl ? "bi bi-chevron-right" : "bi bi-chevron-left";
        var nextIcon = rtl ? "bi bi-chevron-left" : "bi bi-chevron-right";

        document.querySelectorAll(".pagination").forEach(function (pag) {
            var prev = pag.querySelector(".pagination-prev i");
            var next = pag.querySelector(".pagination-next i");
            if (prev) prev.className = prevIcon;
            if (next) next.className = nextIcon;
        });
    }

    function applyI18n(lang) {
        var dict = I18N[lang] || I18N.ar;

        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            var key = el.getAttribute("data-i18n");
            if (dict[key] != null) el.textContent = dict[key];
        });

        document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
            var key = el.getAttribute("data-i18n-aria");
            if (dict[key] != null) el.setAttribute("aria-label", dict[key]);
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
            var key = el.getAttribute("data-i18n-placeholder");
            if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
        });

        // Refresh activity filter label text after option i18n
        document.querySelectorAll("[data-activity-select]").forEach(function (root) {
            var label = root.querySelector(".activity-select-label");
            var allOpt = root.querySelector('[data-value="all"] .activity-select-option-label');
            var checked = root.querySelectorAll(
                '.activity-select-list [role="option"].is-checked:not([data-value="all"])'
            );
            var allChecked = root.querySelector('[data-value="all"].is-checked');
            if (!label) return;
            if (allChecked || checked.length === 0) {
                label.textContent = allOpt ? allOpt.textContent.trim() : dict.catAll;
            } else if (checked.length === 1) {
                var one = checked[0].querySelector(".activity-select-option-label");
                label.textContent = one ? one.textContent.trim() : "";
            } else {
                var first = checked[0].querySelector(".activity-select-option-label");
                label.textContent =
                    (first ? first.textContent.trim() : "") +
                    " +" +
                    (checked.length - 1);
            }
        });

        document.querySelectorAll(".language span").forEach(function (el) {
            el.textContent = dict.langLabel;
        });

        document.querySelectorAll(".language").forEach(function (el) {
            el.setAttribute("aria-label", dict.langAria);
        });

        if (document.body.classList.contains("page-history") || document.title) {
            var titleEl = document.querySelector("[data-i18n-title]");
            if (titleEl && dict[titleEl.getAttribute("data-i18n-title")]) {
                document.title = dict[titleEl.getAttribute("data-i18n-title")];
            }
        }

        applyDates(lang);
        syncPaginationDirection(lang);
    }

    function applyLang(lang, reload) {
        var html = document.documentElement;
        html.setAttribute("lang", lang === "en" ? "en" : "ar");
        html.setAttribute("dir", lang === "en" ? "ltr" : "rtl");
        localStorage.setItem(STORAGE_KEY, lang);
        window.__hawarLang = lang;
        setStylesheet(lang);
        applyI18n(lang);

        if (typeof window.syncGalleryDirection === "function") {
            window.syncGalleryDirection();
        }
        if (typeof window.syncImageGallerySliderDirection === "function") {
            window.syncImageGallerySliderDirection();
        }

        if (reload) {
            window.location.reload();
        }
    }

    function toggleLang() {
        var next = getLang() === "en" ? "ar" : "en";
        localStorage.setItem(STORAGE_KEY, next);
        // Full reload so Slick / layout re-init cleanly with new dir
        window.location.reload();
    }

    // Apply strings when DOM is ready (stylesheet already set in <head>)
    document.addEventListener("DOMContentLoaded", function () {
        applyI18n(getLang());

        document.querySelectorAll(".language").forEach(function (el) {
            el.addEventListener("click", toggleLang);
            el.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleLang();
                }
            });
        });
    });

    window.HawarLang = {
        get: getLang,
        apply: applyLang,
        toggle: toggleLang,
        t: function (key) {
            var dict = I18N[getLang()] || I18N.ar;
            return dict[key] != null ? dict[key] : key;
        }
    };
})();
