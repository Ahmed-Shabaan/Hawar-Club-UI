/**
 * Navbar search + search results page
 */
(function () {
    var SEARCH_DEBOUNCE_MS = 400;

    var SEARCH_INDEX = [
        {
            id: 1,
            categoryKey: "searchCatNews",
            title: {
                ar: "لوريم إيبسوم هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)",
                en: "Lorem Ipsum is simply dummy text (meaning form, not content)"
            },
            excerpt: {
                ar: "كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص.",
                en: "Lorem Ipsum has been the industry's standard dummy text since the 1500s, when an unknown printer scrambled a galley of type."
            },
            image: "images/search/1.png",
            url: "newsDetails.html"
        },
        {
            id: 2,
            categoryKey: "searchCatFootball",
            title: {
                ar: "فريق كرة القدم يستعد للموسم الجديد في نادي الحوار",
                en: "Hawar Club football team prepares for the new season"
            },
            excerpt: {
                ar: "كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص.",
                en: "Lorem Ipsum has been the industry's standard dummy text since the 1500s, when an unknown printer scrambled a galley of type."
            },
            image: "images/search/2.png",
            url: "newsDetails.html"
        },
        {
            id: 3,
            categoryKey: "searchCatBasketball",
            title: {
                ar: "بطولة كرة السلة السنوية تنطلق قريباً في نادي الحوار",
                en: "Annual basketball tournament launches soon at Hawar Club"
            },
            excerpt: {
                ar: "كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص.",
                en: "Lorem Ipsum has been the industry's standard dummy text since the 1500s, when an unknown printer scrambled a galley of type."
            },
            image: "images/search/3.jpg",
            url: "newsDetails.html"
        },
        {
            id: 4,
            categoryKey: "searchCatNews",
            title: {
                ar: "أخبار النادي: افتتاح مرفق رياضي جديد لخدمة الأعضاء",
                en: "Club news: new sports facility opens for members"
            },
            excerpt: {
                ar: "كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص.",
                en: "Lorem Ipsum has been the industry's standard dummy text since the 1500s, when an unknown printer scrambled a galley of type."
            },
            image: "images/search/4.jpg",
            url: "newsDetails.html"
        },
        {
            id: 5,
            categoryKey: "searchCatEvents",
            title: {
                ar: "فعاليات النادي: معرض رياضي للناشئين يجمع المواهب الصاعدة",
                en: "Club events: youth sports exhibition gathers rising talents"
            },
            excerpt: {
                ar: "كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص.",
                en: "Lorem Ipsum has been the industry's standard dummy text since the 1500s, when an unknown printer scrambled a galley of type."
            },
            image: "images/search/5.jpg",
            url: "newsDetails.html"
        }
    ];

    function t(key) {
        if (window.HawarLang && typeof window.HawarLang.t === "function") {
            return window.HawarLang.t(key);
        }
        return key;
    }

    function getLang() {
        if (window.HawarLang && typeof window.HawarLang.get === "function") {
            return window.HawarLang.get();
        }
        return "ar";
    }

    function normalize(value) {
        return String(value || "").trim().toLowerCase();
    }

    function getQueryFromUrl() {
        return new URLSearchParams(window.location.search).get("q") || "";
    }

    function isSearchPage() {
        return /search\.html$/i.test(window.location.pathname);
    }

    function filterSearchResults(query) {
        var q = normalize(query);
        if (!q) return [];

        return SEARCH_INDEX.filter(function (item) {
            var fields = [
                item.title.ar,
                item.title.en,
                item.excerpt.ar,
                item.excerpt.en,
                t(item.categoryKey)
            ];

            return fields.some(function (field) {
                return normalize(field).indexOf(q) !== -1;
            });
        });
    }

    function getReadMoreIconClass() {
        return getLang() === "en" ? "bi bi-arrow-right" : "bi bi-arrow-left";
    }

    function renderSearchCard(item) {
        var lang = getLang();
        var title = item.title[lang] || item.title.ar;
        var excerpt = item.excerpt[lang] || item.excerpt.ar;
        var category = t(item.categoryKey);

        return (
            '<div class="card mb-5 position-relative search-result-card">' +
                '<span class="position-absolute top-0 translate-middle badge rounded-3">' +
                    escapeHtml(category) +
                "</span>" +
                '<div class="row g-0">' +
                    '<div class="col-md-3">' +
                        '<img src="' + escapeHtml(item.image) + '" class="img-fluid rounded-4 p-2 object-fit-cover object-position-top" alt="">' +
                    "</div>" +
                    '<div class="col-md-9">' +
                        '<div class="card-body p-3">' +
                            "<h5 class=\"card-title\">" + escapeHtml(title) + "</h5>" +
                            "<p class=\"card-text\">" + escapeHtml(excerpt) + "</p>" +
                            '<a href="' + escapeHtml(item.url) + '" class="d-flex align-items-center gap-2 readMore">' +
                                '<span data-i18n="readMore">' + escapeHtml(t("readMore")) + "</span>" +
                                '<i class="' + getReadMoreIconClass() + ' mx-2"></i>' +
                            "</a>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>"
        );
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function updateSearchSummary(query) {
        var summary = document.getElementById("searchResultsSummary");
        if (!summary) return;

        var trimmed = String(query || "").trim();
        if (!trimmed) {
            summary.textContent = "";
            summary.hidden = true;
            return;
        }

        summary.textContent = t("searchResultsFor") + " «" + trimmed + "»";
        summary.hidden = false;
    }

    function renderSearchPrompt() {
        return (
            '<div class="search-empty search-empty--prompt">' +
                '<p class="search-empty-text">' + escapeHtml(t("searchPrompt")) + "</p>" +
            "</div>"
        );
    }

    function renderSearchNoResults() {
        return (
            '<div class="search-empty search-empty--no-results">' +
                '<div class="search-empty-illustration" aria-hidden="true">' +
                    '<img class="search-empty-image search-empty-image--light" src="images/search/empty-light.svg" alt="">' +
                    '<img class="search-empty-image search-empty-image--dark" src="images/search/empty-dark.svg" alt="">' +
                "</div>" +
                '<p class="search-empty-text" data-i18n="searchNoResults">' + escapeHtml(t("searchNoResults")) + "</p>" +
            "</div>"
        );
    }

    function renderSearchPage(query) {
        var container = document.getElementById("searchResults");
        if (!container) return;

        var trimmed = String(query || "").trim();
        var results = trimmed ? filterSearchResults(trimmed) : [];

        updateSearchSummary(trimmed);

        if (!trimmed) {
            container.innerHTML = renderSearchPrompt();
            return;
        }

        if (!results.length) {
            container.innerHTML = renderSearchNoResults();
            return;
        }

        container.innerHTML = results.map(renderSearchCard).join("");
    }

    function syncNavbarInputs(value) {
        document.querySelectorAll(".navbar-search-input").forEach(function (input) {
            if (input.value !== value) {
                input.value = value;
            }
        });
    }

    function openNavbarSearchForQuery() {
        document.querySelectorAll(".navbar-search").forEach(function (wrap) {
            var toggle = wrap.querySelector(".navbar-search-toggle");
            wrap.classList.add("is-open");
            if (toggle) toggle.setAttribute("aria-expanded", "true");
        });
    }

    function buildSearchUrl(query) {
        var trimmed = String(query || "").trim();
        if (!trimmed) return "search.html";
        return "search.html?q=" + encodeURIComponent(trimmed);
    }

    function runSearch(query) {
        var trimmed = String(query || "").trim();

        if (isSearchPage()) {
            var nextUrl = buildSearchUrl(trimmed);
            window.history.replaceState({}, "", nextUrl);
            syncNavbarInputs(trimmed);
            renderSearchPage(trimmed);
            return;
        }

        if (!trimmed) return;
        window.location.href = buildSearchUrl(trimmed);
    }

    function initNavbarSearch() {
        var wraps = document.querySelectorAll(".navbar-search");
        if (!wraps.length) return;

        var debounceTimer = null;

        function closeSearch(wrap) {
            var toggle = wrap.querySelector(".navbar-search-toggle");
            var input = wrap.querySelector(".navbar-search-input");

            wrap.classList.remove("is-open");
            if (toggle) toggle.setAttribute("aria-expanded", "false");
            if (input) input.blur();
        }

        function openSearch(wrap) {
            var toggle = wrap.querySelector(".navbar-search-toggle");
            var input = wrap.querySelector(".navbar-search-input");

            wraps.forEach(function (other) {
                if (other !== wrap) closeSearch(other);
            });

            wrap.classList.add("is-open");
            if (toggle) toggle.setAttribute("aria-expanded", "true");

            if (input) {
                window.requestAnimationFrame(function () {
                    input.focus();
                });
            }
        }

        wraps.forEach(function (wrap) {
            var toggle = wrap.querySelector(".navbar-search-toggle");
            var form = wrap.querySelector(".navbar-search-form");
            var input = wrap.querySelector(".navbar-search-input");

            if (!toggle || !form || !input) return;

            toggle.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();

                if (wrap.classList.contains("is-open")) {
                    closeSearch(wrap);
                } else {
                    openSearch(wrap);
                }
            });

            form.addEventListener("submit", function (event) {
                event.preventDefault();
                var value = String(input.value || "").trim();

                if (!value) {
                    input.focus();
                    return;
                }

                runSearch(value);
            });

            input.addEventListener("input", function () {
                var value = String(input.value || "").trim();
                syncNavbarInputs(value);

                window.clearTimeout(debounceTimer);
                debounceTimer = window.setTimeout(function () {
                    if (!value) {
                        if (isSearchPage()) runSearch("");
                        return;
                    }
                    runSearch(value);
                }, SEARCH_DEBOUNCE_MS);
            });
        });
    }

    function initSearchPage() {
        if (!isSearchPage()) return;

        var query = getQueryFromUrl();
        syncNavbarInputs(query);

        if (query) {
            openNavbarSearchForQuery();
        }

        renderSearchPage(query);
    }

    document.addEventListener("DOMContentLoaded", function () {
        initNavbarSearch();
        initSearchPage();
    });
})();
