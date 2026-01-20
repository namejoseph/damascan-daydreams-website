// Update footer year to current year
document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Hamburger menu functionality
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const menuOverlay = document.querySelector('.menu-overlay');
  const menuClose = document.querySelector('.menu-close');
  const overlayLinks = document.querySelectorAll('.menu-overlay .nav-link, .menu-overlay .social-link');
  
  if (hamburgerMenu && menuOverlay && menuClose) {
    // Open menu when hamburger is clicked
    hamburgerMenu.addEventListener('click', () => {
      menuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    // Close menu when X is clicked
    menuClose.addEventListener('click', () => {
      menuOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close menu when link is clicked
    overlayLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Handle window resize: close menu if width > 1023px
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1023 && menuOverlay.classList.contains('active')) {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
