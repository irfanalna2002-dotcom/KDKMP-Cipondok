/**
 * KOPERASI DESA MERAH PUTIH DESA CIPONDOK
 * Interactive Client Logic & Enhancements
 * Desa Cipondok, Sukaresik, Tasikmalaya
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Features
  initPreloader();
  initThemeToggle();
  initStickyNavbar();
  initCounterAnimation();
  initProductFilterAndSearch();
  initPotensiFilter();
  initArticleFilterAndSearch();
  initContactForm();
  initBackToTop();
  initLightbox();
});

/* --------------------------------------------------------------------------
   1. PRELOADER
   -------------------------------------------------------------------------- */
function initPreloader() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 400);
  }
}

/* --------------------------------------------------------------------------
   2. DARK MODE TOGGLE & LOCAL STORAGE
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-toggle-icon');
  
  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('koperasi_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-bs-theme', newTheme);
      localStorage.setItem('koperasi_theme', newTheme);
      updateThemeIcon(newTheme);

      showToast(`Mode ${newTheme === 'dark' ? 'Gelap' : 'Terang'} Diaktifkan`, 'info');
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.className = 'bi bi-sun-fill text-warning';
    } else {
      themeIcon.className = 'bi bi-moon-stars-fill text-dark';
    }
  }
}

/* --------------------------------------------------------------------------
   3. STICKY NAVBAR & ACTIVE NAV LINK HIGHLIGHT
   -------------------------------------------------------------------------- */
function initStickyNavbar() {
  const navbar = document.querySelector('.navbar-custom');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('shadow-sm', 'scrolled');
    } else {
      navbar?.classList.remove('shadow-sm', 'scrolled');
    }
  });

  // Smooth scroll for nav anchor links & close mobile offcanvas if open
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Close mobile offcanvas if open
        const offcanvasEl = document.getElementById('mobileNav');
        if (offcanvasEl && bootstrap.Offcanvas.getInstance(offcanvasEl)) {
          const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
          bsOffcanvas.hide();
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. COUNTER ANIMATION (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initCounterAnimation() {
  const counterElements = document.querySelectorAll('.counter-value');
  if (!counterElements.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterElements.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000; // 2s
          const increment = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.innerText = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target;
            }
          };
          updateCounter();
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.getElementById('statistik');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* --------------------------------------------------------------------------
   5. PRODUCT FILTER & SEARCH
   -------------------------------------------------------------------------- */
function initProductFilterAndSearch() {
  const filterBtns = document.querySelectorAll('.btn-filter-product');
  const productCards = document.querySelectorAll('.product-card-col');
  const searchInput = document.getElementById('product-search');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');
      filterProducts(category, searchInput ? searchInput.value : '');
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeBtn = document.querySelector('.btn-filter-product.active');
      const category = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
      filterProducts(category, e.target.value);
    });
  }

  function filterProducts(category, searchTerm) {
    const term = searchTerm.toLowerCase().trim();

    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const title = card.querySelector('.product-title')?.innerText.toLowerCase() || '';
      const desc = card.querySelector('.product-desc')?.innerText.toLowerCase() || '';

      const matchesCategory = category === 'all' || cardCategory === category;
      const matchesSearch = title.includes(term) || desc.includes(term);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'block';
        card.classList.add('animate__animated', 'animate__fadeIn');
      } else {
        card.style.display = 'none';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   6. POTENSI DESA FILTER
   -------------------------------------------------------------------------- */
function initPotensiFilter() {
  const filterBtns = document.querySelectorAll('.btn-filter-potensi');
  const potensiCards = document.querySelectorAll('.potensi-card-col');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      potensiCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. ARTIKEL FILTER & SEARCH
   -------------------------------------------------------------------------- */
function initArticleFilterAndSearch() {
  const articleCards = document.querySelectorAll('.article-card-col');
  const searchInput = document.getElementById('article-search');
  const categoryLinks = document.querySelectorAll('.article-cat-link');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      articleCards.forEach(card => {
        const title = card.querySelector('.article-title')?.innerText.toLowerCase() || '';
        const summary = card.querySelector('.article-summary')?.innerText.toLowerCase() || '';
        if (title.includes(term) || summary.includes(term)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.getAttribute('data-category');
      articleCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. CONTACT FORM & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !message) {
        showToast('Mohon isi nama dan pesan Anda dengan lengkap.', 'danger');
        return;
      }

      // Simulate sending
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Mengirim...';
      }

      setTimeout(() => {
        showToast(`Terima kasih, ${name}! Pesan Anda berhasil terkirim ke Koperasi Desa Merah Putih.`, 'success');
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i> Kirim Pesan';
        }
      }, 1200);
    });
  }
}

/* --------------------------------------------------------------------------
   9. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('show');
    } else {
      backToTopBtn?.classList.remove('show');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   10. LIGHTBOX & MODAL HELPERS
   -------------------------------------------------------------------------- */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModalEl = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');

  if (lightboxModalEl && galleryItems.length) {
    const lightboxModal = new bootstrap.Modal(lightboxModalEl);

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-img');
        const caption = item.getAttribute('data-caption') || 'Galeri Koperasi Desa Merah Putih';

        if (lightboxImage) lightboxImage.src = imgSrc;
        if (lightboxCaption) lightboxCaption.innerText = caption;

        lightboxModal.show();
      });
    });
  }
}

/* --------------------------------------------------------------------------
   11. GLOBAL DYNAMIC MODALS (PRODUCT & ARTICLE DETAIL)
   -------------------------------------------------------------------------- */
window.openProductModal = function (title, price, category, stock, desc, imgSrc) {
  const modalEl = document.getElementById('productDetailModal');
  if (!modalEl) return;

  document.getElementById('modalProductTitle').innerText = title;
  document.getElementById('modalProductPrice').innerText = price;
  document.getElementById('modalProductCategory').innerText = category;
  document.getElementById('modalProductStock').innerText = stock;
  document.getElementById('modalProductDesc').innerText = desc;
  document.getElementById('modalProductImg').src = imgSrc;

  // Update WA link
  const waBtn = document.getElementById('modalProductWaBtn');
  if (waBtn) {
    const text = encodeURIComponent(`Halo Koperasi Merah Putih Desa Cipondok, saya tertarik memesan produk: ${title} (${price})`);
    waBtn.href = `https://wa.me/6281234567890?text=${text}`;
  }

  const modal = new bootstrap.Modal(modalEl);
  modal.show();
};

window.openArticleModal = function (title, date, author, category, fullContent, imgSrc) {
  const modalEl = document.getElementById('articleDetailModal');
  if (!modalEl) return;

  document.getElementById('modalArticleTitle').innerText = title;
  document.getElementById('modalArticleMeta').innerText = `${date} • Oleh ${author} • ${category}`;
  document.getElementById('modalArticleContent').innerHTML = fullContent;
  document.getElementById('modalArticleImg').src = imgSrc;

  const modal = new bootstrap.Modal(modalEl);
  modal.show();
};

/* --------------------------------------------------------------------------
   12. TOAST NOTIFICATION SYSTEM
   -------------------------------------------------------------------------- */
function showToast(message, type = 'success') {
  let toastContainer = document.querySelector('.toast-container-custom');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container-custom';
    document.body.appendChild(toastContainer);
  }

  const toastId = 'toast-' + Date.now();
  const bgClass = type === 'success' ? 'bg-success' : type === 'danger' ? 'bg-danger' : 'bg-primary';

  const toastHTML = `
    <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0 shadow-lg mb-2 show" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body font-weight-500">
          <i class="bi ${type === 'success' ? 'bi-check-circle-fill' : type === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill'} me-2"></i>
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  toastContainer.insertAdjacentHTML('beforeend', toastHTML);

  const toastEl = document.getElementById(toastId);
  setTimeout(() => {
    toastEl?.remove();
  }, 4000);
}
