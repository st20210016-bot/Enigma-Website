// Pricing data
const products = {
    'fortnite-public': {
        '1-day': 5,
        '1-week': 15,
        '1-month': 45,
        'lifetime': 100
    },
    'fortnite-private': {
        '1-day': 15,
        '1-week': 30,
        '1-month': 70,
        'lifetime': 120
    },
    'spoofer-perm': {
        '1-day': 12,
        '1-week': 25,
        '1-month': 50,
        'lifetime': 70
    },
    'spoofer-temp': {
        '1-day': 5,
        '1-week': 15,
        '1-month': 35
    }
};

// Update price on duration change
document.querySelectorAll('.duration-select').forEach(select => {
    select.addEventListener('change', (e) => {
        const productId = e.target.dataset.product;
        const duration = e.target.value;
        const priceElement = document.getElementById(`price-${productId}`);
        const price = products[productId][duration];
        if (price) {
            priceElement.textContent = `$${price}`;
        } else {
            priceElement.textContent = 'N/A';
        }
    });
});

// Modal Logic
const modal = document.getElementById('checkout-modal');
const checkoutTitle = document.getElementById('checkout-title');
const checkoutTotal = document.getElementById('checkout-total');
const processingView = document.getElementById('processing-view');
const successView = document.getElementById('success-view');
const licenseKeyEl = document.getElementById('license-key');
const initialView = document.getElementById('initial-view');

document.querySelectorAll('.btn-buy').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // e.currentTarget instead of e.target incase inner icon clicked
        const ct = e.currentTarget;
        const productId = ct.dataset.product;
        const durationSelect = document.querySelector(`.duration-select[data-product="${productId}"]`);

        let duration = '';
        let price = '';
        let title = '';

        if (durationSelect) {
            duration = durationSelect.value;
            price = products[productId][duration];
            title = ct.dataset.title + ' - ' + durationSelect.options[durationSelect.selectedIndex].text;
        } else {
            duration = 'lifetime';
            price = products[productId][duration];
            title = ct.dataset.title;
        }

        checkoutTitle.textContent = title;
        checkoutTotal.textContent = `Total: $${price}`;

        // Reset Views
        initialView.classList.remove('hidden');
        processingView.classList.add('hidden');
        successView.classList.add('hidden');

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    });
});

document.getElementById('close-modal').addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
});

document.getElementById('confirm-purchase').addEventListener('click', () => {
    initialView.classList.add('hidden');
    processingView.classList.remove('hidden');
    processingView.classList.add('flex');

    setTimeout(() => {
        processingView.classList.add('hidden');
        processingView.classList.remove('flex');
        successView.classList.remove('hidden');

        // Generate random fake key
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const segments = Array.from({ length: 4 }, () =>
            Array.from({ length: 4 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
        );
        licenseKeyEl.textContent = `ENIG-${segments.join('-')}`;
    }, 2500);
});

// FAQ Accordion
document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('.chevron');

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.style.transform = "rotate(0deg)";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.style.transform = "rotate(180deg)";
        }
    });
});

// Countdown timer
function updateCountdown() {
    const el = document.getElementById('countdown');
    if (!el) return;

    let time = el.textContent.split(':');
    let m = parseInt(time[0]);
    let s = parseInt(time[1]);

    if (s > 0) {
        s--;
    } else {
        if (m > 0) {
            m--;
            s = 59;
        } else {
            m = 5;
            s = 0;
            const slots = document.querySelectorAll('.slots-left');
            slots.forEach(s => s.textContent = Math.floor(Math.random() * 5) + 2);
        }
    }

    el.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
setInterval(updateCountdown, 1000);
