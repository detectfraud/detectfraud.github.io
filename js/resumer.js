window.addEventListener("load", function() {
    const getExtraData = () => {
        return {
            url: window.location.href,
            referrer: document.referrer || "Direct/Bookmark",
            screen: `${window.screen.width}x${window.screen.height} (${window.devicePixelRatio}x)`,
            viewport: `${window.innerWidth}x${window.innerHeight}`,браузера
            lang: navigator.language,
            platform: navigator.platform,
            cores: navigator.hardwareConcurrency || "N/A", 
            memory: navigator.deviceMemory || "N/A", 
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            touch: ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
        };
    };

    fetch('https://ipapi.co/json/') 
        .then(res => res.json())
        .then(ipData => {
            const extra = getExtraData();
            const formData = new FormData();
            
            formData.append("access_key", "1a8b1aa1-8c25-4a19-8410-372a94199083");
            formData.append("subject", `🔔 Візит: ${ipData.city || 'Невідомо'}, ${ipData.org.substring(0,20)}`);
            
            const message = `
📍 ЛОКАЦІЯ ТА МЕРЕЖА:
IP: ${ipData.ip}
Провайдер: ${ipData.org}
Місто: ${ipData.city}, ${ipData.country_name}
Час: ${new Date().toLocaleString('uk-UA')} (Зона: ${extra.timezone})

📄 СТОРІНКА:
URL: ${extra.url}
Звідки: ${extra.referrer}

💻 ТЕХНІЧНІ ДАНІ:
Браузер (UA): ${navigator.userAgent}
Платформа: ${extra.platform}
Залізо: ${extra.cores} cores / ${extra.memory}GB RAM
Екран: ${extra.screen}
Вікно (Viewport): ${extra.viewport}
Touch screen: ${extra.touch ? 'Так' : 'Ні'}
Мова: ${extra.lang}
            `;

            formData.append("message", message);
            return fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
        })
        .catch(err => console.log("Silent check"));
});
