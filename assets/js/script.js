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

  // Lightbox functionality
  // Select all gallery grids
  const galleryGrids = document.querySelectorAll('.gallery-grid');
  
  if (galleryGrids.length > 0) {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    const lightboxImg = document.createElement('img');
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    
    const prevBtn = document.createElement('span');
    prevBtn.className = 'lightbox-prev';
    prevBtn.innerHTML = '&#10094;';
    
    const nextBtn = document.createElement('span');
    nextBtn.className = 'lightbox-next';
    nextBtn.innerHTML = '&#10095;';
    
    lightboxContent.appendChild(lightboxImg);
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
    
    let currentIndex = 0;
    let images = [];
    
    // Function to update images list from all grids
    const updateImages = () => {
      images = [];
      galleryGrids.forEach(grid => {
        const gridImages = Array.from(grid.querySelectorAll('img'));
        images = images.concat(gridImages);
      });
    };
    
    // Initial update
    updateImages();
    
    const showImage = (index) => {
      if (images.length === 0) return;
      
      // Wrap around
      if (index >= images.length) index = 0;
      if (index < 0) index = images.length - 1;
      
      currentIndex = index;
      
      // Use data-full-src if available, otherwise fallback to src
      const fullSrc = images[currentIndex].getAttribute('data-full-src');
      lightboxImg.src = fullSrc || images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt;
      
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
    
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };
    
    // Event delegation for gallery clicks
    galleryGrids.forEach(grid => {
      grid.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
          updateImages(); // Refresh list in case of changes
          const index = images.indexOf(e.target);
          if (index !== -1) {
            showImage(index);
          }
        }
      });
    });
    
    // Lightbox controls
    closeBtn.addEventListener('click', closeLightbox);
    
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });
    
    // Close on click outside image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === lightboxContent) {
        closeLightbox();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
  }
});
