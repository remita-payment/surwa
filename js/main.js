// Theme toggle functionality
function setTheme(isDark) {
  console.log("Setting theme to dark:", isDark)
  if (isDark) {
    document.documentElement.classList.add("dark")
    document.body.classList.add("dark")
    localStorage.setItem("theme", "dark")
    console.log("Dark theme applied")
  } else {
    document.documentElement.classList.remove("dark")
    document.body.classList.remove("dark")
    localStorage.setItem("theme", "light")
    console.log("Light theme applied")
  }
}

// Check for saved theme preference or use system preference
function initTheme() {
  console.log("Initializing theme")
  const savedTheme = localStorage.getItem("theme")
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  console.log("Saved theme:", savedTheme)
  console.log("System prefers dark:", systemPrefersDark)

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    setTheme(true)
  }
  
  // Handle visibility of theme toggle buttons based on screen size
  const handleScreenSize = () => {
    const isMobile = window.innerWidth < 768;
    const floatingToggle = document.getElementById("floating-theme-toggle");
    
    if (floatingToggle) {
      if (isMobile) {
        floatingToggle.style.display = "none";
      } else {
        floatingToggle.style.display = "flex";
      }
    }
  }
  
  // Initial check
  handleScreenSize();
  
  // Add resize listener
  window.addEventListener('resize', handleScreenSize);
}

// Email functionality
function initEmailFunctionality() {
  // Initialize EmailJS with your user ID
  if (typeof emailjs !== "undefined") {
    emailjs.init("YOUR_EMAILJS_USER_ID") // Replace with your actual EmailJS user ID

    const contactForm = document.getElementById("contact-form")
    const submitBtn = document.getElementById("submit-btn")
    const formStatus = document.getElementById("form-status")

    if (contactForm) {
      contactForm.addEventListener("submit", (event) => {
        event.preventDefault()

        // Show loading state
        const originalBtnText = submitBtn.innerHTML
        submitBtn.innerHTML =
          '<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...'
        submitBtn.disabled = true

        // Prepare template parameters
        const templateParams = {
          from_name: document.getElementById("name").value,
          from_email: document.getElementById("email").value,
          subject: document.getElementById("subject").value,
          message: document.getElementById("message").value,
        }

        // Send email using EmailJS
        emailjs
          .send("default_service", "template_id", templateParams) // Replace with your service ID and template ID
          .then(
            (response) => {
              formStatus.classList.remove("hidden", "bg-red-100", "text-red-700")
              formStatus.classList.add("bg-green-100", "text-green-700")
              formStatus.innerHTML = "Your message has been sent successfully!"
              contactForm.reset()
            },
            (error) => {
              formStatus.classList.remove("hidden", "bg-green-100", "text-green-700")
              formStatus.classList.add("bg-red-100", "text-red-700")
              formStatus.innerHTML = "Sorry, there was an error sending your message. Please try again later."
            },
          )
          .finally(() => {
            submitBtn.innerHTML = originalBtnText
            submitBtn.disabled = false
          })
      })
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing theme")
  // Initialize theme
  initTheme()

  // Add event listeners to theme toggle buttons
  const themeToggle = document.getElementById("theme-toggle")
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle")

  if (themeToggle) {
    console.log("Desktop theme toggle found")
    themeToggle.addEventListener("click", () => {
      console.log("Desktop theme toggle clicked")
      const isDark = document.documentElement.classList.contains("dark")
      setTheme(!isDark)
    })
  } else {
    console.error("Desktop theme toggle not found")
  }

  if (mobileThemeToggle) {
    console.log("Mobile theme toggle found")
    mobileThemeToggle.addEventListener("click", () => {
      console.log("Mobile theme toggle clicked")
      const isDark = document.documentElement.classList.contains("dark")
      setTheme(!isDark)
    })
  } else {
    console.error("Mobile theme toggle not found")
  }

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll("a")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden")
      })
    })
  }

  // Initialize AOS animation library if it exists
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    })
  } else {
    console.warn("AOS is not defined. Make sure it's properly imported.")
  }

  // Initialize email functionality
  initEmailFunctionality()
})

// Add a direct theme toggle function to the window object for direct access
window.toggleTheme = () => {
  console.log("Direct theme toggle called")
  const isDark = document.documentElement.classList.contains("dark")
  setTheme(!isDark)
}
