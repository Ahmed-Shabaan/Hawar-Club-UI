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
            contact: "تواصل معنا",
            beMember: "كن عضواً",
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
            catAcademies: "الاكاديميات",
            contactSubtitle: "تواصل معنا",
            address: "الموقع",
            addressText: "المشاية السفلية، ميت خميس وكفر الموجي، أول المنصورة، محافظة الدقهلية 7650048",
            phoneNumbers: "ارقام التليفون",
            emails: "الايميل",
            workingHours: "مواعيد العمل",
            workingHoursText: "يومياً من الساعة 8:00 صباحاً حتى الساعة 12:00 منتصف الليل.",
            joinMembership: "انضم للعضوية",
            homeHeroTitle1: "ملعب كرة القدم",
            homeHeroText1: "مرافق رياضية بمعايير عالمية لتدريب الفرق والناشئين، وبيئة محفّزة لكل من يعشق الحركة.",
            homeHeroTitle2: "مجتمع رياضي متكامل",
            homeHeroText2: "برامج تدريبية، بطولات، وأنشطة تجمع اللاعبين والعائلات في تجربة رياضية استثنائية.",
            homeHeroTitle3: "أكاديميات الحوار",
            homeHeroText3: "برامج تدريبية متخصصة للناشئين تحت إشراف مدربين محترفين في بيئة آمنة ومحفّزة.",
            homeHeroTitle4: "لياقة بلا حدود",
            homeHeroText4: "صالات ومرافق مفتوحة طوال اليوم لتناسب جدولك وتساعدك على تحقيق أهدافك الرياضية.",
            homeHeroTitle5: "بطولات وذكريات",
            homeHeroText5: "منافسات وفعاليات تجمع الأعضاء والعائلات في أجواء رياضية مليئة بالحماس والانتماء.",
            homeHeroCta: "عرض التفاصيل",
            homeIntroTitle: "نادٍ صُمم خصيصاً لمن لا يتوقفون عن الحركة.",
            homeIntroText1: "على مدار أكثر من عقدين، كان هوار بمثابة ملاذٍ خاص للعائلات والرياضيين المحترفين والهواة الشغوفين على حد سواء. وتمتد مرافقنا عبر مساحة ستين فداناً صُممت بعناية فائقة، لتجمع بين معايير الأداء العالية التي لا تقبل المساومة وأجواء الألفة والدفء التي تميز نوادي الأعضاء",
            homeIntroText2: "لقد صُمم كل ملعب وحوض سباحة واستوديو انطلاقاً من قناعة راسخة: وهي أن الرياضة -في أبهى صورها- تمثل أسلوب حياة.",
            homeDiscoverMore: "اكتشف قصتنا",
            homeWelcome: "مرحباً",
            homeLatestNews: "أحدث الأخبار",
            homeStoriesTitle: "قصص من النادي",
            homeViewAll: "شاهد الكل",
            homeStoryTitle1: "لوريم إيبسوم هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)",
            homeStoryText1: "كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص.",
            homeStoryTitle2: "لوريم إيبسوم هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)",
            homeStoryText2: "كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص.",
            homeStoryTitle3: "لوريم إيبسوم هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)",
            homeStoryText3: "كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكhomeJoinTextل عشوائي أخذتها من نص.",
            readMore: "اقرأ المزيد",
            homeAppLabel: "تطبيق جوال",
            homeAppTitle1: "ناديك،",
            homeAppTitle2: "في جيبك",
            homeAppText: "حمّل التطبيق الرسمي لنادي الحوار الرياضي، ولا تفوّت أي مباراة أو تحديث أو ميزة مخصصة للأعضاء.",
            homeAppNote: "تنزيل مجاني. متاح على iOS و Android",
            homeGetItOn: "احصل عليه من",
            homeDownloadOn: "حمّله من",
            homeJoinTitle: "انضم إلى عائلة الحوار",
            homeJoinText: " سواء كنت تفكر في الحصول على العضوية، أو تخطط لإقامة فعالية، أو تشعر ببساطة بالفضول لمعرفة المزيد عن الحياة في \"الحوار\"، فإن فريق خدمات الضيوف لدينا مستعد لمساعدتك.",
            homeFullName: "الاسم الكامل",
            homeEmail: "البريد الإلكتروني",
            homePhone: "رقم الهاتف",
            homeNamePlaceholder: "أدخل اسمك الكامل",
            homeEmailPlaceholder: "your@email.com",
            homePhonePlaceholder: "رقم الهاتف",
            homeSend: "إرسال"
        },
        en: {
            langLabel: "EN",
            langAria: "Language",
            home: "Home",
            about: "About",
            presidents: "Club Presidents",
            history: "Club History",
            news: "News",
            contact: "Contact Us",
            beMember: "Become a Member",
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
            catAcademies: "Academies",
            contactSubtitle: "Contact Us",
            address: "Location",
            addressText: "Al Mashayah Al Sofleyah, Mit Khamis and Kafr Al Mougi, First Mansoura, Dakahlia Governorate 7650048",
            phoneNumbers: "Phone numbers",
            emails: "Email",
            workingHours: "Working hours",
            workingHoursText: "Daily from 8:00 AM until 12:00 midnight.",
            joinMembership: "Join Membership",
            homeHeroTitle1: "Football Pitch",
            homeHeroText1: "World-class sports facilities for teams and juniors, built for everyone who loves to move.",
            homeHeroTitle2: "A complete sports community",
            homeHeroText2: "Training programs, tournaments, and activities that bring players and families together.",
            homeHeroTitle3: "Hawar Academies",
            homeHeroText3: "Specialized junior programs led by professional coaches in a safe, motivating environment.",
            homeHeroTitle4: "Fitness without limits",
            homeHeroText4: "Facilities open throughout the day to fit your schedule and help you reach your goals.",
            homeHeroTitle5: "Tournaments and memories",
            homeHeroText5: "Competitions and events that bring members and families together with energy and belonging.",
            homeHeroCta: "View Details",
            homeIntroTitle: "A club designed for those who never stop moving.",
            homeIntroText1: "For more than two decades, Hawar has been a private haven for families, professional athletes, and passionate amateurs alike. Our facilities span sixty carefully designed acres, combining uncompromising performance standards with the warmth and familiarity of a members' club.",
            homeIntroText2: "Every court, pool, and studio was designed from a clear belief: that sport—at its finest—is a way of life.",
            homeDiscoverMore: "Discover our story",
            homeWelcome: "Welcome",
            homeLatestNews: "Latest News",
            homeStoriesTitle: "Stories from the Club",
            homeViewAll: "View all",
            homeStoryTitle1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            homeStoryText1: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            homeStoryTitle2: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            homeStoryText2: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            homeStoryTitle3: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            homeStoryText3: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            readMore: "Read more",
            homeAppLabel: "Mobile App",
            homeAppTitle1: "Your club,",
            homeAppTitle2: "in your pocket",
            homeAppText: "Download the official Hawar Sports Club app, and never miss a match, update, or member-only feature.",
            homeAppNote: "Free download. Available on iOS and Android",
            homeGetItOn: "GET IT ON",
            homeDownloadOn: "Download on the",
            homeJoinTitle: "Join the Hawar Family",
            homeJoinText: "Whether you are considering membership, planning an event, or simply curious to learn more about life at \"Al-Hiwar,\" our Guest Services team is ready to assist you.",
            homeFullName: "Full Name",
            homeEmail: "Email Address",
            homePhone: "Phone Number",
            homeNamePlaceholder: "Enter your full name",
            homeEmailPlaceholder: "your@email.com",
            homePhonePlaceholder: "Phone number",
            homeSend: "SEND"
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
        if (typeof window.syncHomeLinkArrows === "function") {
            window.syncHomeLinkArrows();
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
