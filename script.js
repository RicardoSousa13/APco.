// ----------- Custom Cursor -----------
const customCursor = document.querySelector(".custom-cursor");
const links = document.querySelectorAll("a, button, summary");

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    customCursor.style.transform = "translate(-50%, -50%) scale(1.3)";
  });

  link.addEventListener("mouseleave", () => {
    customCursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

document.addEventListener("mousemove", (e) => {
  customCursor.style.left = `${e.clientX}px`;
  customCursor.style.top = `${e.clientY}px`;
});

// ----------- Dark Mode Toggle -----------
const modeToggle = document.getElementById("mode-toggle");

modeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  updateLogoColor();
});

// ----------- Lottie Logo Animation -----------
const logoContainer = document.getElementById("logo-animation");
let logoAnimation;

if (logoContainer) {
  logoAnimation = lottie.loadAnimation({
    container: logoContainer,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "images/Scene-1.json",
  });

  logoAnimation.addEventListener("DOMLoaded", () => {
    logoAnimation.goToAndStop(logoAnimation.totalFrames, true);
    updateLogoColor();
  });

  logoContainer.addEventListener("mouseenter", () => {
    logoAnimation.setDirection(-1);
    logoAnimation.play();
  });

  logoContainer.addEventListener("mouseleave", () => {
    logoAnimation.setDirection(1);
    logoAnimation.play();
  });

  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  window.addEventListener("scroll", () => {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop < lastScrollTop) {
      logoAnimation.setDirection(-1);
      logoAnimation.play();
    } else if (currentScrollTop > lastScrollTop) {
      logoAnimation.setDirection(1);
      logoAnimation.play();
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  });
}

function updateLogoColor() {
  setTimeout(() => {
    const svgPaths = logoContainer?.getElementsByTagName("path") || [];
    const newColor = document.body.classList.contains("dark-mode")
      ? "white"
      : "black";

    for (let i = 0; i < svgPaths.length; i++) {
      svgPaths[i].setAttribute("fill", newColor);
    }
  }, 100);
}

// ----------- Slider -----------
document.addEventListener("DOMContentLoaded", function () {
  const sliderContainers = document.querySelectorAll(".slider-container");

  sliderContainers.forEach((container) => {
    const slider = container.querySelector(".slider");
    const images = slider.querySelectorAll("img");
    const prevBtn = container.querySelector(".prev");
    const nextBtn = container.querySelector(".next");
    let currentIndex = 0;

    if (images.length > 0) {
      images[currentIndex].classList.add("active");

      function showImage(index) {
        images.forEach((img) => img.classList.remove("active"));
        images[index].classList.add("active");
      }

      nextBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      });

      prevBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      });

      slider?.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      });
    }
  });
});

// ----------- Filters (Archive Page) -----------
const typeFilter = document.getElementById("filter-type");
const yearFilter = document.getElementById("filter-year");
const stateFilter = document.getElementById("stateFilter");
const projects = document.querySelectorAll(".hdrLWF details");

function filterProjects() {
  const selectedType = typeFilter?.value.toLowerCase() || "";
  const selectedYear = yearFilter?.value || "";
  const selectedState = stateFilter?.value.toLowerCase() || "";

  projects.forEach((project) => {
    const type = project.dataset.type?.toLowerCase() || "";
    const year = project.dataset.year || "";
    const state = project.dataset.state?.toLowerCase() || "";

    const matchesType = selectedType === "all" || type === selectedType;
    const matchesYear = selectedYear === "all" || year === selectedYear;
    const matchesState = !selectedState || state === selectedState;

    project.style.display =
      matchesType && matchesYear && matchesState ? "block" : "none";
  });
}

typeFilter?.addEventListener("change", filterProjects);
yearFilter?.addEventListener("change", filterProjects);
stateFilter?.addEventListener("change", filterProjects);
filterProjects(); // Run once on load
