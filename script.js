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

const modeToggle = document.getElementById("mode-toggle");

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

//SLider
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

      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      });

      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      });

      // Optional: click on image also goes forward
      slider.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      });
    }
  });
});
