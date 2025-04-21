// Theme toggle functionality
function setTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add("dark")
    localStorage.setItem("theme", "dark")
  } else {
    document.documentElement.classList.remove("dark")
    localStorage.setItem("theme", "light")
  }
}

// Check for saved theme preference or use system preference
function initTheme() {
  const savedTheme = localStorage.getItem("theme")
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    setTheme(true)
  }
}

// Initialize theme when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initTheme()

  // Add event listeners to theme toggle buttons
  const themeToggles = document.querySelectorAll('[id$="theme-toggle"]')
  themeToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const isDark = document.documentElement.classList.contains("dark")
      setTheme(!isDark)
    })
  })
})
