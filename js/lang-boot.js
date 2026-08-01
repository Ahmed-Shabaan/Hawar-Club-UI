/**
 * Runs in <head> before main stylesheet paint.
 * Restores saved language (ar | en) onto <html>.
 */
(function () {
    var lang = localStorage.getItem("hawar-lang") === "en" ? "en" : "ar";
    var html = document.documentElement;
    html.setAttribute("lang", lang === "en" ? "en" : "ar");
    html.setAttribute("dir", lang === "en" ? "ltr" : "rtl");
    window.__hawarLang = lang;
})();
