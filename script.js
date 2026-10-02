// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Animasi muncul saat scroll untuk kartu pendidikan & hobi
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('show');
            }, index * 150);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.edu-card, .hobi-card').forEach(card => {
    observer.observe(card);
});

// Efek tilt 3D halus pada kartu pendidikan & hobi
document.querySelectorAll('.edu-card, .hobi-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        card.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Animasi muncul untuk section Tentang Saya
const aboutWrapper = document.querySelector('.about-wrapper');
if (aboutWrapper) {
    aboutWrapper.style.opacity = '0';
    aboutWrapper.style.transform = 'translateY(40px)';
    aboutWrapper.style.transition = 'all 0.9s ease';

    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });

    aboutObserver.observe(aboutWrapper);
}

// Animasi skill bar + angka naik
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const item = entry.target;
            const fill = item.querySelector('.skill-fill');
            const percent = item.querySelector('.skill-percent');
            const target = parseInt(percent.dataset.target);

            item.classList.add('show');

            setTimeout(() => {
                fill.style.width = fill.dataset.width + '%';
            }, 200);

            let current = 0;
            const step = target / 40;
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }
                percent.textContent = Math.floor(current) + '%';
            }, 30);

            skillObserver.unobserve(item);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-item').forEach(item => {
    skillObserver.observe(item);
});