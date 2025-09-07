// Backend API URL - will be set by environment or default to localhost
const BACKEND_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000' 
  : 'http://backend:3000';

const translations = {
  en: {
    title: "mahdy.online Coming Soon",
    subtitle: "⏳ Our website is under construction, but we're working hard to launch soon!",
    aboutTitle: "About the Developer",
    aboutText: "Hello! I'm <strong>Mohamed Mahdy</strong>, a DevOps Engineer currently building <strong>Mahdy</strong>. This project will provide amazing content and services soon.",
    contactTitle: "Contact Us",
    contactText: "Stay updated with the latest news by reaching out:",
    footerText: "© 2025 Mahdy. All rights reserved.",
    switchLang: "العربية",
    backendBtn: "Backend Info",
    backendModalTitle: "Backend Information",
    loading: "Loading...",
    close: "Close",
    backendDetails: "Backend Details",
    ip: "IP Address",
    port: "Port",
    status: "Status",
    environment: "Environment",
    uptime: "Uptime",
    timestamp: "Last Updated"
  },
  ar: {
    title: "mahdy.online قريباً",
    subtitle: "⏳ موقعنا الإلكتروني قيد التطوير، لكننا نعمل بجد لإطلاقه قريباً!",
    aboutTitle: "عن المطور",
    aboutText: "مرحباً! أنا <strong>محمد مهدي</strong>، مهندس DevOps أعمل حالياً على تطوير موقع <strong>مهدي</strong>. هذا المشروع يركز على تقديم محتوى وخدمات رائعة قريباً.",
    contactTitle: "تواصل معنا",
    contactText: "ابق على اطلاع بأحدث التطورات من خلال التواصل معنا:",
    footerText: "© 2025 Mahdy. كل الحقوق محفوظة",
    switchLang: "English",
    backendBtn: "معلومات الخادم",
    backendModalTitle: "معلومات الخادم الخلفي",
    loading: "جاري التحميل...",
    close: "إغلاق",
    backendDetails: "تفاصيل الخادم",
    ip: "عنوان IP",
    port: "المنفذ",
    status: "الحالة",
    environment: "البيئة",
    uptime: "وقت التشغيل",
    timestamp: "آخر تحديث"
  }
};

let currentLang = "en";
function toggleLang() {
  currentLang = currentLang === "en" ? "ar" : "en";
  document.getElementById("title").innerHTML = translations[currentLang].title;
  document.getElementById("subtitle").innerHTML = translations[currentLang].subtitle;
  document.getElementById("about-title").innerHTML = translations[currentLang].aboutTitle;
  document.getElementById("about-text").innerHTML = translations[currentLang].aboutText;
  document.getElementById("contact-title").innerHTML = translations[currentLang].contactTitle;
  document.getElementById("contact-text").innerHTML = translations[currentLang].contactText;
  document.getElementById("footer-text").innerHTML = translations[currentLang].footerText;
  document.getElementById("lang-btn").innerHTML = translations[currentLang].switchLang;
  document.getElementById("backend-btn-text").innerHTML = translations[currentLang].backendBtn;
  document.getElementById("backend-modal-title").innerHTML = translations[currentLang].backendModalTitle;
  document.getElementById("loading-text").innerHTML = translations[currentLang].loading;
  document.getElementById("close-btn-text").innerHTML = translations[currentLang].close;

  if (currentLang === "ar") {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  } else {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  }
}

let darkMode = true;
function toggleTheme() {
  darkMode = !darkMode;
  if (darkMode) {
    document.body.classList.remove("light");
    document.getElementById("theme-btn").innerHTML = "🌙 Dark";
  } else {
    document.body.classList.add("light");
        document.getElementById("theme-btn").innerHTML = "Light";
  }
}

// Backend Info Functions
function getBackendInfo() {
  const modal = document.getElementById('backend-modal');
  const loading = document.getElementById('loading');
  const details = document.getElementById('backend-details');
  
  // Show modal and reset content
  modal.style.display = 'flex';
  loading.style.display = 'block';
  details.style.display = 'none';
  
  // Get current language
  const lang = currentLang;
  
  // Fetch backend information
  fetch(`${BACKEND_URL}/api/hello`)
    .then(response => response.json())
    .then(data => {
      // Get client IP and port info
      const clientIP = window.location.hostname;
      const clientPort = window.location.port || (window.location.protocol === 'https:' ? '443' : '80');
      const protocol = window.location.protocol;
      
      // Display backend information
      details.innerHTML = `
        <div style="text-align: left;">
          <div style="margin-bottom: 15px;">
            <strong><i class="fas fa-globe"></i> ${translations[lang].ip}:</strong> 
            <span style="color: var(--primary);">${clientIP}</span>
          </div>
          <div style="margin-bottom: 15px;">
            <strong><i class="fas fa-plug"></i> ${translations[lang].port}:</strong> 
            <span style="color: var(--primary);">${clientPort}</span>
          </div>
          <div style="margin-bottom: 15px;">
            <strong><i class="fas fa-shield-alt"></i> ${translations[lang].status}:</strong> 
            <span style="color: #4ade80;">Healthy</span>
          </div>
          <div style="margin-bottom: 15px;">
            <strong><i class="fas fa-cog"></i> ${translations[lang].environment}:</strong> 
            <span style="color: var(--accent);">${data.environment || 'development'}</span>
          </div>
          <div style="margin-bottom: 15px;">
            <strong><i class="fas fa-server"></i> Service:</strong> 
            <span style="color: var(--primary);">${data.service || 'backend'}</span>
          </div>
          <div style="margin-bottom: 15px;">
            <strong><i class="fas fa-calendar"></i> ${translations[lang].timestamp}:</strong> 
            <span style="color: var(--primary);">${new Date(data.timestamp).toLocaleString()}</span>
          </div>
          <div style="margin-top: 20px; padding: 15px; background: rgba(67, 97, 238, 0.1); border-radius: 8px; border-left: 4px solid var(--primary);">
            <strong><i class="fas fa-info-circle"></i> ${translations[lang].backendDetails}:</strong><br>
            <small style="color: #a0a0c0;">${data.message}</small>
          </div>
        </div>
      `;
      
      loading.style.display = 'none';
      details.style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching backend info:', error);
      details.innerHTML = `
        <div style="text-align: center; color: #ff6b6b;">
          <i class="fas fa-exclamation-triangle"></i><br>
          <strong>Error connecting to backend</strong><br>
          <small>Backend URL: ${BACKEND_URL}</small><br>
          <small>Please check if the backend service is running</small>
        </div>
      `;
      loading.style.display = 'none';
      details.style.display = 'block';
    });
}

function closeBackendModal() {
  document.getElementById('backend-modal').style.display = 'none';
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

// Close modal when clicking outside
document.getElementById('backend-modal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeBackendModal();
  }
});
