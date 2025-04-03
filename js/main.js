document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  if (burger) {
    burger.addEventListener("click", () => {
      // Toggle Nav
      nav.classList.toggle("nav-active");

      // Animate Links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`;
        }
      });

      // Burger Animation
      burger.classList.toggle("toggle");
    });
  }

  // Hero Slider
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector("#nextBtn");
  const prevBtn = document.querySelector("#prevBtn");
  let currentSlide = 0;
  let autoSlideInterval;

  function resetSlides() {
    slides.forEach((slide) => {
      slide.classList.remove("current");
    });
  }

  function startSlide() {
    resetSlides();
    slides[currentSlide].classList.add("current");
  }

  function slideRight() {
    resetSlides();
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("current");
  }

  function slideLeft() {
    resetSlides();
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add("current");
  }

  if (slides.length > 0) {
    // Auto slide
    function startAutoSlide() {
      autoSlideInterval = setInterval(slideRight, 5000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    startSlide();
    startAutoSlide();

    // Event listeners for buttons
    if (nextBtn && prevBtn) {
      nextBtn.addEventListener("click", () => {
        slideRight();
        stopAutoSlide();
        startAutoSlide();
      });

      prevBtn.addEventListener("click", () => {
        slideLeft();
        stopAutoSlide();
        startAutoSlide();
      });
    }
  }

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  let currentTestimonial = 0;
  let testimonialInterval;

  function resetTestimonials() {
    testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active");
    });
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });
  }

  function startTestimonial() {
    resetTestimonials();
    testimonials[currentTestimonial].classList.add("active");
    dots[currentTestimonial].classList.add("active");
  }

  function nextTestimonial() {
    resetTestimonials();
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].classList.add("active");
    dots[currentTestimonial].classList.add("active");
  }

  if (testimonials.length > 0 && dots.length > 0) {
    // Auto slide testimonials
    function startAutoTestimonial() {
      testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    function stopAutoTestimonial() {
      clearInterval(testimonialInterval);
    }

    startTestimonial();
    startAutoTestimonial();

    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        resetTestimonials();
        currentTestimonial = index;
        testimonials[currentTestimonial].classList.add("active");
        dot.classList.add("active");
        stopAutoTestimonial();
        startAutoTestimonial();
      });
    });
  }

  // Product Category Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  const productCards = document.querySelectorAll(".product-card");

  if (tabBtns.length > 0 && productCards.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        tabBtns.forEach((btn) => {
          btn.classList.remove("active");
        });

        // Add active class to clicked button
        btn.classList.add("active");

        // Filter products
        const category = btn.getAttribute("data-category");

        productCards.forEach((card) => {
          if (
            category === "all" ||
            card.getAttribute("data-category") === category
          ) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // Product Modal
  const productLinks = document.querySelectorAll(".product-link");
  const modal = document.querySelector(".product-modal");
  const closeModal = document.querySelector(".close-modal");

  if (productLinks.length > 0 && modal) {
    productLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      });
    });

    if (closeModal) {
      closeModal.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      });
    }

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  // Quantity Selector
  const minusBtn = document.querySelector(".minus");
  const plusBtn = document.querySelector(".plus");
  const quantityInput = document.querySelector("#quantity");

  if (minusBtn && plusBtn && quantityInput) {
    minusBtn.addEventListener("click", () => {
      let value = parseInt(quantityInput.value);
      if (value > 1) {
        value--;
        quantityInput.value = value;
      }
    });

    plusBtn.addEventListener("click", () => {
      let value = parseInt(quantityInput.value);
      if (value < parseInt(quantityInput.max)) {
        value++;
        quantityInput.value = value;
      }
    });

    quantityInput.addEventListener("change", () => {
      let value = parseInt(quantityInput.value);
      if (value < 1) {
        quantityInput.value = 1;
      } else if (value > parseInt(quantityInput.max)) {
        quantityInput.value = quantityInput.max;
      }
    });
  }

  // FAQ Accordion
  const accordionButtons = document.querySelectorAll(".accordion-button");

  if (accordionButtons.length > 0) {
    accordionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const content = button.nextElementSibling;

        // Toggle active class on button
        button.classList.toggle("active");

        // Toggle content visibility
        if (button.classList.contains("active")) {
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.style.maxHeight = 0;
        }

        // Close other accordion items
        accordionButtons.forEach((otherButton) => {
          if (otherButton !== button) {
            otherButton.classList.remove("active");
            otherButton.nextElementSibling.style.maxHeight = 0;
          }
        });
      });
    });
  }

  // Contact Form Validation
  const contactForm = document.querySelector("#contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Basic validation
      let valid = true;
      const name = document.querySelector("#name");
      const email = document.querySelector("#email");
      const message = document.querySelector("#message");

      if (!name.value.trim()) {
        valid = false;
        showError(name, "Name is required");
      } else {
        removeError(name);
      }

      if (!email.value.trim()) {
        valid = false;
        showError(email, "Email is required");
      } else if (!isValidEmail(email.value)) {
        valid = false;
        showError(email, "Please enter a valid email");
      } else {
        removeError(email);
      }

      if (!message.value.trim()) {
        valid = false;
        showError(message, "Message is required");
      } else {
        removeError(message);
      }

      if (valid) {
        // Simulate form submission
        alert("Thank you for your message! We will get back to you soon.");
        contactForm.reset();
      }
    });
  }

  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement =
      formGroup.querySelector(".error-message") ||
      document.createElement("div");

    if (!formGroup.querySelector(".error-message")) {
      errorElement.className = "error-message";
      errorElement.style.color = "var(--danger-color)";
      errorElement.style.fontSize = "0.9rem";
      errorElement.style.marginTop = "5px";
      formGroup.appendChild(errorElement);
    }

    errorElement.textContent = message;
    input.style.borderColor = "var(--danger-color)";
  }

  function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector(".error-message");

    if (errorElement) {
      formGroup.removeChild(errorElement);
    }

    input.style.borderColor = "#ddd";
  }

  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Add to Cart Functionality
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productCard =
          button.closest(".product-card") || button.closest(".modal-info");
        const productName = productCard.querySelector("h3")
          ? productCard.querySelector("h3").textContent
          : "Product";
        const quantity = document.querySelector("#quantity")
          ? document.querySelector("#quantity").value
          : 1;

        // Show confirmation message
        alert(`Added ${quantity} ${productName} to cart!`);

        // Here you would typically update a cart object and persist it
        // For this demo, we're just showing an alert
      });
    });
  }
});
