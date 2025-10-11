// Counter animation when in view
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = 20; // smaller = faster

        const updateCount = () => {
            count++;
            if(count <= target){
                counter.innerText = count;
                setTimeout(updateCount, speed);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// Trigger when stats container visible
let countersStarted = false;
window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats-container-hero');
    if(!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if(!countersStarted && rect.top < window.innerHeight){
        countersStarted = true;
        animateCounters();
    }
});
