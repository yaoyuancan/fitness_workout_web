// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const visibility = navMenu.getAttribute('data-visible');
            
            if (visibility === "false" || !visibility) {
                navMenu.setAttribute('data-visible', true);
                navToggle.setAttribute('aria-expanded', true);
            } else {
                navMenu.setAttribute('data-visible', false);
                navToggle.setAttribute('aria-expanded', false);
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.setAttribute('data-visible', false);
            navToggle.setAttribute('aria-expanded', false);
        }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.setAttribute('data-visible', false);
            navToggle.setAttribute('aria-expanded', false);
        });
    });

    // Scroll Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    // Observe all sections
    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add active class to current navigation item
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-links a');
    menuItems.forEach(item => {
        if(item.href === currentLocation) {
            item.classList.add('active');
        }
    });

    // Form Validation (for future use)
    function validateForm(formElement) {
        const inputs = formElement.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    }

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

async function getFITYoutubeVideos() {
    const playlistId = 'PLroN-27WBSFCVR0dFOl-acfonfkuwAfIc'
    const url = `https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=${playlistId}&part=snippet&maxResults=50`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '2a094aa74amsh55437d3b0bf7903p1fcd1ajsn8c9a3d9d75e4',
        'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const data = JSON.parse(result)
      console.log(data)
      let content = ''
      data?.items?.slice(0,3).forEach(item => {
        console.log(item)
        content += `        <div class="video-item">
          <img src="${item.snippet.thumbnails.standard.url}" alt="picture" />
          <h3>${item.snippet.title}</h3>
          <a target="_blank" href="https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}&list=${item.snippet.playlistId}">Watch</a>
        </div>`
      });
      
      var videoElement = document.getElementById('video');
      
      videoElement.innerHTML = content;
    } catch (error) {
      console.error(error);
    }
  }
  
  getFITYoutubeVideos()