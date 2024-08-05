$(document).ready(function() {
    const progressFill = document.querySelector(".progress-fill");
    var swiper = new Swiper(".parallax-slider", {
        speed: 1000,
        parallax: true,
        loop: true,
        autoplay: {
            delay: 5000, // Adjust autoplay delay as needed
            disableOnInteraction: false
        },
        grabCursor: true,
        effect: "creative",
        creativeEffect: {
            prev: {
                shadow: true,
                translate: [0, 0, -1000]
            },
            next: {
                translate: ["100%", 0, 0]
            }
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        on: {
            slideChange: function () {
                // Reset progress bar when slide changes
                progressFill.style.width = '0%';
            },
            autoplayTimeLeft(s, time, progress) {
                // Update progress bar width based on autoplay time left
                progressFill.style.width = (1 - progress) * 100 + '%';
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.number');
    const speed = 200; // Speed of the counter animation

    const updateCount = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => updateCount(counter), 1);
        } else {
            counter.innerText = target;
        }
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                updateCount(counter);
                observer.unobserve(counter); // Stop observing after the count animation is done
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

    counters.forEach(counter => {
        observer.observe(counter);
    });
});
