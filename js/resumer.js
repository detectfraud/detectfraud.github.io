window.addEventListener("DOMContentLoaded", function() {
    // Функція відправки даних
    const sendData = (ipInfo = {}) => {
        const extra = {
            url: window.location.href,
            ref: document.referrer || "Direct",
            screen: `${window.screen.width}x${window.screen.height}`,
            ua: navigator.userAgent,
            lang: navigator.language,
            res: window.devicePixelRatio || 1
        };

        const formData = new FormData();
        formData.append("access_key", "1a8b1aa1-8c25-4a19-8410-372a94199083");
        formData.append("subject", `🔔 Візит: ${ipInfo.city || 'Н/Д'}, ${ipInfo.org || 'Н/Д'}`);
        
        const message = `
📍 МЕРЕЖА:
IP: ${ipInfo.ip || 'Не вдалося визначити'}
Провайдер: ${ipInfo.org || 'Н/Д'}
Місто: ${ipInfo.city || 'Н/Д'}, ${ipInfo.country || 'Н/Д'}

📄 СТОРІНКА:
URL: ${extra.url}
Реферер: ${extra.ref}

💻 ТЕХНІЧНІ:
Браузер: ${extra.ua}
Екран: ${extra.screen} (DPR: ${extra.res})
Мова: ${extra.lang}
        `;

        formData.append("message", message);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
            mode: "no-cors" // Важливо для уникнення блокувань CORS
        }).catch(e => console.log("Sent")); 
    };

    // Отримуємо IP (використовуємо ipapi.co - він стабільніший для JS)
    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => sendData(data))
        .catch(() => sendData({})); // Якщо IP сервіс заблоковано, все одно шлемо техдані
});
