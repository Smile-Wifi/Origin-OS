document.addEventListener('DOMContentLoaded', () => {
    // 1. Generate Stars for Galaxy Background
    const galaxyBg = document.querySelector('.galaxy-bg');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const duration = 2 + Math.random() * 5;
        const delay = Math.random() * 5;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${top}%`;
        star.style.left = `${left}%`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.animationDelay = `${delay}s`;

        galaxyBg.appendChild(star);
    }

    // 2. Smooth Scroll for Home Button and Footer Trigger
    const homeBtn = document.querySelector('.home-btn');
    const footerTrigger = document.querySelector('#show-apps-trigger');
    const appsSection = document.querySelector('#apps-section');

    const scrollToApps = () => {
        appsSection.scrollIntoView({ behavior: 'smooth' });
    };

    if (homeBtn) homeBtn.addEventListener('click', scrollToApps);
    if (footerTrigger) footerTrigger.addEventListener('click', scrollToApps);

    // 3. Search Functionality (Simple Filter)
    const searchBar = document.querySelector('.search-bar');
    const appCards = document.querySelectorAll('.app-card');

    searchBar.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        appCards.forEach(card => {
            const name = card.querySelector('.app-name').textContent.toLowerCase();
            if (name.includes(term)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // 4. Slider Touch Swipe Support (Native scroll handles this, but we can add snap feedback)
    const slider = document.querySelector('.slider-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    // 5. Lazy Loading Simulation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.app-card, .slider-card, .video-container').forEach(el => {
        observer.observe(el);
    });
});
