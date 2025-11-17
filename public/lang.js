let currentLang = localStorage.getItem("lang") || "en";
loadLanguage(currentLang);

function setLanguage(lang) {
    localStorage.setItem("lang", lang);
    loadLanguage(lang);

    // обновляем флаг
    const flagMap = {
        en: "https://flagcdn.com/w40/us.png",
        ru: "https://flagcdn.com/w40/ru.png",
        kg: "https://flagcdn.com/w40/kg.png"
    };
    document.getElementById("current-flag").src = flagMap[lang];
}

function loadLanguage(lang) {
    fetch(`/lang/${lang}.json`)
        .then(r => r.json())
        .then(data => {
            document.querySelectorAll("[data-translate]").forEach(el => {
                let key = el.getAttribute("data-translate");
                if (data[key]) el.innerText = data[key];
            });
        });

    // обновляем плейсхолдеры отдельно
    fetch(`/lang/${lang}.json`)
        .then(r => r.json())
        .then(data => {
            if (data.loginPlaceholder)
                document.getElementById("login").placeholder = data.loginPlaceholder;

            if (data.passwordPlaceholder)
                document.getElementById("password").placeholder = data.passwordPlaceholder;
        });
}
