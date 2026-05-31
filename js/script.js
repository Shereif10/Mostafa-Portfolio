// Typewriter Effect
class TxtType {
  constructor(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.isDeleting = false;
    this.tick();
  }

  tick() {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) delta /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => this.tick(), delta);
  }
}

window.onload = () => {
  const elements = document.getElementsByClassName("typewrite");
  for (let i = 0; i < elements.length; i++) {
    const toRotate = elements[i].getAttribute("data-type");
    const period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // Inject CSS
  const css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

// Initialize AOS
AOS.init();

// Contact Form Submission
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("https://formspree.io/f/mrbzawad", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Thanks for your message, I will reply as soon as possible",
            showConfirmButton: false,
            timer: 4000,
          });
          document.getElementById("contact-form").reset();
        } else {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Failed to send message",
            showConfirmButton: false,
            timer: 4000,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Failed to send message",
          showConfirmButton: false,
          timer: 4000,
        });
      });
  });

// Navbar scroll behavior and active link update
const navbar = document.getElementById("navbar-example");
const aboutSection = document.getElementById("about");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

function checkNavbar() {
  const aboutTop = aboutSection.offsetTop - 100;
  if (window.scrollY >= aboutTop) {
    navbar.classList.add("bg-dark", "shadow-lg");
    navbar.classList.remove("bg-transparent");
  } else {
    navbar.classList.add("bg-transparent");
    navbar.classList.remove("bg-dark", "shadow-lg");
  }
}

function updateActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop && scrollY < sectionTop + section.offsetHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", () => {
  checkNavbar();
  updateActiveLink();
});

window.addEventListener("load", () => {
  checkNavbar();
  updateActiveLink();
});

// Smooth scrolling for navbar links
document.querySelectorAll(".navbar-nav .nav-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });
  });
});

// Portfolio Filtering System
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll("#portfolio-filter button");
  const portfolioItems = document.querySelectorAll(
    "#portfolio-items [data-category]",
  );

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

      AOS.refresh();
    });
  });
});
// Lightbox Gallery System (يدعم الصور والفيديوهات)
document.addEventListener('DOMContentLoaded', function () {
    const galleries = {
        'social-media': [
            { type: 'image', src: 'images/social1.png' },
            { type: 'image', src: 'images/social2.png' },
            { type: 'image', src: 'images/social3.png' },
            { type: 'image', src: 'images/social4.png' },
            { type: 'image', src: 'images/social5.jpg' },
            { type: 'image', src: 'images/social6.jpg' },
            { type: 'image', src: 'images/social7.png' }
        ],
        'thumbnails': [
            { type: 'image', src: 'images/thumb1.png' },
            { type: 'image', src: 'images/thumb2.png' },
            { type: 'image', src: 'images/thumb3.png' },
            { type: 'image', src: 'images/thumb4.png' },
            { type: 'image', src: 'images/thumb5.png' },
            { type: 'image', src: 'images/thumb6.png' },
        ],
        'infographics': [
            { type: 'image', src: 'images/info1.png' },
            { type: 'image', src: 'images/info2.png' },
            { type: 'image', src: 'images/info3.png' },
            { type: 'image', src: 'images/info4.png' },
            { type: 'image', src: 'images/info5.png' },
            { type: 'image', src: 'images/info6.png' },
            { type: 'image', src: 'images/info7.png' },
        ],
        '3d': [
            { type: 'video', src: 'images/3d21.mp4' },
            { type: 'image', src: 'images/3d1.jpg' },
            { type: 'image', src: 'images/3d2.jpg' },
            { type: 'video', src: 'images/3d18.mp4' },
            { type: 'image', src: 'images/3d3.jpg' },
            { type: 'image', src: 'images/3d4.jpg' },
            { type: 'video', src: 'images/3d20.mp4' },
            { type: 'image', src: 'images/3d5.jpg' },
            { type: 'image', src: 'images/3d6.jpg' },
            { type: 'image', src: 'images/3d7.jpg' },
            { type: 'video', src: 'images/3d23.mp4' },
            { type: 'image', src: 'images/3d8.jpg' },
            { type: 'image', src: 'images/3d9.jpg' },
            { type: 'image', src: 'images/3d10.jpg' },
            { type: 'video', src: 'images/3d24.mp4' },
            { type: 'image', src: 'images/3d11.jpg' },
            { type: 'image', src: 'images/3d12.jpg' },
            { type: 'image', src: 'images/3d13.jpg' },
            { type: 'image', src: 'images/3d14.jpg' },
            { type: 'video', src: 'images/3d19.mp4' },
            { type: 'image', src: 'images/3d15.jpg' },
            { type: 'image', src: 'images/3d16.jpg' },
            { type: 'image', src: 'images/3d17.jpg' },
            { type: 'video', src: 'images/3d22.mp4' },

        ]
    };

    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const btnClose = document.querySelector('.lightbox-close');
    const btnPrev = document.querySelector('.lightbox-prev');
    const btnNext = document.querySelector('.lightbox-next');
    
    let currentGallery = [];
    let currentIndex = 0;

    function showItem(index) {
        currentIndex = index;
        const item = currentGallery[currentIndex];
        
        // مسح المحتوى القديم
        lightboxContent.innerHTML = '';

        if (item.type === 'video') {
            // عنصر فيديو
            const video = document.createElement('video');
            video.src = item.src;
            video.controls = true;
            video.autoplay = true;
            video.style.maxWidth = '90%';
            video.style.maxHeight = '80vh';
            video.style.borderRadius = '4px';
            video.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';
            lightboxContent.appendChild(video);
        } else {
            // عنصر صورة
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = 'Gallery Image';
            img.id = 'lightboxImg';
            lightboxContent.appendChild(img);
        }

        lightboxCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
    }

    function openLightbox(galleryName) {
        currentGallery = galleries[galleryName] || [];
        if (currentGallery.length === 0) return;
        
        currentIndex = 0;
        showItem(0);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        // إيقاف أي فيديو شغال
        const video = lightboxContent.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }

    function nextItem() {
        if (currentGallery.length === 0) return;
        currentIndex = (currentIndex + 1) % currentGallery.length;
        showItem(currentIndex);
    }

    function prevItem() {
        if (currentGallery.length === 0) return;
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        showItem(currentIndex);
    }

    // أزرار التنقل
    btnNext.addEventListener('click', nextItem);
    btnPrev.addEventListener('click', prevItem);

    // إغلاق
    btnClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });

    // لوحة المفاتيح
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowRight') nextItem();
        if (e.key === 'ArrowLeft') prevItem();
        if (e.key === 'Escape') closeLightbox();
    });

    // فتح المعرض المناسب
    document.querySelectorAll('.open-gallery').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const galleryName = this.getAttribute('data-gallery');
            if (galleries[galleryName]) {
                openLightbox(galleryName);
            }
        });
    });
});