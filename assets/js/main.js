// ------- Dark theme and localStorage
document.addEventListener("DOMContentLoaded", () => {
  const darkModeCheckbox = document.getElementById("dark-mode");

  // load saved theme from localStorage
  const savedTheme = localStorage.getItem("darkMode");
  if (savedTheme === "true") {
    darkModeCheckbox.checked = true;
  } else {
    darkModeCheckbox.checked = false;
  }

  // apply the theme initially
  darkModeCheckbox.dispatchEvent(new Event("change"));

  // listen for changes
  darkModeCheckbox.addEventListener("change", () => {
    if (darkModeCheckbox.checked) {
      localStorage.setItem("darkMode", "true");
    } else {
      localStorage.setItem("darkMode", "false");
    }
  });
});
