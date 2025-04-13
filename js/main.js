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


// Product data - this would typically come from a database
const products = {
  1: {
      id: 1,
      name: "Sourdough Bread",
      description: "Our signature sourdough with a perfect crust and soft interior. Made with a 3-day fermentation process for maximum flavor development.",
      price: "UGX 8,000",
      image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ingredients: "Organic flour, water, salt, sourdough starter"
  },
  2: {
      id: 2,
      name: "Multigrain Loaf",
      description: "Nutritious bread packed with various grains and seeds. Perfect for sandwiches and toast.",
      price: "UGX 7,500",
      image: "./images/loaf.jpg",
      ingredients: "Whole wheat flour, oats, flax seeds, sunflower seeds, pumpkin seeds, honey, yeast, water, salt"
  },
  3: {
      id: 3,
      name: "French Baguette",
      description: "Traditional French bread with a crispy crust and light interior. Baked fresh daily in our stone oven.",
      price: "UGX 6,000",
      image: "https://images.unsplash.com/photo-1620921568790-c1cf8984624c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ingredients: "Unbleached flour, water, salt, yeast"
  },
  4: {
      id: 4,
      name: "Chocolate Croissants",
      description: "Buttery, flaky croissants filled with rich chocolate. Made with imported French butter for authentic taste.",
      price: "UGX 5,500",
      image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ingredients: "Flour, butter, chocolate, sugar, eggs, milk, salt"
  },
  5: {
      id: 5,
      name: "Cinnamon Rolls",
      description: "Soft, sweet rolls with cinnamon and cream cheese frosting. Perfect with your morning coffee.",
      price: "UGX 6,000",
      image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      ingredients: "Flour, butter, sugar, cinnamon, eggs, milk, cream cheese, vanilla extract"
  },
  6: {
      id: 6,
      name: "Fruit Danish",
      description: "Flaky pastry topped with seasonal fruits and vanilla custard. A delightful treat any time of day.",
      price: "UGX 5,000",
      image: "https://images.unsplash.com/photo-1623334044303-241021148842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ingredients: "Flour, butter, eggs, seasonal fruits, vanilla custard, sugar"
  },
  7: {
      id: 7,
      name: "Birthday Cake",
      description: "Custom-made celebration cakes for your special occasions. Available in various flavors and designs.",
      price: "From UGX 45,000",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1689&q=80",
      ingredients: "Flour, sugar, butter, eggs, milk, vanilla extract, baking powder, frosting (varies by design)"
  },
  8: {
      id: 8,
      name: "Chocolate Cake",
      description: "Rich, moist chocolate cake with ganache frosting. Made with premium dark chocolate for intense flavor.",
      price: "UGX 35,000",
      image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      ingredients: "Dark chocolate, flour, sugar, eggs, butter, cocoa powder, baking soda, salt, vanilla extract"
  },
  9: {
      id: 9,
      name: "New York Cheesecake",
      description: "Creamy cheesecake with a graham cracker crust. Our most popular dessert item.",
      price: "UGX 40,000",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1436&q=80",
      ingredients: "Cream cheese, sugar, eggs, graham crackers, butter, vanilla extract, sour cream"
  },
  10: {
      id: 10,
      name: "Chocolate Chip Cookies",
      description: "Classic cookies with chunks of chocolate and a soft center. Baked fresh throughout the day.",
      price: "UGX 2,000 each",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ingredients: "Flour, butter, brown sugar, white sugar, eggs, chocolate chunks, vanilla extract, baking soda, salt"
  },
  11: {
      id: 11,
      name: "Assorted Macarons",
      description: "Delicate French cookies in various flavors. Perfect for gifts or special treats.",
      price: "UGX 3,500 each",
      image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      ingredients: "Almond flour, egg whites, sugar, food coloring, various fillings (chocolate ganache, buttercream, fruit preserves)"
  },
  12: {
      id: 12,
      name: "Shortbread Cookies",
      description: "Buttery, crumbly traditional shortbread. Simple yet delicious.",
      price: "UGX 2,500 each",
      image: "https://images.unsplash.com/photo-1584365685547-9a5fb6f3a70c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      ingredients: "Butter, flour, sugar, vanilla extract, salt"
  }
};

document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  
  if (burger) {
      burger.addEventListener('click', function() {
          nav.classList.toggle('nav-active');
          burger.classList.toggle('toggle');
      });
  }
  
  // Product category filtering
  const tabBtns = document.querySelectorAll('.tab-btn');
  const productCards = document.querySelectorAll('.product-card');
  
  if (tabBtns.length > 0) {
      tabBtns.forEach(btn => {
          btn.addEventListener('click', function() {
              // Remove active class from all buttons
              tabBtns.forEach(btn => btn.classList.remove('active'));
              
              // Add active class to clicked button
              this.classList.add('active');
              
              // Get category to filter
              const category = this.getAttribute('data-category');
              
              // Show/hide products based on category
              productCards.forEach(card => {
                  if (category === 'all' || card.getAttribute('data-category') === category) {
                      card.style.display = 'block';
                  } else {
                      card.style.display = 'none';
                  }
              });
          });
      });
  }
  
  // Product modal functionality
  const modal = document.getElementById('productModal');
  const viewButtons = document.querySelectorAll('.view-product');
  const closeModal = document.querySelector('.close-modal');
  const quantityInput = document.getElementById('quantity');
  const minusBtn = document.querySelector('.quantity-btn.minus');
  const plusBtn = document.querySelector('.quantity-btn.plus');
  
  // Open modal when view details is clicked
  if (viewButtons.length > 0) {
      viewButtons.forEach(button => {
          button.addEventListener('click', function() {
              const productId = this.getAttribute('data-id');
              const product = products[productId];
              
              if (product) {
                  // Populate modal with product data
                  document.getElementById('modalImage').src = product.image;
                  document.getElementById('modalTitle').textContent = product.name;
                  document.getElementById('modalDescription').textContent = product.description;
                  document.getElementById('modalPrice').textContent = product.price;
                  document.getElementById('modalIngredients').textContent = product.ingredients;
                  
                  // Reset quantity
                  quantityInput.value = 1;
                  
                  // Show modal
                  modal.style.display = 'block';
                  document.body.style.overflow = 'hidden'; // Prevent scrolling
              }
          });
      });
  }
  
  // Close modal when X is clicked
  if (closeModal) {
      closeModal.addEventListener('click', function() {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto'; // Enable scrolling
      });
  }
  
  // Close modal when clicking outside of it
  window.addEventListener('click', function(event) {
      if (event.target === modal) {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto'; // Enable scrolling
      }
  });
  
  // Quantity selector functionality
  if (minusBtn && plusBtn && quantityInput) {
      minusBtn.addEventListener('click', function() {
          let value = parseInt(quantityInput.value);
          if (value > 1) {
              quantityInput.value = value - 1;
          }
      });
      
      plusBtn.addEventListener('click', function() {
          let value = parseInt(quantityInput.value);
          if (value < 20) {
              quantityInput.value = value + 1;
          }
      });
      
      // Ensure quantity is always valid
      quantityInput.addEventListener('change', function() {
          let value = parseInt(this.value);
          if (isNaN(value) || value < 1) {
              this.value = 1;
          } else if (value > 20) {
              this.value = 20;
          }
      });
  }
  
  // Add to cart functionality (placeholder)
  const addToCartBtn = document.querySelector('.add-to-cart');
  if (addToCartBtn) {
      addToCartBtn.addEventListener('click', function() {
          const productName = document.getElementById('modalTitle').textContent;
          const quantity = document.getElementById('quantity').value;
          
          // Here you would typically add the item to a cart object/array
          // and update the UI to show the cart count
          
          // For now, just show an alert
          alert(`Added ${quantity} ${productName}(s) to cart!`);
          
          // Close the modal
          modal.style.display = 'none';
          document.body.style.overflow = 'auto'; // Enable scrolling
      });
  }
});
