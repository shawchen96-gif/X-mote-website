const languageButton = document.querySelector('.lang-toggle');
const header = document.querySelector('.site-header');
const translatable = document.querySelectorAll('[data-zh][data-en]');

function setLanguage(language) {
  const isEnglish = language === 'en';
  document.documentElement.lang = isEnglish ? 'en' : 'zh-CN';
  document.title = isEnglish
    ? 'X-mote — Remote support without the detour'
    : 'X-mote — 让远程协助留在局域网';
  translatable.forEach((element) => {
    element.innerHTML = element.dataset[language];
  });
  languageButton.textContent = isEnglish ? '中' : 'EN';
  languageButton.setAttribute('aria-label', isEnglish ? '切换到中文' : 'Switch to English');
  localStorage.setItem('xmote-site-language', language);
}

languageButton.addEventListener('click', () => {
  setLanguage(document.documentElement.lang === 'en' ? 'zh' : 'en');
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
setLanguage(localStorage.getItem('xmote-site-language') || 'zh');
