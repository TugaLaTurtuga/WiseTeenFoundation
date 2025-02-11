const pages = document.querySelectorAll('.page');
let visibilityData = [['filler']]; // Initialize with a placeholder for the first page

// Function to calculate visibility percentage
function getVisibilityPercentage(entry) {
    const height = entry.boundingClientRect.height;
    const visibleHeight = Math.min(height, entry.intersectionRect.height);
    return (visibleHeight / height) * 100;
}

// Initialize Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const pageId = entry.target.dataset.page || entry.target.id;
        const percentage = getVisibilityPercentage(entry);
        
        // Find the index of the page in visibilityData
        const pageIndex = Array.from(pages).findIndex(page => page.id === pageId);

        // If the page is found, update its visibility and percentage
        if (pageIndex >= 0) {
            visibilityData[pageIndex + 1] = [
                entry.isIntersecting,           // visibility (true or false)
                Math.round(percentage)          // percentage visible
            ];
        }
    });
}, { threshold: [...Array(101).keys()].map(i => i / 100) }); // Track visibility at every 1%

// Observe each page
pages.forEach(page => observer.observe(page));


// Array to track if an animation has already been played (prevents re-triggering)
let Vis = new Array(255).fill(0);

// Function to check visibility and trigger animations
function triggerAnimation(pageIndex, thresholds) {
    if (visibilityData[pageIndex][0]) { // Checks if the page is visible
        const visibilityPercentage = visibilityData[pageIndex][1];

        thresholds.forEach(({ threshold, visIndex, elementSelector, animation, time }) => {
            if (visibilityPercentage > threshold && Vis[visIndex] === 0) {
                Vis[visIndex] = 1; // Mark the animation as played
                document.querySelector(elementSelector).style.animation = `${animation} ${time}s ease forwards`;
            }
        });
    }
}

function openPage(url, target = true) {
    if (target) {
        window.open(url, '_self'); // Opens in the same tab
    } else {
        window.open(url, '_blank'); // Opens in a new tab
    }
}