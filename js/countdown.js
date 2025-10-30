/* ===================================
   Countdown Timer
   =================================== */

// Wedding date: November 23, 2025, 10:58 AM
const weddingDate = new Date('2025-11-23T10:58:00+05:30').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update DOM
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;
    
    // If countdown is finished
    if (distance < 0) {
        if (daysEl) daysEl.textContent = '0';
        if (hoursEl) hoursEl.textContent = '0';
        if (minutesEl) minutesEl.textContent = '0';
        if (secondsEl) secondsEl.textContent = '0';
        
        // Optional: Show a message
        const countdownContainer = document.querySelector('.countdown-container');
        if (countdownContainer) {
            countdownContainer.innerHTML = '<p class="countdown-finished">The wedding day is here! 🎉</p>';
        }
    }
}

// Initialize countdown
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    });
} else {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}
