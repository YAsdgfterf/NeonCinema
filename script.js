
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Add a simple animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }, 300 * index);
  });
});

// Add a glowing effect to the neon elements
function addGlowEffect() {
  const neonElements = document.querySelectorAll('h1, h2, .button, nav a, .link-card, .game-card');
  
  neonElements.forEach(element => {
    const randomIntensity = Math.random() * 0.3 + 0.7; // 0.7 to 1.0
    element.style.textShadow = `0 0 ${5 * randomIntensity}px #00ff00`;
    
    if (element.classList.contains('game-card') || element.classList.contains('link-card')) {
      element.style.boxShadow = `0 0 ${8 * randomIntensity}px #00ff00`;
    }
  });
  
  setTimeout(addGlowEffect, 2000);
}

// Start the glow effect
addGlowEffect();
