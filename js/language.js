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
            renew: "تجديد العضوية",
            follow: "تابعنا",
            brandSub: "نادي الحوار للألعاب الرياضية",
            copyright: "جميع الحقوق محفوظة - نادي حوار الرياضي 2024 ©",
            footerTitle: "نادي الحوار للألعاب الرياضية",
            photoLibrary: "مكتبة الصور",
            galleryPrev: "السابق",
            galleryNext: "التالي",
            lightboxClose: "إغلاق",
            pageHistoryTitle: "تاريخ النادي",
            crumbHome: "الرئيسية",
            crumbAbout: "عن النادي",
            crumbHistory: "تاريخ النادي"
        },
        en: {
            langLabel: "EN",
            langAria: "Language",
            home: "Home",
            about: "About",
            presidents: "Club Presidents",
            history: "Club History",
            renew: "Renew Membership",
            follow: "Follow us",
            brandSub: "Hawar Sports Club",
            copyright: "All rights reserved - Hawar Sports Club 2024 ©",
            footerTitle: "Hawar Sports Club",
            photoLibrary: "Photo Library",
            galleryPrev: "Previous",
            galleryNext: "Next",
            lightboxClose: "Close",
            pageHistoryTitle: "Club History",
            crumbHome: "Home",
            crumbAbout: "About",
            crumbHistory: "Club History"
        }
    };

    function getLang() {
        return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "ar";
    }

    function setStylesheet(lang) {
        var link = document.getElementById("mainStylesheet");
        if (!link) return;
        link.href = lang === "en" ? "css/styleEN.css" : "css/styleAR.css";
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
