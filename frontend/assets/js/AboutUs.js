// --- Small utility: reveal on scroll ---
    const revealEls = document.querySelectorAll('.reveal, .gradient-card');
    const onScroll = () => {
      const bottom = window.innerHeight - 100;
      revealEls.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < bottom) el.classList.add('show');
      });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();


    // --- Counter animation ---
    function runCounters(){
      document.querySelectorAll('[data-counter]').forEach(el => {
        const target = +el.getAttribute('data-counter');
        let val = 0;
        const step = Math.max(1, Math.floor(target / 80));
        const iv = setInterval(() => {
          val += step; el.textContent = val > target ? target : val;
          if (val >= target) clearInterval(iv);
        }, 14);
      });
    }
    window.addEventListener('load', runCounters);

    // --- contact form (demo-only) ---
    function handleForm(e){
      e.preventDefault();
      const s = document.getElementById('formStatus');
      s.textContent = 'Sending...';
      // Simulate network request
      setTimeout(()=>{
        s.textContent = 'Message sent — we will reply within 1 business day.';
        e.target.reset();
      }, 900);
    }

    // --- micro-interactions for header menu ---
    const menuBtn = document.getElementById('menuBtn');
    menuBtn.addEventListener('click', ()=> alert('Mobile menu placeholder — integrate your menu or use a framework like HeadlessUI.'));

    // --- Fill copyright year ---
    document.getElementById('thisYear').textContent = new Date().getFullYear();

    // Accessibility: reduce motion if user prefers
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.floaty').forEach(el=>el.style.animation = 'none');
    }

    // Reveal on scroll
document.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    let rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add("show");
    }
  });
});
 
// Counter animation
document.querySelectorAll(".counter").forEach(counter => {
  let updateCount = () => {
    let target = +counter.getAttribute("data-counter");
    let count = +counter.innerText;
    let speed = 18;
    if (count < target) {
      counter.innerText = count + 1;
      setTimeout(updateCount, speed);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});

    
    