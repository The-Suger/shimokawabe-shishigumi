// ヘッダースクロール制御（ヒーロー高さを超えたら白背景に）
const header = document.querySelector('.site-header');
const hero = document.querySelector('.hero');
const updateHeader = () => {
  const threshold = hero ? hero.offsetHeight - 80 : 100;
  header.classList.toggle('scrolled', window.scrollY > threshold);
};
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ハンバーガーメニュー
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.global-nav');

hamburger?.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  nav.classList.toggle('open', open);
  hamburger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
});

// ナビリンクを押したらメニュー閉じる
document.querySelectorAll('.global-nav a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    nav?.classList.remove('open');
  });
});

// ヒーロースライドショー
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
let current = 0;

const goTo = (index) => {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
};

dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetTimer(); }));

let timer = slides.length ? setInterval(() => goTo(current + 1), 5000) : null;
const resetTimer = () => {
  if (!slides.length) return;
  clearInterval(timer);
  timer = setInterval(() => goTo(current + 1), 5000);
};

// ギャラリーのホバーアニメーションは CSS で対応済み

// お知らせアイテムのホバー色変更
document.querySelectorAll('.news-item').forEach(item => {
  item.addEventListener('mouseenter', () => item.style.backgroundColor = 'rgba(192,57,43,0.04)');
  item.addEventListener('mouseleave', () => item.style.backgroundColor = '');
});

// クイックナビのアクティブ状態（Intersection Observer）
const sections = document.querySelectorAll('section[id], footer[id]');
const quickLinks = document.querySelectorAll('.quick-nav-item');
const navLinks = document.querySelectorAll('.global-nav a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => observer.observe(s));
