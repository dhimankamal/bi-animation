gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let sections = document.querySelectorAll("[id^='order']");
let isScrolling = false; // ✅ Declare this globally
let currentIndex = 0;
let order = 1;

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

  let direction = event.deltaY > 0 ? 1 : -1;

  gsap.to(".scroll-container", {
    scrollTo: `#order${order + 1}`,
    duration: 1,
    ease: "power1.inOut",
    onComplete: () => {
      isScrolling = false;
    },
  });
  order = order + 1;
}); // ✅ Add { passive: false } here too
