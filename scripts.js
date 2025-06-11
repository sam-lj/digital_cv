const tabs     = document.querySelectorAll('.tabs__list a');
const sections = document.querySelectorAll('main section');

sections.forEach(sec => {
  sec.style.transition = '';
  sec.style.opacity = sec.classList.contains('active') ? '1' : '0';
});

// Add a background overlay for fading images
let bgOverlay = document.createElement('div');
bgOverlay.id = 'bg-fade-overlay';
bgOverlay.style.position = 'fixed';
bgOverlay.style.top = '0';
bgOverlay.style.left = '0';
bgOverlay.style.width = '100vw';
bgOverlay.style.height = '100vh';
bgOverlay.style.zIndex = '-1';
bgOverlay.style.transition = 'opacity 350ms';
bgOverlay.style.backgroundSize = 'cover';
bgOverlay.style.backgroundPosition = 'center center';
bgOverlay.style.backgroundRepeat = 'no-repeat';
bgOverlay.style.backgroundAttachment = 'fixed';
document.body.prepend(bgOverlay);

// Set initial background
const bgImages = {
  about: 'img/about_me.jpg',
  experience: 'img/experience.webp',
  skills: 'img/Skills.webp',
  projects: 'img/projects.webp',
  'link-tree': 'img/link_tree.jpeg'
};
let currentBg = 'about';
bgOverlay.style.backgroundImage = `url('${bgImages[currentBg]}')`;
bgOverlay.style.opacity = '1';

tabs.forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();

    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const targetId = tab.getAttribute('href').slice(1);
    const newSection = Array.from(sections).find(sec => sec.id === targetId);
    const oldSection = Array.from(sections).find(sec => sec.classList.contains('active'));

    if (oldSection !== newSection) {
      // Slide up effect: fade out and slide down old, then slide up and fade in new
      oldSection.style.transition = 'opacity 350ms, transform 350ms';
      oldSection.style.opacity = '0';
      oldSection.style.transform = 'translateY(40px)';
      setTimeout(() => {
        oldSection.classList.remove('active');
        newSection.classList.add('active');
        newSection.style.transition = 'none';
        newSection.style.opacity = '0';
        newSection.style.transform = 'translateY(40px)';
        // Force reflow
        void newSection.offsetWidth;
        newSection.style.transition = 'opacity 350ms, transform 350ms';
        newSection.style.opacity = '1';
        newSection.style.transform = 'translateY(0)';
      }, 350);
    }

    // Instantly change background image
    if (bgImages[targetId] && targetId !== currentBg) {
      bgOverlay.style.opacity = '1';
      bgOverlay.style.backgroundImage = `url('${bgImages[targetId]}')`;
      currentBg = targetId;
    }

    document.body.style.backgroundImage = '';
  });
});
