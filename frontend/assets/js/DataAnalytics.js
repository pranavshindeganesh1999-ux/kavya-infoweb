// Scroll animations for paragraphs
const faders = document.querySelectorAll(".business-section p");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.style.opacity = "1";
    entry.target.style.transform = "translateY(0)";
    entry.target.style.transition = "all 0.8s ease-out";
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
