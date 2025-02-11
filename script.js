gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let sections = document.querySelectorAll("[id^='order']");
let isScrolling = false; // ✅ Declare this globally
let currentIndex = 0;
let order = 0;

// ✅ Fix passive event listener issue by setting { passive: false }
document.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault(); // Now allowed
  },
  { passive: false }
);

document.addEventListener("wheel", (event) => {
  if (isScrolling) return;
  isScrolling = true;
  setTimeout(() => {
    isScrolling = false;
  }, 1200);
  let direction = event.deltaY > 0 ? 1 : -1;
  if (direction === -1 && (order === 0 || order === 1)) {
    document.getElementById(`order1`).style.opacity = "1";
    document.getElementById(`order2`).style.opacity = "1";
    document.querySelectorAll(`#order1 img`).forEach((img) => {
      img.classList.remove("selected-img");
    });
  }
  if (direction === -1 && order === 1) return order=order-1;
  if (direction === 1 && order === 4) return;
  if (order) {
    gsap.to(".scroll-container", {
      scrollTo: {
        y: `#order${direction === 1 ? order + 1 : order - 1}`, // Scrolls to the target element
        offsetY: 180, // Adds 30px offset from the top
      },
      duration: 1,
      ease: "power1.inOut",
      onComplete: () => {},
    });
    document.getElementById(`order${order}`).style.opacity = "0.4";
    document.querySelectorAll(`#order${order} img`).forEach((img) => {
      img.classList.remove("selected-img");
    });
  }

  if (order === 0) {
    document.getElementById(`order2`).style.opacity = "0.4";
  }
  document.getElementById(
    `order${direction === 1 ? order + 1 : order - 1}`
  ).style.opacity = "1";
  document
    .querySelectorAll(`#order${direction === 1 ? order + 1 : order - 1} img`)
    .forEach((img) => {
      img.classList.add("selected-img");
    });

  order = direction === 1 ? order + 1 : order - 1;
});
