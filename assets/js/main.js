/**
* Template Name: Moderna
* Updated: Jan 29 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/free-bootstrap-template-corporate-moderna/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /* Book Now 
  document.getElementById('bookNowButton').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('overlayForm').style.display = 'flex';
  });
  
  function closeForm() {
    document.getElementById('overlayForm').style.display = 'none';
  }
  
  function toggleFoodMenu() {
    var services = document.getElementById('services').value;
    if (services === 'food') {
      document.getElementById('foodMenu').style.display = 'block';
    } else {
      document.getElementById('foodMenu').style.display = 'none';
    }
  }
  
  function submitForm() {
    var form = document.getElementById('bookingForm');
    if (form.checkValidity()) {
      alert('Form submitted successfully!');
      closeForm();
    } else {
      alert('Please fill out all required fields.');
    }
  }*/

  /* Book Now 
document.getElementById('bookNowButton').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('overlayForm').style.display = 'flex';
});

function closeForm() {
  document.getElementById('overlayForm').style.display = 'none';
  window.location.href = ''; // Redirects to home page
}

function toggleFoodMenu() {
  var services = document.querySelectorAll('input[name="services"]:checked');
  var showFoodMenu = false;
  
  services.forEach(function(service) {
    if (service.value === 'food') {
      showFoodMenu = true;
    }
  });
  
  if (showFoodMenu) {
    document.getElementById('foodMenu').style.display = 'block';
  } else {
    document.getElementById('foodMenu').style.display = 'none';
  }
}

function submitForm() {
  var form = document.getElementById('bookingForm');
  if (form.checkValidity()) {
    alert('Form submitted successfully!');
    closeForm();
  } else {
    alert('Please fill out all required fields.');
  }
}*/




  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-carousel', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-wrap',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });
  /**
   * Gallery Slider
   */
   new Swiper('.gallery-slider', {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });


  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})();

document.addEventListener('DOMContentLoaded', function () {
  // Show loader
  document.body.classList.add('loading');
  const loader = document.getElementById('loader');
  loader.style.display = 'flex';

  // Function to update buttons based on userToken
  function updateButtons() {
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
      try {
        // Decode the token
        const decodedToken = jwt_decode(userToken);

        // Check if the token is valid (you can add more validation here)
        if (!decodedToken) {
          throw new Error('Invalid token');
        }

        for (let i = 1; i <= 3; i++) {
          const loginButton = document.getElementById(`loginButton${i}`);
          const bookNowButton = document.getElementById(`bookNowButton${i}`);
          bookNowButton.style.display = 'block';
          loginButton.style.display = 'none';
        }
        
        console.log("Token is valid !!");
      } catch (error) {
        console.error('Token decoding failed:', error);
        // Clear localStorage and redirect to login page
        localStorage.removeItem('userToken');
        localStorage.removeItem('userInfo');

        window.location.href = 'index.html';
      }
    } else {
      // Update buttons for logged-out state
      for (let i = 1; i <= 3; i++) {
        const loginButton = document.getElementById(`loginButton${i}`);
        const bookNowButton = document.getElementById(`bookNowButton${i}`);
        loginButton.style.display = 'block';
        bookNowButton.style.display = 'none';
      }
      
      console.log("Token doesn't exist !!");
    }
  }

  // Initial button update
  updateButtons();

  // Event listener for when the slider changes
  const heroCarousel = document.getElementById('heroCarousel');
  if (heroCarousel) {
    heroCarousel.addEventListener('slide.bs.carousel', function () {
      updateButtons();
    });
  }

  // Hide loader once the DOM is fully loaded
  window.addEventListener('load', function () {
    document.body.classList.remove('loading');
    loader.style.display = 'none';
  });


 
});
