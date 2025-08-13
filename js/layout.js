// layout.js

function loadComponent(id, url, callback) {
  fetch(url)
    .then(res => res.text())
    .then(data => {
      const container = document.getElementById(id);
      if (container) {
        container.innerHTML = data;

        // Після вставки lang-switch
        if (id === "lang-switch") {
          setupLangSwitcher();
        }

        // Після вставки header
        if (id === "header") {
          setTimeout(() => {
            const overlay = document.querySelector(".hero-overlay");
            if (overlay) overlay.classList.add("ready");
          }, 50);

          // Тут підсвічуємо активне меню
          highlightActiveMenu();
        }

        // Після вставки footer
        if (id === "footer") {
          setupFeedbackMenu();
        }

        // Якщо передано колбек — викликаємо
        if (typeof callback === "function") {
          callback();
        }
      }
    })
    .catch(err => console.error(`Upload error ${url}:`, err));
}

function setupLangSwitcher() {
  // 1) Отримуємо поточний файл або даємо дефолт
  let file = window.location.pathname.split("/").pop() || "index.html";

  // 2) Розбираємо ім'я: <base>(-en)?(.html)?
  const m = file.match(/^(.*?)(-en)?(\.html)?$/);
  const base = (m && m[1]) ? m[1] : "index";
  const isEnglish = !!(m && m[2]);

  // 3) Формуємо коректні шляхи для обох мов (з .html)
  const uaVersion = `${base}.html`;
  const enVersion = `${base}-en.html`;

  // 4) Проставляємо посилання та активні стани
  const uaLink = document.getElementById("lang-ua");
  const enLink = document.getElementById("lang-en");

  if (uaLink) {
    uaLink.href = uaVersion;
    uaLink.classList.toggle("active", !isEnglish);
  }
  if (enLink) {
    enLink.href = enVersion;
    enLink.classList.toggle("active", isEnglish);
  }
}


function setupFeedbackMenu() {
  const button = document.getElementById("feedback-button");
  const menu = document.getElementById("feedback-menu");

  if (!button || !menu) return;

  function toggleMenu() {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }

  button.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener("click", function (e) {
    if (!menu.contains(e.target) && !button.contains(e.target)) {
      menu.style.display = "none";
    }
  });
}

// Нова функція для підсвічування активного пункту меню
function highlightActiveMenu() {
  const currentPath = window.location.pathname.split("/").pop() || "index-en.html";
  const navLinks = document.querySelectorAll(".hero nav a");

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
}

/*document.addEventListener("DOMContentLoaded", () => {
  const isEnglish = window.location.pathname.includes("-en");
  const headerFile = isEnglish ? "header-en.html" : "header.html";

  loadComponent("lang-switch", "lang-switch.html");
  loadComponent("header", headerFile);
  loadComponent("footer", "footer.html");
}); */
document.addEventListener("DOMContentLoaded", () => {
  const isEnglish = window.location.pathname.includes("-en");
  const headerFile = isEnglish ? "includes/header-en.html" : "includes/header.html";

  loadComponent("lang-switch", "includes/lang-switch.html");
  loadComponent("header", headerFile);
  loadComponent("footer", "includes/footer.html");
});

