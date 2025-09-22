
// ================================
// 1. Додаємо скрипт AdSense асинхронно
// ================================
(function() {
  var adScript = document.createElement('script');
  adScript.async = true; // асинхронне завантаження
  adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4506626309877949";
  adScript.crossOrigin = "anonymous"; // CORS
  document.head.appendChild(adScript);
})();

// ================================
// 2. Логіка перевірки AdSense з таймаутом
// ================================
window.addEventListener("load", function() {
  // Після повного завантаження сторінки чекаємо ще 500 мс
  setTimeout(function() {
    let e = document.querySelector(".adsbygoogle");

    if (e && getComputedStyle(e).display !== "none") {
      // Реклама активна
      anc = 1;
    } else {
      // Якщо блок не знайдено, викликаємо функцію gop(0)
      gop(0);
    }
  }, 500); // затримка 0.5 секунди, щоб мобільний браузер встиг рендерити
});
