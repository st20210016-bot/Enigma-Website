// Scroll Reveal System
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => revealOnScroll.observe(reveal));
});

// Subtle Parallax for Grid Background
window.addEventListener('scroll', () => {
    const grid = document.querySelector('.bg-grid');
    if (grid) {
        const scrolled = window.scrollY;
        grid.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
});

// Product Pricing Logic 
const pricing = {
    'fn-public': { '5': '$5', '15': '$15', '45': '$45', '100': '$100' },
    'fn-private': { '15': '$15', '30': '$30', '70': '$70', '120': '$120' },
    'perm-spoofer': { '12': '$12', '25': '$25', '50': '$50', '70': '$70' },
    'temp-spoofer': { '5': '$5', '15': '$15', '35': '$35' }
};

document.querySelectorAll('.duration-select').forEach(select => {
    select.addEventListener('change', (e) => {
        const targetId = e.target.getAttribute('data-target');
        const productId = e.target.getAttribute('data-product');
        const durationValue = e.target.value;
        const targetElement = document.getElementById(targetId);

        if (targetElement && pricing[productId][durationValue]) {
            targetElement.textContent = pricing[productId][durationValue];
            targetElement.style.transform = 'scale(1.1)';
            setTimeout(() => targetElement.style.transform = 'scale(1)', 200);
        }
    });
});

// Product IDs mapped to Stripe Payment Links (Replace 'LINK_URL' with your actual Stripe Payment Links)
const stripeLinks = {
    'fn-public': {
        '5': 'https://buy.stripe.com/test_...',
        '15': 'https://buy.stripe.com/test_...',
        '45': 'https://buy.stripe.com/test_...',
        '100': 'https://buy.stripe.com/test_...'
    },
    'fn-private': {
        '15': 'https://buy.stripe.com/test_...',
        '30': 'https://buy.stripe.com/test_...',
        '70': 'https://buy.stripe.com/test_...',
        '120': 'https://buy.stripe.com/test_...'
    },
    'perm-spoofer': {
        '12': 'https://buy.stripe.com/test_...',
        '25': 'https://buy.stripe.com/test_...',
        '50': 'https://buy.stripe.com/test_...',
        '70': 'https://buy.stripe.com/test_...'
    },
    'temp-spoofer': {
        '5': 'https://buy.stripe.com/test_...',
        '15': 'https://buy.stripe.com/test_...',
        '35': 'https://buy.stripe.com/test_...'
    }
};

function openCheckout(productName) {
    // Find the currently selected duration for this product
    const productSelects = document.querySelectorAll('.duration-select');
    let selectedValue = null;
    let productId = null;

    productSelects.forEach(select => {
        const rawProductName = productName.toLowerCase().replace(' ', '-');
        if (select.getAttribute('data-product') === rawProductName) {
            selectedValue = select.value;
            productId = select.getAttribute('data-product');
        }
    });

    if (productId && selectedValue && stripeLinks[productId][selectedValue]) {
        const paymentLink = stripeLinks[productId][selectedValue];

        if (paymentLink.includes('stripe.com')) {
            // Redirect the user to the Stripe Payment Link
            window.location.href = paymentLink;
        } else {
            alert("Payment link not set up yet. Please check back later or join our Discord.");
        }
    } else {
        alert("Product selection error. Please try again.");
    }
}
