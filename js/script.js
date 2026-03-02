const header = document.querySelector("header");

window.addEventListener ("scroll", function() {
	header.classList.toggle ("sticky", window.scrollY > 0);
});

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navbar.classList.toggle('open');
};

window.onscroll = () => {
	menu.classList.remove('bx-x');
	navbar.classList.remove('open');
};

// Create a reusable function to generate countdown elements
function createCountdownElements(containerId) {
    const container = document.getElementById(containerId);
    const demo = document.createElement('p');
    const progressBar = document.createElement('div');
    const progressBarFill = document.createElement('div');
    const demo2 = document.createElement('p');

    demo.classList.add('countdown-display');
    progressBar.classList.add('progress-bar');
    progressBarFill.classList.add('progress-bar-fill');
    demo2.classList.add('countdown-display');

    container.append(demo, progressBar, demo2);
    progressBar.appendChild(progressBarFill);

    return { demo, progressBar, progressBarFill, demo2 };
}

// Countdown logic and UI updates
function updateCountdown(countDownDate, countStartDate, { demo, progressBar, progressBarFill, demo2 }) {
    const updateInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const realdistance = countDownDate - countStartDate;
        const altdistance = now - countDownDate;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const realhours = Math.floor(distance / (1000 * 60 * 60));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const mseconds = Math.floor((distance % (1000)));

        const arealhours = Math.floor(altdistance / (1000 * 60 * 60));

        // Format countdown display
        demo.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        // Display a more descriptive message when close to ending
        let timeText = '';
        if (realhours === 0) {
            if (minutes > 0) {
                timeText = `${minutes} minute${minutes === 1 ? '' : 's'}`;
                if (seconds > 0) {
                    timeText += ` and ${seconds} second${seconds === 1 ? '' : 's'}`;
                }
                timeText += " until the bar is full.";
            } else if (seconds > 0) {
                timeText = `${seconds} second${seconds === 1 ? '' : 's'} until the bar is full.`;
            } else {
                timeText = "until the bar is full.";
            }
        } else if (realhours > 1) {
            timeText = `${realhours} hours until the bar is full.`;
        } else {
            timeText = `${realhours} hour until the bar is full.`;
        }

        demo2.innerHTML = timeText;

        // Update progress bar based on elapsed time
        const timeFraction = (1 - (distance / realdistance));
        const progressWidth = timeFraction * 100;
        progressBarFill.style.width = `${progressWidth}%`;

        // Adjust progress bar colors
        const progressColors = [
            { range: [0, 20], color: 'green', pulse: 'Chartreuse' },
            { range: [20, 40], color: 'Chartreuse', pulse: 'yellow' },
            { range: [40, 60], color: 'yellow', pulse: 'orange' },
            { range: [60, 80], color: 'orange', pulse: 'red' },
            { range: [80, 95], color: 'red', pulse: 'darkred' },
            { range: [95, 100], color: 'darkred', pulse: 'black' },
            { range: [100, Infinity], color: 'black', pulse: 'grey' },
        ];

        progressColors.forEach(({ range, color, pulse }) => {
            if (progressWidth >= range[0] && progressWidth < range[1]) {
                progressBar.style.backgroundColor = color;
                progressBarFill.style.setProperty('--progress-color', color);
                progressBarFill.style.setProperty('--pulse-color', pulse);
            }
        });

        // If the countdown is finished, display ending message
        if (distance < 0) {
            
            const positiveRealHours = Math.abs(arealhours);
            demo.innerHTML = `The countdown has ended ${positiveRealHours > 0 ? `${positiveRealHours} hour${positiveRealHours === 1 ? '' : 's'}` : `${minutes} minutes and ${seconds} seconds`} ago.`;
            demo2.innerHTML = `If you prefer in milliseconds: ${Math.abs(distance)} ms.`;
        }
    }, 1000); // Update every second
}

// Function to initialize countdowns
function initializeCountdowns(countDownDates, countStartDates, containerIds) {
    countDownDates.forEach((countDownDate, index) => {
        const { demo, progressBar, progressBarFill, demo2 } = createCountdownElements(containerIds[index]);
        updateCountdown(countDownDate, countStartDates[index], { demo, progressBar, progressBarFill, demo2 });
    });
}

// Function to show the disclaimer
function showDisclaimer() {
    var disclaimer = document.getElementById('disclaimer');
    disclaimer.style.display = 'block';
}

// Function to close the disclaimer
function closeDisclaimer() {
    var disclaimer = document.getElementById('disclaimer');
    disclaimer.style.display = 'none';
}

// Example usage
const countStartDates = [
    new Date("3 Nov, 2025 08:00:00").getTime(), 
    new Date("9 Mar, 2026 00:00:00").getTime(),
];

const countDownDates = [
    new Date("9 Mar, 2026 08:00:00").getTime(),
    new Date("30 Mar, 2026 08:00:00").getTime(),
];

const containerIds = [
    "countdown-container-1",
    "countdown-container-2",
];

initializeCountdowns(countDownDates, countStartDates, containerIds);

// Dark mode toggle
(function() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    const btn = document.createElement('button');
    btn.id = 'dark-mode-toggle';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.innerHTML = saved === 'dark' ? '☀️' : '🌙';
    Object.assign(btn.style, { position:'fixed', bottom:'20px', right:'20px', width:'45px', height:'45px', borderRadius:'50%', border:'2px solid #8c00ff', background: saved === 'dark' ? '#1e293b' : '#fff', fontSize:'20px', cursor:'pointer', zIndex:'99999', boxShadow:'0 2px 10px rgba(0,0,0,0.2)', transition:'background 0.3s ease', display:'flex', alignItems:'center', justifyContent:'center' });
    btn.addEventListener('click', function() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) { document.documentElement.removeAttribute('data-theme'); localStorage.setItem('theme','light'); btn.innerHTML='🌙'; btn.style.background='#fff'; }
        else { document.documentElement.setAttribute('data-theme','dark'); localStorage.setItem('theme','dark'); btn.innerHTML='☀️'; btn.style.background='#1e293b'; }
    });
    document.body.appendChild(btn);
})();