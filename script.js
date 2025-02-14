gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let sections = document.querySelectorAll("[id^='order']");
let isScrolling = false;
let currentIndex = 0;
let order = 0;
const textArray = [
  {},

  {
    heading: "Real Time Monitoring",
    p: "Real Time Monitoring displays solar intake, battery percentage, power usage and charge for any trailer, in real time.",
  },
  {
    heading: "Detailed Analytics",
    p: "Real Time Monitoring displays solar intake, battery percentage, power usage and charge for any trailer, in real time.",
  },
  {
    heading: "Overview Graph",
    p: "Real Time Monitoring displays solar intake, battery percentage, power usage and charge for any trailer, in real time.",
  },
  {
    heading: "Historical Data",
    p: "Real Time Monitoring displays solar intake, battery percentage, power usage and charge for any trailer, in real time.",
  },
  {
    heading: "Alerts & Notifications",
    p: "Real Time Monitoring displays solar intake, battery percentage, power usage and charge for any trailer, in real time.",
  },
];

document.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
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

  console.log("order ", order)

  if (order === 0) {
    gsap.to(".mockup-container", {
      scale: 1,
      top: 0
    })
  }


  if (order === 1) {
    document.getElementById("right-text").style.opacity = "0";
    document.getElementById("left-text").style.opacity = "0";
  }
  if (direction === -1 && (order === 0 || order === 1)) {
    gsap.to(".mockup-container", {
      scale: 1.6,
      top: "60%"
    })

    document.getElementById(`order1`).style.opacity = "1";
    document.getElementById(`order2`).style.opacity = "1";
    document.querySelectorAll(`#order1 img`).forEach((img) => {
      img.classList.remove("selected-img");
    });
  }



  if (direction === -1 && order === 1) return (order = order - 1);
  if (direction === 1 && order === 6) return;

  if (order === 4 && direction === 1) {
    console.log("order4",)
    gsap.to("#order5", {
      opacity: 100,
      x: 0
    })
    gsap.to(`#right-text`, {
      opacity: 1,
      duration: 1,
      onComplete: () => { },
    });
    gsap.to(`#left-text`, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => { },
    });
    const leftElement = document.getElementById("right-text");
    leftElement.querySelector("h2").innerText = textArray[5].heading;
    leftElement.querySelector("p").innerText = textArray[5].p;
    leftElement.querySelector("img").src = `./assets/images/data-${5}.png`;
    return
  }
  if (order === 4 && direction === -1) {
    gsap.to("#order5", {
      opacity: 0,
      x: 300,
    });
  }

  if (order) {
    gsap.to(".scroll-container", {
      scrollTo: {
        y: `#order${direction === 1 ? order + 1 : order - 1}`,
        offsetY: 180,
      },
      duration: 1,
      ease: "power1.inOut",
      onComplete: () => { },
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
  if (order % 2 === 0) {
    // even
    gsap.to(`#left-text`, {
      opacity: 1,
      duration: 1,
      onComplete: () => { },
    });
    gsap.to(`#right-text`, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => { },
    });
    const leftElement = document.getElementById("left-text");
    leftElement.querySelector("h2").innerText = textArray[order].heading;
    leftElement.querySelector("p").innerText = textArray[order].p;
    leftElement.querySelector("img").src = `./assets/images/data-${order}.png`;
  } else {
    // odd
    const leftElement = document.getElementById("right-text");
    leftElement.querySelector("h2").innerText = textArray[order].heading;
    leftElement.querySelector("p").innerText = textArray[order].p;
    leftElement.querySelector("img").src = `./assets/images/data-${order}.png`;
    gsap.to(`#left-text`, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => { },
    });
    gsap.to(`#right-text`, {
      opacity: 1,
      duration: 1,
      onComplete: () => { },
    });
  }
});
