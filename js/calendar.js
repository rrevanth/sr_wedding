/* ===================================
   Add to Calendar Functionality
   =================================== */

// Event data
const events = {
    haldi: {
        title: 'Haldi Ceremony - Revanth & Sravya Wedding',
        description: 'Join us for the Haldi ceremony at Pool Deck, Waltair Club, Vizag. Traditional attire in yellows and greens. Followed by lunch.',
        location: 'Pool Deck, Waltair Club, Vizag',
        start: '2025-11-22T11:00:00+05:30',
        end: '2025-11-22T14:00:00+05:30'
    },
    dinner: {
        title: 'Evening Dinner Celebration - Revanth & Sravya Wedding',
        description: 'Join us for an elegant evening dinner at The Crown, Welcome Hotel, Vizag. Royal hues dress code. Dinner service.',
        location: 'The Crown, Welcome Hotel, Vizag',
        start: '2025-11-22T19:00:00+05:30',
        end: '2025-11-22T22:00:00+05:30'
    },
    wedding: {
        title: 'Wedding Ceremony - Revanth & Sravya',
        description: 'Join us for the sacred wedding ceremony at Sai Priya Resorts, Vizag. Muhurat: 10:58 AM. Traditional wedding attire. Sacred rituals followed by lunch.',
        location: 'Sai Priya Resorts, Vizag',
        start: '2025-11-23T10:58:00+05:30',
        end: '2025-11-23T14:00:00+05:30'
    },
    vratham: {
        title: 'Sri Satyanarayana Swamy Vratham - Revanth & Sravya',
        description: 'Join us for the Sri Satyanarayana Swamy Vratham at Mango Meadows, Gowrelly, Hyderabad. Traditional attire. Spiritual blessings followed by lunch.',
        location: 'Mango Meadows, Gowrelly, Hyderabad',
        start: '2025-11-25T10:30:00+05:30',
        end: '2025-11-25T14:00:00+05:30'
    }
};

// Format date for calendar
function formatDate(dateString) {
    return dateString.replace(/[-:]/g, '').replace(/\+.*/, 'Z');
}

// Generate Google Calendar URL
function generateGoogleCalendarUrl(event) {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const params = new URLSearchParams({
        text: event.title,
        details: event.description,
        location: event.location,
        dates: `${formatDate(event.start)}/${formatDate(event.end)}`
    });
    return `${baseUrl}&${params.toString()}`;
}

// Generate iCal file content
function generateICalContent(event) {
    const ical = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Revanth & Sravya Wedding//EN',
        'BEGIN:VEVENT',
        `DTSTART:${formatDate(event.start)}`,
        `DTEND:${formatDate(event.end)}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        `LOCATION:${event.location}`,
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');
    
    return ical;
}

// Download iCal file
function downloadICalFile(event) {
    const icalContent = generateICalContent(event);
    const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${event.title.replace(/[^a-z0-9]/gi, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Show calendar options modal
function showCalendarOptions(eventKey) {
    const event = events[eventKey];
    if (!event) return;
    
    // Check if user is on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        // On mobile, show options
        const choice = confirm('Add to calendar?\n\nOK = Google Calendar\nCancel = Download .ics file');
        if (choice) {
            window.open(generateGoogleCalendarUrl(event), '_blank');
        } else {
            downloadICalFile(event);
        }
    } else {
        // On desktop, show both options
        const modal = document.createElement('div');
        modal.className = 'calendar-modal';
        modal.innerHTML = `
            <div class="calendar-modal-content">
                <h3>Add to Calendar</h3>
                <p>Choose your preferred calendar:</p>
                <div class="calendar-options">
                    <button class="calendar-option google-calendar">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.696 14.943c-1.747 2.52-5.141 3.174-7.662 1.427-2.52-1.747-3.174-5.141-1.427-7.662 1.747-2.52 5.141-3.174 7.662-1.427 2.52 1.747 3.174 5.141 1.427 7.662z"/>
                        </svg>
                        Google Calendar
                    </button>
                    <button class="calendar-option apple-calendar">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                        </svg>
                        Apple Calendar / iCal
                    </button>
                    <button class="calendar-option outlook-calendar">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V10.85l1.24.72h.01q.1.07.18.18.07.12.07.25zm-6-8.25v3h3v-3zm0 4.5v3h3v-3zm0 4.5v1.83l3.05-1.83zm-5.25-9v3h3.75v-3zm0 4.5v3h3.75v-3zm0 4.5v2.03l2.41 1.5 1.34-.8v-2.73zM9 3.75V6h2l.13.01.12.04v-2.3zM5.98 15.98q.9 0 1.6-.3.7-.32 1.19-.86.48-.55.73-1.28.25-.74.25-1.61 0-.83-.25-1.55-.24-.71-.71-1.24t-1.15-.83q-.68-.3-1.55-.3-.92 0-1.64.3-.71.3-1.2.85-.5.54-.75 1.3-.25.74-.25 1.63 0 .85.26 1.56.26.72.74 1.23.48.52 1.17.81.69.3 1.56.3zM7.5 21h12.39L12 16.08V17q0 .41-.3.7-.29.3-.7.3H7.5zm15-.13v-7.24l-5.9 3.54Z"/>
                        </svg>
                        Outlook / Other
                    </button>
                </div>
                <button class="calendar-close">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        modal.querySelector('.google-calendar').addEventListener('click', () => {
            window.open(generateGoogleCalendarUrl(event), '_blank');
            document.body.removeChild(modal);
        });
        
        modal.querySelector('.apple-calendar').addEventListener('click', () => {
            downloadICalFile(event);
            document.body.removeChild(modal);
        });
        
        modal.querySelector('.outlook-calendar').addEventListener('click', () => {
            downloadICalFile(event);
            document.body.removeChild(modal);
        });
        
        modal.querySelector('.calendar-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
}

// Initialize calendar buttons
document.addEventListener('DOMContentLoaded', () => {
    const calendarButtons = document.querySelectorAll('.add-calendar');
    
    calendarButtons.forEach(button => {
        button.addEventListener('click', () => {
            const eventKey = button.getAttribute('data-event');
            showCalendarOptions(eventKey);
        });
    });
});

// Add modal styles dynamically
const style = document.createElement('style');
style.textContent = `
    .calendar-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    }
    
    .calendar-modal-content {
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        max-width: 500px;
        width: 90%;
        animation: scaleIn 0.3s ease-out;
    }
    
    .calendar-modal-content h3 {
        font-family: var(--font-heading);
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: var(--gray-900);
    }
    
    .calendar-modal-content p {
        color: var(--gray-600);
        margin-bottom: 1.5rem;
    }
    
    .calendar-options {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .calendar-option {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: var(--gray-100);
        border: 2px solid var(--gray-300);
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: var(--font-body);
        font-size: 1rem;
        font-weight: 600;
    }
    
    .calendar-option:hover {
        background: var(--hero-rose-gold);
        border-color: var(--hero-rose-gold);
        color: white;
        transform: translateY(-2px);
    }
    
    .calendar-close {
        width: 100%;
        padding: 0.75rem;
        background: var(--gray-200);
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        font-family: var(--font-body);
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .calendar-close:hover {
        background: var(--gray-300);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);
