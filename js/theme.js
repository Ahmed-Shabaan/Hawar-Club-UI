(function () {
    const html = document.documentElement;
    const toggle = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");

    // Light is default — only use saved preference if set
    const savedTheme = localStorage.getItem("theme");
    const currentTheme = savedTheme === "dark" ? "dark" : "light";

    setTheme(currentTheme);

    if (!toggle) return;

    toggle.addEventListener("click", function () {
        const nextTheme =
            html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        setTheme(nextTheme);
    });

    function setTheme(theme) {
        if (theme === "dark") {
            html.setAttribute("data-theme", "dark");
        } else {
            html.removeAttribute("data-theme");
        }

        localStorage.setItem("theme", theme);

        if (icon) {
            icon.className = theme === "dark" ? "bi bi-sun" : "bi bi-moon";
        }
    }
})();
