// small interactive behaviors: year, mobile nav toggle
document.addEventListener('DOMContentLoaded', function(){
  const year = new Date().getFullYear();
  ['year','year2','year3','year4','year5'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = year;
  });

  const navToggle = document.getElementById('navToggle');
  navToggle && navToggle.addEventListener('click', function(){
    document.body.classList.toggle('mobile-nav-open');
  });

  // Simple form validation for contact (optional enhancement)
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      // client-side validation could be expanded
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if(!name || !email || !message){
        e.preventDefault();
        alert('Please fill name, email and message before sending.');
      } else {
        // allow mailto fallback to trigger
      }
    });
  }
});
// CAPI Global - Professional JavaScript

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== INITIALIZE ALL FUNCTIONS =====
  initializeHeader();
  initializeMobileNav();
  initializeScrollAnimations();
  initializeCounters();
  initializeSmoothScrolling();
  initializeFormHandling();
  updateCopyrightYear();

  // ===== HEADER SCROLL EFFECT =====
  function initializeHeader() {
    const header = document.querySelector('.site-header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
      const scrollY = window.scrollY;
      
      if (scrollY > 100) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
      
      lastScrollY = scrollY;
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // ===== MOBILE NAVIGATION =====
  function initializeMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const body = document.body;
    
    if (navToggle) {
      navToggle.addEventListener('click', function() {
        body.classList.toggle('mobile-nav-open');
        
        // Update toggle icon
        const isOpen = body.classList.contains('mobile-nav-open');
        navToggle.innerHTML = isOpen ? '✕' : '☰';
      });

      // Close nav when clicking on nav links
      const navLinks = document.querySelectorAll('.main-nav a');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          body.classList.remove('mobile-nav-open');
          navToggle.innerHTML = '☰';
        });
      });

      // Close nav when clicking outside
      document.addEventListener('click', function(e) {
        if (!e.target.closest('.site-header') && body.classList.contains('mobile-nav-open')) {
          body.classList.remove('mobile-nav-open');
          navToggle.innerHTML = '☰';
        }
      });
    }
  }

  // ===== SCROLL ANIMATIONS =====
  function initializeScrollAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Add animation classes and observe elements
    const animatedElements = document.querySelectorAll('.stat-card, .service-card, .project-card, .card');
    
    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
      
      observer.observe(el);
    });

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ===== ANIMATED COUNTERS =====
  function initializeCounters() {
    const counters = document.querySelectorAll('.stat-card p');
    const counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          animateCounter(entry.target);
          entry.target.dataset.counted = 'true';
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
      if (counter.textContent.match(/\d+/)) {
        counterObserver.observe(counter);
      }
    });

    function animateCounter(element) {
      const text = element.textContent;
      const number = text.match(/\d+/);
      
      if (number) {
        const finalNumber = parseInt(number[0]);
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentNumber = Math.floor(finalNumber * easeOutQuart);
          
          element.textContent = text.replace(/\d+/, currentNumber);
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            element.textContent = text; // Ensure final value is exact
          }
        }
        
        requestAnimationFrame(updateCounter);
      }
    }
  }

  // ===== SMOOTH SCROLLING =====
  function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          const headerHeight = document.querySelector('.site-header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ===== FORM HANDLING =====
  function initializeFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
          e.preventDefault();
          return false;
        }
        
        // Add loading state
        const submitBtn = this.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
          
          // Reset after 3 seconds (adjust based on your actual form handling)
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
          }, 3000);
        }
      });
    });

    function validateForm(form) {
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      // Remove previous error states
      form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('error');
          isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value)) {
            field.classList.add('error');
            isValid = false;
          }
        }
      });
      
      if (!isValid) {
        showNotification('Please fill in all required fields correctly.', 'error');
      }
      
      return isValid;
    }
  }

  // ===== NOTIFICATION SYSTEM =====
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      backgroundColor: type === 'error' ? '#ef4444' : '#10b981',
      color: 'white',
      borderRadius: '8px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      zIndex: '9999',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }

  // ===== PARALLAX EFFECT FOR HERO =====
  function initializeParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    let ticking = false;
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      hero.style.transform = `translateY(${rate}px)`;
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // ===== CARD HOVER EFFECTS =====
  function initializeCardEffects() {
    const cards = document.querySelectorAll('.card, .service-card, .project-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // ===== COPYRIGHT YEAR =====
  function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('#year, [data-year]');
    
    yearElements.forEach(element => {
      element.textContent = currentYear;
    });
  }

  // ===== LAZY LOADING FOR IMAGES =====
  function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  // ===== PERFORMANCE MONITORING =====
  function initializePerformanceMonitoring() {
    // Log performance metrics
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    });
  }

  // Initialize additional features
  initializeParallax();
  initializeCardEffects();

  AOS.init({
    duration: 1000,
    once: true,
  });
});